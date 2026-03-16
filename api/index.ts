// Wrapper for Vercel serverless function using CommonJS semantics.
// We keep this file in TypeScript, but use require/module.exports so
// the compiled output is compatible with Node's CJS loader.

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { app } = require('../server/index');

function handler(req: any, res: any): void {
  app(req, res);
}

module.exports = handler;
