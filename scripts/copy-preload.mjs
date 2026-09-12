import { copyFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const destDir = join(root, 'dist-electron', 'electron');

mkdirSync(destDir, { recursive: true });
copyFileSync(join(root, 'electron', 'preload.cjs'), join(destDir, 'preload.cjs'));
