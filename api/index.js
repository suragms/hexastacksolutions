// Vercel serverless entrypoint for all /api/* routes (CommonJS).
// vercel.json rewrites /api/(.*) -> /api?path=/$1, and server/index
// restores the path and mounts the Express app.

/* eslint-disable @typescript-eslint/no-var-requires */
const { app } = require('../server/index');

function handler(req, res) {
  app(req, res);
}

module.exports = handler;

