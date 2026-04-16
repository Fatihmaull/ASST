import * as esbuild from 'esbuild';
import { builtinModules } from 'module';

async function build() {
  console.log('Building ASST CLI (Native-Free Persistence)...');
  try {
    await esbuild.build({
      entryPoints: ['src/asst.ts'],
      bundle: true,
      platform: 'node',
      target: 'node22',
      outfile: 'dist/cli.cjs',
      format: 'cjs',
      external: [
        ...builtinModules,
        'fsevents'
      ],
      sourcemap: false,
      minify: false,
    });
    console.log('Build successful: dist/cli.cjs');
    console.log('Cleaned up native sqlite3 dependencies.');
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
}

build();
