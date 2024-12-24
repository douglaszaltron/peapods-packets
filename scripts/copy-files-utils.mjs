import path from 'node:path';
import glob from 'fast-glob';
import fse from 'fs-extra';
import { logger } from './logger/index.mjs';

const packagePath = process.cwd();
const buildPath = path.join(packagePath, './dist');

export async function includeFileInBuild(file) {
  const sourcePath = path.resolve(packagePath, file);
  const targetPath = path.resolve(buildPath, path.basename(file));
  await fse.copy(sourcePath, targetPath);
}

export async function typescriptCopy({ from, to }) {
  if (!(await fse.pathExists(to))) {
    logger.warn(`Path ${path.basename(to)} not found`);
    return [];
  }

  const files = await glob('**/*.d.ts', { cwd: from });

  const cmd = files.map((file) =>
    fse.copy(path.resolve(from, file), path.resolve(to, file)),
  );

  await Promise.all(cmd);

  return cmd;
}

export async function createPackageFile() {
  const packageData = await fse.readFile(
    path.resolve(packagePath, './package.json'),
    'utf8',
  );

  const { nyc, scripts, devDependencies, workspaces, ...packageDataOther } =
    JSON.parse(packageData);

  const getEntryPoint = (folder) => {
    const folderPath = path.resolve(buildPath, `./${folder}/index.js`);
    return fse.existsSync(folderPath) ? `./${folder}/index.js` : './index.js';
  };

  const newPackageData = {
    ...packageDataOther,
    private: false,
    ...(packageDataOther.main && {
      main: getEntryPoint('node'),
      module: getEntryPoint('esm'),
    }),
  };

  const typeDefinitionsFilePath = path.resolve(buildPath, './index.d.ts');
  if (await fse.pathExists(typeDefinitionsFilePath)) {
    newPackageData.types = './index.d.ts';
  }

  const targetPath = path.resolve(buildPath, './package.json');

  await fse.writeFile(
    targetPath,
    JSON.stringify(newPackageData, null, 2),
    'utf8',
  );

  return newPackageData;
}

export async function prepend(file, string) {
  try {
    const data = await fse.readFile(file, 'utf8');
    await fse.writeFile(file, string + data, 'utf8');
  } catch (error) {
    logger.error(`Failed to prepend ${path.basename(file)}`, error);
    throw error;
  }
}
