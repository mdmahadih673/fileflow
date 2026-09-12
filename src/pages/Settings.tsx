import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';
import type { Settings as SettingsType } from '../types/file';

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsType | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!window.api?.getSettings) return;
    window.api.getSettings().then(setSettings);
  }, []);

  const handleChange = (key: keyof SettingsType, value: any) => {
    if (!settings) return;
    setSettings({ ...settings, [key]: value });
  };

  const saveSettings = async () => {
    if (!settings) return;
    setSaving(true);
    await window.api?.saveSettings(settings);
    setTimeout(() => setSaving(false), 600); // UI feedback
  };

  if (!settings) return null;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <SettingsIcon className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Settings</h2>
        </div>
        <button 
          onClick={saveSettings}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-[#1c1f26] rounded-2xl border border-[#2d3748] divide-y divide-[#2d3748]">
        
        <div className="p-6 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-200">Theme</h3>
            <p className="text-sm text-gray-400 mt-1">Application appearance</p>
          </div>
          <div className="flex bg-[#0f1115] p-1 rounded-lg border border-[#2d3748]">
            <button 
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${settings.theme === 'Dark' ? 'bg-[#2d3748] text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => handleChange('theme', 'Dark')}
            >Dark</button>
            <button 
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${settings.theme === 'Light' ? 'bg-[#2d3748] text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => handleChange('theme', 'Light')}
            >Light</button>
          </div>
        </div>

        <div className="p-6 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-200">Create category folders</h3>
            <p className="text-sm text-gray-400 mt-1">Automatically create folders like 'Images', 'Documents'</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={settings.createCategoryFolders} onChange={(e) => handleChange('createCategoryFolders', e.target.checked)} />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>

        <div className="p-6 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-200">Remove empty folders</h3>
            <p className="text-sm text-gray-400 mt-1">Clean up leftover empty folders after moving files</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={settings.removeEmptyFolders} onChange={(e) => handleChange('removeEmptyFolders', e.target.checked)} />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>

        <div className="p-6 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-200">Duplicate Handling</h3>
            <p className="text-sm text-gray-400 mt-1">What to do when a file with the same name exists</p>
          </div>
          <select 
            className="bg-[#0f1115] border border-[#2d3748] text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none"
            value={settings.duplicateHandling}
            onChange={(e) => handleChange('duplicateHandling', e.target.value)}
          >
            <option value="rename">Rename (e.g. file (1).txt)</option>
            <option value="skip">Skip file</option>
          </select>
        </div>

      </div>
    </div>
  );
}
