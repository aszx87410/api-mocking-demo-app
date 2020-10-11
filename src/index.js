import React from "react";
import ReactDOM from "react-dom";
import { createServer, Response } from "miragejs";
import { API_ENDPOINT } from "./WebAPI";

import App from "./App";

// if (process.env.NODE_ENV === "development") {
//   const { worker } = require("./mocks/browser");
//   //worker.start();
// }

if (process.env.NODE_ENV === "development") {
  const { makeServer } = require("./mirageServer");
  makeServer({ environment: "test" });
}

// handle mirage and cypress integration
if (window.Cypress) {
  let otherDomains = [`${API_ENDPOINT}/`];
  let methods = ["get", "put", "patch", "post", "delete"];

  createServer({
    environment: "test",
    routes() {
      for (const domain of ["/", ...otherDomains]) {
        for (const method of methods) {
          this[method](`${domain}*`, async (schema, request) => {
            let [status, headers, body] = await window.handleFromCypress(
              request
            );
            return new Response(status, headers, body);
          });
        }
      }
    },
  });
}

ReactDOM.render(<App />, document.getElementById("root"));
