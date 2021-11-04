const fs = require('fs/promises');
const path = require('path');

async function copyDir() {
  const origFolder = path.join(__dirname, 'files');
  const copyFolder = path.join(__dirname, 'files-copy');

  try {
    await fs.mkdir(copyFolder, { recursive: true });
    const origFiles = await fs.readdir(origFolder);
    const copyFiles = await fs.readdir(copyFolder);

    if (copyFiles.length > 0) {
      for (const copyFile of copyFiles) {
        await fs.rm(path.join(copyFolder, copyFile));
      }
    }

    for (const fileName of origFiles) {
      const origFile = path.join(origFolder, fileName);
      const copyFile = path.join(copyFolder, fileName);
      await fs.copyFile(origFile, copyFile);
      console.log(`"${fileName}" is copied`);
    }
  } catch (err) {
    console.error(err);
  }
}

copyDir();
