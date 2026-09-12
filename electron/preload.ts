import type { FileItem, HistoryItem, OrganizationResult, Settings } from '../src/types/file.js';

export type ElectronAPI = {
  selectFolder: () => Promise<string | null>;
  scanFolder: (folderPath: string) => Promise<FileItem[]>;
  organizeFiles: (
    folderPath: string,
    files: FileItem[],
  ) => Promise<OrganizationResult | null>;
  undoOrganization: (historyId: string) => Promise<number>;
  openFolder: (folderPath: string) => Promise<void>;
  getHistory: () => Promise<HistoryItem[]>;
  getSettings: () => Promise<Settings>;
  saveSettings: (settings: Partial<Settings>) => Promise<void>;
  onOrganizeProgress: (
    callback: (data: { current: number; total: number; fileName: string }) => void,
  ) => () => void;
};
