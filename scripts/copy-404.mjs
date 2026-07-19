import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const browserDir = join('dist', 'multi-assainissement', 'browser');
const source = join(browserDir, '404', 'index.html');
const target = join(browserDir, '404.html');

if (!existsSync(source)) {
  console.error(`copy-404: missing prerendered page at ${source}`);
  process.exit(1);
}

copyFileSync(source, target);
console.log(`copy-404: wrote ${target}`);
