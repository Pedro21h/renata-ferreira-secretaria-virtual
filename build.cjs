const { copyFileSync, cpSync, existsSync, mkdirSync } = require('node:fs');
const { join } = require('node:path');

const publicFiles = [
  'index.html', 'styles.css', 'responsive.css', 'app.js', 'config.js',
  'favicon.svg', 'logo-rf.svg',
];
const output = join(__dirname, 'dist');
mkdirSync(output, { recursive: true });
for (const file of publicFiles) {
  copyFileSync(join(__dirname, file), join(output, file));
}
const assets = join(__dirname, 'assets');
if (existsSync(assets)) {
  cpSync(assets, join(output, 'assets'), { recursive: true });
}
