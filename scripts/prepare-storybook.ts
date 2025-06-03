import { mkdirp } from 'mkdirp';
import path from 'path';
import fs from 'fs';

const targetDir = path.resolve(__dirname, '../.storybook/public/assets');
mkdirp.sync(targetDir);

const src = path.resolve(__dirname, '../node_modules/react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs');
const dest = path.join(targetDir, 'pdf.worker.min.js');

fs.copyFileSync(src, dest);
console.log(`Copied pdf.worker.min.mjs to ${dest}`);
