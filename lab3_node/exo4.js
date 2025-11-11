
const fs = require('fs');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node exo4.js <filename> "text to save"');
  console.log('Or: node exo4.js "text to save"');
  process.exit(1);
}

let filename, text;

if (args.length === 1) {
  filename = 'f.txt';
  text = args[0];
} else {
  filename = args[0];
  text = args.slice(1).join(' ');
}

fs.writeFile(filename, text, (err) => {
  if (err) {
    console.error('Error writing file:', err.message);
    return;
  }
  console.log(` File '${filename}' has been saved!`);

  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err.message);
      return;
    }
    console.log('\n File content:\n' + data);
  });
});
