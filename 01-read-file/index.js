const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(file, 'utf-8');

let data = '';

readStream.on('data', (chunk) => (data += chunk));
readStream.on('end', () => console.log(data.trim()));
readStream.on('error', (err) => console.error(err));
