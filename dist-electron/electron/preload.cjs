const { contextBridge, ipcRenderer } = require('electron');

const api = {
  selectFolder: () => ipcRenderer.invoke('selectFolder'),
  scanFolder: (folderPath) => ipcRenderer.invoke('scanFolder', folderPath),
  organizeFiles: (folderPath, files) => ipcRenderer.invoke('organizeFiles', folderPath, files),
  undoOrganization: (historyId) => ipcRenderer.invoke('undoOrganization', historyId),
  openFolder: (folderPath) => ipcRenderer.invoke('openFolder', folderPath),
  getHistory: () => ipcRenderer.invoke('getHistory'),
  getSettings: () => ipcRenderer.invoke('getSettings'),
  saveSettings: (settings) => ipcRenderer.invoke('saveSettings', settings),
  onOrganizeProgress: (callback) => {
    const listener = (_event, data) => callback(data);
    ipcRenderer.on('organize-progress', listener);
    return () => ipcRenderer.off('organize-progress', listener);
  },
};

contextBridge.exposeInMainWorld('api', api);
