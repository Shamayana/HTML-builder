const fs = require('fs/promises');
const path = require('path');

const distFolder = path.join(__dirname, 'project-dist');

async function clear() {
  try {
    if (distFolder) {
      await fs.rm(distFolder, { force: true, maxRetries: 10, recursive: true });
    }
  } catch (err) {
    console.error('1: ' + err);
  }
}

async function buildHTML() {
  const templFile = path.join(__dirname, 'template.html');
  const compFolder = path.join(__dirname, 'components');

  try {
    const dataTemplFile = await fs.readFile(templFile, 'utf-8');
    await fs.mkdir(distFolder);
    await fs.writeFile(path.join(distFolder, 'index.html'), dataTemplFile);
    const compFiles = await fs.readdir(compFolder, { withFileTypes: true });

    for (const compFile of compFiles) {
      const compFileName = compFile.name.split('.')[0];
      const compFileExt = compFile.name.split('.')[1];

      if (compFile.isFile() && compFileExt == 'html') {
        const compFilePath = path.join(compFolder, compFile.name);
        const compFileData = await fs.readFile(compFilePath, 'utf-8');
        const templTag = `{{${compFileName}}}`;
        const dataNewFile = await fs.readFile(path.join(distFolder, 'index.html'), 'utf-8');
        await fs.writeFile(path.join(distFolder, 'index.html'), dataNewFile.replace(templTag, compFileData));
      }
    }
  } catch (err) {
    console.error('2: ' + err);
  }
}

async function mergeStyles() {
  const stylesFolder = path.join(__dirname, 'styles');

  try {
    const files = await fs.readdir(stylesFolder, { withFileTypes: true });
    const dataArr = [];

    for (const file of files) {
      const fileExt = file.name.split('.')[1];

      if (file.isFile() && fileExt == 'css') {
        const filePath = path.join(stylesFolder, file.name);
        const data = await fs.readFile(filePath, 'utf-8');
        dataArr.push(data.trim());
      }
    }

    await fs.writeFile(path.join(distFolder, 'style.css'), dataArr.join('\n\n'));
  } catch (err) {
    console.error('3: ' + err);
  }
}

async function copyDir(origFolder, copyFolder) {
  try {
    await fs.mkdir(copyFolder);
    const origItems = await fs.readdir(origFolder, { withFileTypes: true });

    for (const item of origItems) {
      const origItem = path.join(origFolder, item.name);
      const copyItem = path.join(copyFolder, item.name);

      if (item.isFile()) {
        await fs.copyFile(origItem, copyItem);
      } else {
        await copyDir(origItem, copyItem);
      }
    }
  } catch (err) {
    console.error('4: ' + err);
  }
}

async function buildPage() {
  await clear();
  await buildHTML();
  await mergeStyles();
  await copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
  console.log('The page is successfully created');
}

buildPage();
