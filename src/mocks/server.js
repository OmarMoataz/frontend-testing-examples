import { setupServer } from "msw/node";
import { rest } from "msw";

export const server = setupServer(
  rest.post(`${process.env.REACT_APP_SERVER_URL}/checkout`, (req, res, ctx) => {
    // special characters as an example for invalid input.
    if (req.body.address.match(/[$%@]/)) return res(ctx.status(403));
    return res(ctx.status(200));
  })
);
