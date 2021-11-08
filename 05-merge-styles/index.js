const fs = require('fs/promises');
const path = require('path');

async function mergeStyles() {
  const stylesFolder = path.join(__dirname, 'styles');
  const distFolder = path.join(__dirname, 'project-dist');

  try {
    const files = await fs.readdir(stylesFolder, { withFileTypes: true });
    const dataArr = [];

    for (const file of files) {
      const fileExt = file.name.split('.').slice(-1).toString();

      if (file.isFile() && fileExt == 'css') {
        const filePath = path.join(stylesFolder, file.name);
        const data = await fs.readFile(filePath, 'utf-8');
        dataArr.push(data.trim());
      }
    }
    await fs.writeFile(path.join(distFolder, 'bundle.css'), dataArr.join('\n\n'));
    console.log('All styles are in the bundle');
  } catch (err) {
    console.error(err);
  }
}

mergeStyles();
