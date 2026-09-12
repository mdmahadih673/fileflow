import fs from 'fs/promises';
import path from 'path';
import { getSafeDestinationPath } from '../utils/duplicateHandler.js';
export async function organizeFiles(mainWindow, folderPath, files) {
    const result = {
        totalFiles: files.length,
        successful: 0,
        failed: 0,
        categories: {
            Images: 0, Videos: 0, Audio: 0, Documents: 0, Archives: 0, Code: 0, Applications: 0, Others: 0
        }
    };
    const moves = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const destFolder = path.join(folderPath, file.category);
        try {
            // Ensure category folder exists
            await fs.mkdir(destFolder, { recursive: true });
            const destPath = await getSafeDestinationPath(destFolder, file.name);
            // Move file
            await fs.rename(file.path, destPath);
            moves.push({ source: file.path, destination: destPath });
            result.successful++;
            result.categories[file.category]++;
            // Send progress to UI
            mainWindow.webContents.send('organize-progress', {
                current: i + 1,
                total: files.length,
                fileName: file.name,
                category: file.category
            });
        }
        catch (err) {
            console.error(`Failed to move ${file.name}`, err);
            result.failed++;
        }
    }
    return { result, moves };
}
export async function undoOrganization(moves) {
    let undoneCount = 0;
    for (const move of moves) {
        try {
            await fs.rename(move.destination, move.source);
            undoneCount++;
        }
        catch (err) {
            console.error(`Failed to undo move for ${move.destination}`, err);
        }
    }
    return undoneCount;
}
