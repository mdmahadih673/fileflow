import { FileCategory } from '../../src/types/file.js';

export const fileCategories: Record<Exclude<FileCategory, 'Others'>, string[]> = {
  Images: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.tiff'],
  Videos: ['.mp4', '.mkv', '.mov', '.avi', '.webm', '.flv', '.wmv'],
  Audio: ['.mp3', '.wav', '.flac', '.m4a', '.aac', '.ogg'],
  Documents: ['.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx', '.csv', '.ppt', '.pptx'],
  Archives: ['.zip', '.rar', '.7z', '.tar', '.gz'],
  Code: ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.scss', '.json', '.py', '.java', '.cpp', '.c', '.php'],
  Applications: ['.exe', '.msi', '.apk'],
};

export function getFileCategory(extension: string): FileCategory {
  const ext = extension.toLowerCase();
  for (const [category, extensions] of Object.entries(fileCategories)) {
    if (extensions.includes(ext)) {
      return category as FileCategory;
    }
  }
  return 'Others';
}
