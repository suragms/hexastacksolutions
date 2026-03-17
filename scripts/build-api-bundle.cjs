/**
 * Bundle server/index.ts to api/server-bundle.cjs (CommonJS) for Vercel.
 * All node_modules are external so the bundle only contains our server code.
 * Ensures prisma generate is run so @prisma/client exists.
 */
const esbuild = require('esbuild');
const path = require('path');
const childProcess = require('child_process');
const fs = require('fs');

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
    // Ensure Prisma client exists for server code imports
    const prismaClientDir = path.join(__dirname, '..', 'node_modules', '.prisma', 'client');
    if (!fs.existsSync(prismaClientDir)) {
      try {
        childProcess.execSync('npx prisma generate', { stdio: 'inherit' });
      } catch {
        throw new Error('prisma generate failed');
      }
    }

    await esbuild.build({
      entryPoints: [path.join(__dirname, '..', 'server', 'index.ts')],
      bundle: true,
      platform: 'node',
      format: 'cjs',
      outfile: path.join(__dirname, '..', 'api', 'server-bundle.cjs'),
      plugins: [makeNodeModulesExternal],
      sourcemap: false,
      target: 'node24',
    });
    console.log('api/server-bundle.cjs created');
  } catch (err) {
    console.error('build-api-bundle failed:', err);
    process.exit(1);
  }
}

main();
