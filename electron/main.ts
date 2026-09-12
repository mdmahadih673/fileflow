import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#0f1115',
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#0f1115',
      symbolColor: '#ffffff',
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    mainWindow.loadURL('http://localhost:5173');
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

import { scanFolder } from './services/fileScanner.js';
import { organizeFiles, undoOrganization } from './services/fileOrganizer.js';
import { getHistory, saveHistoryItem, updateHistoryItemStatus, getSettings, saveSettings } from './services/fileHistory.js';
import { FileItem } from '../src/types/file.js';
import { shell } from 'electron';
import crypto from 'crypto';

// Basic IPC to test dialog
ipcMain.handle('selectFolder', async () => {
  if (!mainWindow) return null;
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
  });
  if (result.canceled) return null;
  return result.filePaths[0];
});

ipcMain.handle('scanFolder', async (_, folderPath: string) => {
  return scanFolder(folderPath);
});

ipcMain.handle('organizeFiles', async (_, folderPath: string, files: FileItem[]) => {
  if (!mainWindow) return null;
  const { result, moves } = await organizeFiles(mainWindow, folderPath, files);
  
  if (result.successful > 0) {
    await saveHistoryItem({
      id: crypto.randomUUID(),
      folderPath,
      totalFiles: result.successful,
      timestamp: Date.now(),
      status: 'Completed',
      moves
    });
  }
  
  return result;
});

ipcMain.handle('undoOrganization', async (_, historyId: string) => {
  const history = await getHistory();
  const item = history.find((i: any) => i.id === historyId);
  if (item && item.status === 'Completed') {
    const undone = await undoOrganization(item.moves);
    await updateHistoryItemStatus(historyId, 'Undone');
    return undone;
  }
  return 0;
});

ipcMain.handle('openFolder', async (_, folderPath: string) => {
  await shell.openPath(folderPath);
});

ipcMain.handle('getHistory', async () => getHistory());
ipcMain.handle('getSettings', async () => getSettings());
ipcMain.handle('saveSettings', async (_, settings) => saveSettings(settings));
