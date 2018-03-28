const fs = require('fs');
const path = require('path');

const code = [];
const DIR = './stuff';
const list = fs.readdirSync(DIR)
  .filter(file => path.extname(file) === '.raw')
  .map(file => path.resolve(DIR, file))
  .forEach(file => {
    let text = fs.readFileSync(file).toString('utf-8');
    fs.writeFileSync(file.replace(/raw$/, 'json'), JSON.stringify({ text }));
    console.log(`* ${path.basename(file).replace(/raw$/, 'json')} is generated:`);
    console.log(text, '\n');
    code.push({ text });
  });

// for demo
fs.writeFileSync('./bundle.js', `list = ${JSON.stringify(code)}`)