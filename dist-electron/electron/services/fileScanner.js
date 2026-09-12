import fs from 'fs/promises';
import path from 'path';
import { getFileCategory } from '../utils/fileCategories.js';
export async function scanFolder(folderPath) {
    const files = [];
    try {
        const entries = await fs.readdir(folderPath, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.isFile()) {
                const fullPath = path.join(folderPath, entry.name);
                const extension = path.extname(entry.name);
                const category = getFileCategory(extension);
                try {
                    const stats = await fs.stat(fullPath);
                    files.push({
                        name: entry.name,
                        path: fullPath,
                        extension,
                        category,
                        size: stats.size,
                    });
                }
                catch (err) {
                    console.error(`Failed to get stats for ${fullPath}`, err);
                }
            }
        }
    }
    catch (err) {
        console.error(`Failed to read directory ${folderPath}`, err);
        throw err;
    }
    return files;
}
