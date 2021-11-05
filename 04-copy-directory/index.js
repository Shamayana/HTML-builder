const fs = require('fs/promises');
const path = require('path');

async function copyDir() {
  const origFolder = path.join(__dirname, 'files');
  const copyFolder = path.join(__dirname, 'files-copy');

  try {
    const arr = await fs.readdir('04-copy-directory', { withFileTypes: true });
    const isOrigFolderExist = arr.some((item) => item.name == 'files');
    const isCopyFolderExist = arr.some((item) => item.name == 'files-copy');

    if (isCopyFolderExist) await fs.rm(copyFolder, { recursive: true });

    if (isOrigFolderExist) {
      await fs.mkdir(copyFolder);
      const origFiles = await fs.readdir(origFolder);

      for (const fileName of origFiles) {
        const origFile = path.join(origFolder, fileName);
        const copyFile = path.join(copyFolder, fileName);
        await fs.copyFile(origFile, copyFile);
      }
      console.log('All files have been successfully copied');
    } else {
      console.log('The folder \'files\' doesn\'t exist, nothing to copy');
    }
  } catch (err) {
    console.error(err);
  }
}

copyDir();
