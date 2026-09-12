import fs from 'fs/promises';
import path from 'path';

export async function getSafeDestinationPath(destFolder: string, fileName: string): Promise<string> {
  let finalPath = path.join(destFolder, fileName);
  let counter = 1;
  const ext = path.extname(fileName);
  const baseName = path.basename(fileName, ext);

  while (true) {
    try {
      await fs.access(finalPath);
      // File exists, try a new name
      finalPath = path.join(destFolder, `${baseName} (${counter})${ext}`);
      counter++;
    } catch {
      // File does not exist, safe to use
      break;
    }
  }

  return finalPath;
}
