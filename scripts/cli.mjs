import yargs from 'yargs';
import { SUPPORTED_BUNDLE_TYPES, build } from './build.mjs';
import { copyFiles } from './copy-files.mjs';
import { logger } from './logger/index.mjs';

async function handleBuild(argv) {
  try {
    await build(argv);
  } catch (error) {
    logger.error('Build error:', error);
    process.exit(1);
  }
}

async function handleCopyFiles(argv) {
  try {
    await copyFiles(argv);
  } catch (error) {
    logger.error('File copy error:', error);
    process.exit(1);
  }
}

yargs(process.argv.slice(2))
  .command({
    command: 'build',
    describe: 'Builds the package',
    builder: (yargs) => {
      return yargs
        .option('bundle', {
          alias: 'b',
          describe: `Bundle type (${SUPPORTED_BUNDLE_TYPES.join(', ')})`,
          type: 'string',
          choices: SUPPORTED_BUNDLE_TYPES,
          demandOption: true,
        })
        .option('out-dir', {
          alias: 'o',
          type: 'string',
          describe: 'Output directory',
          default: './dist',
        })
        .option('watch', {
          alias: 'w',
          type: 'boolean',
          describe: 'Watch mode',
          default: false,
        })
        .option('verbose', {
          alias: 'v',
          type: 'boolean',
          describe: 'Verbose mode',
          default: false,
        });
    },
    handler: handleBuild,
  })
  .command({
    command: 'copy-files',
    describe: 'Copies required files to build directory',
    builder: (yargs) => {
      return yargs
        .option('verbose', {
          alias: 'v',
          type: 'boolean',
          describe: 'Verbose mode',
          default: false,
        })
        .option('out-dir', {
          alias: 'o',
          type: 'string',
          describe: 'Output directory',
          default: './dist',
        });
    },
    handler: handleCopyFiles,
  })
  .demandCommand(1, 'You need to specify a command')
  .help()
  .strict()
  .version(false)
  .parse();
