import path from 'node:path';
import {
  createPackageFile,
  includeFileInBuild,
  prepend,
  typescriptCopy,
} from './copy-files-utils.mjs';
import { logger } from './logger/index.mjs';

const packagePath = process.cwd();
const buildPath = path.join(packagePath, './dist');
const srcPath = path.join(packagePath, './src');

async function addLicense(packageData) {
  const license = `/**
 * ${packageData.name} v${packageData.version}
 *
 * @license ${packageData.license}
 * This source code is licensed under the ${packageData.license} license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

  const files = ['./index.js', './modern/index.js', './node/index.js'];

  await Promise.all(
    files.map(async (file) => {
      try {
        await prepend(path.resolve(buildPath, file), license);
      } catch (err) {
        if (err.code === 'ENOENT') {
          logger.warn(`skipped ${file}`);
        } else {
          throw err;
        }
      }
    }),
  );
}

export async function copyFiles() {
  const extras = ['./CHANGELOG.md', '../../../LICENSE'];
  const startTime = Date.now();

  try {
    logger.pending('Copying additional project files...');
    await typescriptCopy({ from: srcPath, to: buildPath });
    const packageData = await createPackageFile();
    await Promise.all(
      extras.map(async (file) => {
        await includeFileInBuild(file);
      }),
    );
    await addLicense(packageData);
    const duration = Date.now() - startTime;
    logger.success('Copying files completed', duration);
    logger.hero('>>> BUILD COMPLETED');
  } catch (err) {
    logger.error('File copying process failed', err);
    process.exit(1);
  }
}
