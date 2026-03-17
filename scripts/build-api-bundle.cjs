/**
 * Bundle server/index.ts to api/server-bundle.cjs (CommonJS) for Vercel.
 * All node_modules are external so the bundle only contains our server code.
 * Run after prisma generate so @prisma/client exists.
 */
const esbuild = require('esbuild');
const path = require('path');

// Mark node_modules as external (package names like 'express'), not relative paths
const makeNodeModulesExternal = {
  name: 'make-node-modules-external',
  setup(build) {
    build.onResolve({ filter: /.*/ }, (args) => {
      if (args.path.startsWith('.') || path.isAbsolute(args.path)) return null;
      return { path: args.path, external: true };
    });
  },
};

async function main() {
  try {
    await esbuild.build({
      entryPoints: [path.join(__dirname, '..', 'server', 'index.ts')],
      bundle: true,
      platform: 'node',
      format: 'cjs',
      outfile: path.join(__dirname, '..', 'api', 'server-bundle.cjs'),
      plugins: [makeNodeModulesExternal],
      sourcemap: false,
      target: 'node18',
    });
    console.log('api/server-bundle.cjs created');
  } catch (err) {
    console.error('build-api-bundle failed:', err);
    process.exit(1);
  }
}

main();
