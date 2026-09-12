import { useState, useEffect } from 'react';
import { History as HistoryIcon, Undo2, CheckCircle } from 'lucide-react';
import type { HistoryItem } from '../types/file';

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    const api = window.api;
    if (!api?.getHistory) {
      setHistory([]);
      setLoading(false);
      return;
    }
    const data = await api.getHistory();
    setHistory(data);
    setLoading(false);
  };

  const handleUndo = async (id: string) => {
    await window.api?.undoOrganization(id);
    await loadHistory();
  };

  if (loading) {
    return <div className="text-gray-400 p-8">Loading history...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <HistoryIcon className="w-6 h-6 text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">History</h2>
      </div>

      {history.length === 0 ? (
        <div className="text-center p-12 bg-[#1c1f26] rounded-2xl border border-[#2d3748]">
          <p className="text-gray-400">No organization history yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {history.map((item) => (
            <div key={item.id} className="bg-[#1c1f26] border border-[#2d3748] p-5 rounded-xl flex items-center justify-between group">
              <div>
                <h3 className="font-medium text-gray-200">{item.folderPath}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    {item.status === 'Completed' ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Undo2 className="w-4 h-4 text-orange-500" />
                    )}
                    {item.status}
                  </span>
                  <span>{item.totalFiles} files</span>
                  <span>{new Date(item.timestamp).toLocaleString()}</span>
                </div>
              </div>
              
              {item.status === 'Completed' && (
                <button
                  onClick={() => handleUndo(item.id)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Undo2 className="w-4 h-4" />
                  Undo
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
