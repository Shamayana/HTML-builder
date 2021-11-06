const fs = require('fs/promises');
const path = require('path');

async function copyDir() {
  const origFolder = path.join(__dirname, 'files');
  const copyFolder = path.join(__dirname, 'files-copy');

  try {
    const arr = await fs.readdir('04-copy-directory', { withFileTypes: true });
    const isOrigFolderExist = arr.some((item) => item.name == 'files');
    const isCopyFolderExist = arr.some((item) => item.name == 'files-copy');

    if (isCopyFolderExist) await fs.rm(copyFolder, { force: true, maxRetries: 10, recursive: true });

    if (isOrigFolderExist) {
      await copyCurrentDir(origFolder, copyFolder);
      console.log('The directory \'files\' has been successfully copied to \'files-copy\'');
    } else {
      console.log('The directory \'files\' doesn\'t exist, nothing to copy');
    }
  } catch (err) {
    console.error(err);
  }
}

async function copyCurrentDir(origFolder, copyFolder) {
  await fs.mkdir(copyFolder);
  const origItems = await fs.readdir(origFolder, { withFileTypes: true });

  for (const item of origItems) {
    const origItem = path.join(origFolder, item.name);
    const copyItem = path.join(copyFolder, item.name);

    if (item.isFile()) {
      await fs.copyFile(origItem, copyItem);
    } else {
      await copyCurrentDir(origItem, copyItem);
    }
  }
}

copyDir();
