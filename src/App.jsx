import { useState, useEffect, useCallback } from 'react';
import HomeScreen from './components/HomeScreen';
import FormScreen from './components/FormScreen';
import { getAllContracts, deleteContract } from './utils/storage';

export default function App() {
  const [screen, setScreen] = useState('home'); // 'home' | 'form'
  const [contracts, setContracts] = useState([]);
  const [editingContract, setEditingContract] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleScreen, setVisibleScreen] = useState('home');

  const loadContracts = useCallback(async () => {
    const data = await getAllContracts();
    setContracts(data);
  }, []);

  useEffect(() => {
    loadContracts();
  }, [loadContracts]);

  const navigateTo = (target, contractData = null) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setScreen(target);
      setVisibleScreen(target);
      setEditingContract(contractData);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  };

  const handleNewProject = () => {
    navigateTo('form', null);
  };

  const handleEditProject = (id) => {
    const c = contracts.find((ct) => ct.id === id);
    if (c) navigateTo('form', c);
  };

  const handleDeleteProject = async (id) => {
    const updated = await deleteContract(id);
    setContracts(updated);
  };

  const handleBack = () => {
    navigateTo('home');
  };

  const handleSaved = async () => {
    await loadContracts();
    navigateTo('home');
  };

  return (
    <div className="h-dvh bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      <div
        className={`absolute inset-0 overflow-y-auto transition-all duration-300 ease-out ${
          visibleScreen === 'home'
            ? isTransitioning
              ? 'opacity-0 scale-95'
              : 'opacity-100 scale-100'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <HomeScreen
          contracts={contracts}
          onNewProject={handleNewProject}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
        />
      </div>

      <div
        className={`absolute inset-0 overflow-y-auto transition-all duration-300 ease-out ${
          visibleScreen === 'form'
            ? isTransitioning
              ? 'opacity-0 translate-x-8'
              : 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-8 pointer-events-none'
        }`}
      >
        {screen === 'form' && (
          <FormScreen
            contract={editingContract}
            onBack={handleBack}
            onSaved={handleSaved}
          />
        )}
      </div>
    </div>
  );
}
