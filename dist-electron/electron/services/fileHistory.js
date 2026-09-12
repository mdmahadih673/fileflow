import { app } from 'electron';
import fs from 'fs/promises';
import path from 'path';
const userDataPath = app.getPath('userData');
const historyFile = path.join(userDataPath, 'history.json');
const settingsFile = path.join(userDataPath, 'settings.json');
const defaultSettings = {
    theme: 'Dark',
    createCategoryFolders: true,
    moveInsteadOfCopy: true,
    removeEmptyFolders: false,
    duplicateHandling: 'rename'
};
export async function getHistory() {
    try {
        const data = await fs.readFile(historyFile, 'utf-8');
        return JSON.parse(data);
    }
    catch {
        return [];
    }
}
export async function saveHistoryItem(item) {
    const history = await getHistory();
    history.unshift(item);
    await fs.writeFile(historyFile, JSON.stringify(history, null, 2));
}
export async function updateHistoryItemStatus(id, status) {
    const history = await getHistory();
    const item = history.find(i => i.id === id);
    if (item) {
        item.status = status;
        await fs.writeFile(historyFile, JSON.stringify(history, null, 2));
    }
}
export async function getSettings() {
    try {
        const data = await fs.readFile(settingsFile, 'utf-8');
        return { ...defaultSettings, ...JSON.parse(data) };
    }
    catch {
        return defaultSettings;
    }
}
export async function saveSettings(settings) {
    const current = await getSettings();
    const updated = { ...current, ...settings };
    await fs.writeFile(settingsFile, JSON.stringify(updated, null, 2));
    return updated;
}
