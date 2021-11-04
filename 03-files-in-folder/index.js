const fs = require('fs/promises');
const path = require('path');

const folder = path.join(__dirname, 'secret-folder');

async function readFolder() {
  try {
    const files = await fs.readdir(folder, { withFileTypes: true });

    for (const file of files)
      if (file.isFile()) {
        const fileName = file.name.split('.')[0];
        const fileExt = path.extname(file.name).slice(1);
        const filePath = path.join(folder, file.name);
        const stat = await fs.stat(filePath);
        console.log(`${fileName} - ${fileExt} - ${stat.size}b`);
      }
  } catch (err) {
    console.error(err);
  }
}

readFolder();
