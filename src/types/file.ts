export type FileCategory =
  | 'Images'
  | 'Videos'
  | 'Audio'
  | 'Documents'
  | 'Archives'
  | 'Code'
  | 'Applications'
  | 'Others';

export interface FileItem {
  name: string;
  path: string;
  extension: string;
  category: FileCategory;
  size: number;
}

export interface OrganizationResult {
  totalFiles: number;
  successful: number;
  failed: number;
  categories: Record<FileCategory, number>;
}

export interface HistoryItem {
  id: string;
  folderPath: string;
  totalFiles: number;
  timestamp: number;
  status: 'Completed' | 'Undone';
  moves: { source: string; destination: string }[];
}

export interface Settings {
  theme: 'Dark' | 'Light';
  createCategoryFolders: boolean;
  moveInsteadOfCopy: boolean;
  removeEmptyFolders: boolean;
  duplicateHandling: 'rename' | 'skip';
}
