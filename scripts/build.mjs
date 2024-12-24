import path from 'node:path';
import * as esbuild from 'esbuild';
import glob from 'fast-glob';
import color from 'picocolors';
import { logger } from './logger/index.mjs';

export const FILE_EXTENSIONS = ['.js', '.ts', '.tsx'];

export const NODE_VERSION_TARGET = 'node14';

export const ESM_VERSION_TARGET = 'es2015';

export const SUPPORTED_BUNDLE_TYPES = ['modern', 'node', 'stable'];

export const TEST_FILE_PATTERNS = [
  '**/*.test.js',
  '**/*.test.ts',
  '**/*.test.tsx',
  '**/*.spec.ts',
  '**/*.spec.tsx',
  '**/*.d.ts',
];

export async function build(argv) {
  const { bundle, outDir: relativeOutDir, watch, verbose } = argv;

  logger.pending(`Building ${color.cyan(bundle)}`);

  if (SUPPORTED_BUNDLE_TYPES.indexOf(bundle) === -1) {
    throw new TypeError(
      `Unrecognized bundle type '${bundle}'. Did you mean one of these: "${SUPPORTED_BUNDLE_TYPES.join('", "')}"?`,
    );
  }

  const srcDir = path.resolve('./src');
  const topLevelNonIndexFiles = glob
    .sync(`*{${FILE_EXTENSIONS.join(',')}}`, {
      cwd: srcDir,
      ignore: TEST_FILE_PATTERNS,
    })
    .filter((file) => {
      return path.basename(file, path.extname(file)) !== 'index';
    });

  const topLevelPathImportsCanBePackages = topLevelNonIndexFiles.length === 0;

  const outDir = path.resolve(
    relativeOutDir,
    {
      node: topLevelPathImportsCanBePackages ? './node' : './',
      modern: './modern',
      stable: topLevelPathImportsCanBePackages ? './' : './esm',
    }[bundle],
  );

  const buildOptions = {
    entryPoints: await glob(`src/**/*{${FILE_EXTENSIONS.join(',')}}`, {
      ignore: TEST_FILE_PATTERNS,
    }),
    outdir: outDir,
    bundle: false,
    sourcemap: true,
    platform: bundle === 'node' ? 'node' : 'neutral',
    format: bundle === 'node' ? 'cjs' : 'esm',
    target: bundle === 'node' ? NODE_VERSION_TARGET : ESM_VERSION_TARGET,
    logLevel: verbose ? 'info' : 'warning',
  };

  try {
    if (watch) {
      logger.pending('Watching...');
      const context = await esbuild.context(buildOptions);
      await context.watch();
      logger.success('Watching for changes');
    } else {
      const startTime = Date.now();
      await esbuild.build(buildOptions);
      const duration = Date.now() - startTime;
      logger.success('Built successfully', duration);
    }
  } catch (error) {
    logger.error('Build failed', error);
    process.exit(1);
  }
}
