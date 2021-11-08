const fs = require('fs');
const path = require('path');

const { stdin, stdout } = process;
const file = path.join(__dirname, 'userText.txt');
const output = fs.createWriteStream(file);

stdout.write('Hello! Write some text.\n');

stdin.on('data', (data) => {
  let dataString = data.toString().trim();

  if (dataString == 'exit') {
    exitProcess();
  } else {
    output.write(data);
  }
});

function exitProcess() {
  stdout.write('Good bye! Good luck!\n');
  process.exit();
}

process.on('SIGINT', exitProcess);
