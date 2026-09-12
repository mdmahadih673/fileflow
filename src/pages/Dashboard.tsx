import { useState, useEffect } from 'react';
import { FolderPlus, FolderOpen, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import type { FileItem, OrganizationResult } from '../types/file';

type DashboardState = 'EMPTY' | 'SCANNING' | 'READY' | 'ORGANIZING' | 'COMPLETED' | 'ERROR';

export default function Dashboard() {
  const [state, setState] = useState<DashboardState>('EMPTY');
  const [folderPath, setFolderPath] = useState<string>('');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [progress, setProgress] = useState({ current: 0, total: 0, fileName: '' });
  const [result, setResult] = useState<OrganizationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!window.api?.onOrganizeProgress) return;
    const cleanup = window.api.onOrganizeProgress((data) => {
      setProgress(data);
    });
    return () => { cleanup(); };
  }, []);

  const handleSelectFolder = async () => {
    try {
      const api = window.api;
      if (!api?.selectFolder) {
        throw new Error('Desktop API is not available. Open FileFlow from the installed app, not the browser.');
      }
      const selected = await api.selectFolder();
      if (selected) {
        setFolderPath(selected);
        handleScanFolder(selected);
      }
    } catch (err: any) {
      setErrorMsg(err.message);
      setState('ERROR');
    }
  };

  const handleScanFolder = async (path: string) => {
    setState('SCANNING');
    try {
      const scannedFiles = await window.api?.scanFolder(path);
      setFiles(scannedFiles ?? []);
      setState('READY');
    } catch (err: any) {
      setErrorMsg(err.message);
      setState('ERROR');
    }
  };

  const handleOrganize = async () => {
    setState('ORGANIZING');
    try {
      const res = await window.api?.organizeFiles(folderPath, files);
      if (!res) {
        throw new Error('Organization did not complete.');
      }
      setResult(res);
      setState('COMPLETED');
    } catch (err: any) {
      setErrorMsg(err.message);
      setState('ERROR');
    }
  };

  const openOrganizedFolder = () => {
    window.api?.openFolder(folderPath);
  };

  const reset = () => {
    setState('EMPTY');
    setFolderPath('');
    setFiles([]);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 flex flex-col gap-8">
      {/* Header Info */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Clean your folders. Organize your files automatically.
        </h2>
        <p className="text-gray-400 mt-2">Let FileFlow magically sort your messy directories.</p>
      </div>

      {state === 'EMPTY' && (
        <div 
          onClick={handleSelectFolder}
          className="border-2 border-dashed border-[#2d3748] rounded-2xl bg-[#1c1f26]/50 hover:bg-[#1c1f26] hover:border-blue-500/50 transition-all cursor-pointer p-16 flex flex-col items-center justify-center gap-4 group"
        >
          <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FolderPlus className="w-8 h-8 text-blue-400" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-medium text-gray-200">Select a folder to organize</h3>
            <p className="text-gray-500 mt-1">Click to choose or drag & drop a folder here</p>
          </div>
          <button className="mt-4 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors">
            Choose Folder
          </button>
        </div>
      )}

      {state === 'SCANNING' && (
        <div className="bg-[#1c1f26] rounded-2xl p-12 flex flex-col items-center justify-center gap-6 border border-[#2d3748]">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <h3 className="text-xl font-medium">Scanning files...</h3>
          <p className="text-gray-400 text-sm break-all text-center max-w-md">
            Analyzing {folderPath}
          </p>
        </div>
      )}

      {state === 'READY' && (
        <div className="flex flex-col gap-6">
          <div className="bg-[#1c1f26] rounded-xl p-6 border border-[#2d3748] flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">Selected Folder</p>
              <p className="text-lg font-medium text-gray-200 mt-1 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-blue-400" />
                {folderPath}
              </p>
            </div>
            <button onClick={handleSelectFolder} className="text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 transition-colors">
              Change
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-medium">{files.length} files found</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Stats - grouped manually for simplicity */}
              {Object.entries(
                files.reduce((acc, file) => {
                  acc[file.category] = (acc[file.category] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([category, count]) => (
                <div key={category} className="bg-[#1c1f26] border border-[#2d3748] rounded-xl p-4 flex flex-col gap-2 hover:border-blue-500/30 transition-colors">
                  <div className="text-2xl font-semibold text-blue-400">{count}</div>
                  <div className="text-sm text-gray-400">{category}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button 
              onClick={handleOrganize}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              <Sparkles className="w-5 h-5" />
              Organize {files.length} Files
            </button>
          </div>
        </div>
      )}

      {state === 'ORGANIZING' && (
        <div className="bg-[#1c1f26] rounded-2xl p-12 flex flex-col items-center justify-center gap-6 border border-[#2d3748]">
          <div className="w-full max-w-md flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Organizing your files...</span>
              <span className="text-blue-400">{Math.round((progress.current / files.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${(progress.current / files.length) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 truncate mt-2">
              Moving: {progress.fileName}
            </p>
          </div>
        </div>
      )}

      {state === 'COMPLETED' && result && (
        <div className="bg-[#1c1f26] rounded-2xl p-12 flex flex-col items-center justify-center gap-6 border border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.1)]">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Organization Complete</h3>
            <p className="text-gray-400">
              Successfully organized {result.successful} out of {result.totalFiles} files.
            </p>
          </div>
          
          <div className="flex gap-4 mt-4">
            <button 
              onClick={openOrganizedFolder}
              className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
            >
              Open Folder
            </button>
            <button 
              onClick={reset}
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
            >
              Organize Another
            </button>
          </div>
        </div>
      )}

      {state === 'ERROR' && (
        <div className="bg-[#1c1f26] rounded-2xl p-12 flex flex-col items-center justify-center gap-6 border border-red-500/30">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">Something went wrong</h3>
            <p className="text-red-400 text-sm max-w-md">{errorMsg}</p>
          </div>
          <button 
            onClick={reset}
            className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors mt-4"
          >
            Try Again
          </button>
        </div>
      )}

    </div>
  );
}
