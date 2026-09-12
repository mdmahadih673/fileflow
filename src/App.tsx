import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import SettingsPage from './pages/Settings';

export type Page = 'dashboard' | 'history' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0f1115] text-gray-100 overflow-hidden">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-6">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'history' && <History />}
        {currentPage === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
}

export default App;
