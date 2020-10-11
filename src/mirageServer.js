import { createServer } from "miragejs";
import { API_ENDPOINT } from "./WebAPI";

export const makeServer = ({ environment }) =>
  createServer({
    environment,
    routes() {
      this.urlPrefix = API_ENDPOINT;

      this.post("login", () => ({
        ok: true,
        token: "abc123",
      }));

      this.get("/me", () => ({
        ok: true,
        data: {
          username: "mirage mock!",
        },
      }));
    },
  });
