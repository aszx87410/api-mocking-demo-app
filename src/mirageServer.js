import { createServer, Model, Factory } from "miragejs";
import { API_ENDPOINT } from "./WebAPI";

export const makeServer = ({ environment }) =>
  createServer({
    environment,
    models: {
      user: Model,
    },

    seeds(server) {
      server.create("user", { username: "admin" });
      server.create("user", { username: "user01" });
    },

    factories: {
      user: Factory.extend({
        password() {
          return this.username;
        },
        token() {
          return "token:" + this.username;
        },
      }),
    },

    routes() {
      this.urlPrefix = API_ENDPOINT;

      this.post("login", (schema, request) => {
        const data = JSON.parse(request.requestBody);
        const user = schema.users.findBy({
          username: data.username,
          password: data.password,
        });

        if (!user) return { ok: false };

        return {
          ok: true,
          token: user.token,
        };
      });

      this.get("/me", (schema, request) => {
        const headers = request.requestHeaders;
        let token = headers.authorization;

        if (!token) return { ok: false };

        token = token.replace(/^Bearer /, "");
        const user = schema.users.findBy({ token });
        if (!user) return { ok: false };

        return {
          ok: true,
          data: {
            username: user.username,
          },
        };
      });
    },
  });
