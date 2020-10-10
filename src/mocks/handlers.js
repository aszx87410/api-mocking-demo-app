import { rest } from "msw";
import { API_ENDPOINT } from "../WebAPI";

export const handlers = [
  rest.post(`${API_ENDPOINT}/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ok: true,
        token: "abc123",
      })
    );
  }),
  rest.get(`${API_ENDPOINT}/me`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ok: true,
        data: {
          username: "msw mock!",
        },
      })
    );
  }),
];
