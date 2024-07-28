import {
  readdirSync, statSync, lstatSync, existsSync,
} from 'node:fs';
import path from 'path';

const getAllFiles = function (dirPath, arrayOfFiles) {
  const files = readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    if (statSync(`${dirPath}/${file}`).isDirectory()) {
      arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles);
    } else {
      arrayOfFiles.push(file);
    }
  });

  return arrayOfFiles;
};

function fromDir(startPath, filter, arrayOfFiles) {
  arrayOfFiles = arrayOfFiles || [];

  if (!existsSync(startPath)) {
    console.log('no dir ', startPath);
    return;
  }

  const files = readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = lstatSync(filename);
    if (stat.isDirectory()) {
      arrayOfFiles = fromDir(filename, filter, arrayOfFiles); // recurse
    } else if (filename.endsWith(filter)) {
      arrayOfFiles.push(filename);
    }
  }

  return arrayOfFiles;
}

export { getAllFiles, fromDir };
