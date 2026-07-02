import { useLang } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const statusStyles = {
  Draft: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Complete:
    'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
};

function ContractCard({ contract, index, onEdit, onDelete, t }) {
  const { id, description, billAmount, status, materials } = contract;

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(t('confirmDelete'))) {
      onDelete(id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onEdit(id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onEdit(id);
      }}
      className="relative rounded-xl bg-white p-4 shadow-sm border border-gray-100
        dark:bg-gray-900 dark:border-gray-800
        transition-all duration-200 active:scale-[0.98] cursor-pointer
        hover:shadow-md"
      style={{
        animation: `fadeSlideUp 0.4s ease-out ${index * 0.06}s both`,
      }}
    >
      {/* Delete button */}
      <button
        type="button"
        onClick={handleDelete}
        aria-label={t('delete')}
        className="absolute top-3 right-3 p-1.5 rounded-lg text-sm
          text-gray-400 hover:text-red-500 hover:bg-red-50
          dark:hover:text-red-400 dark:hover:bg-red-900/20
          transition-all duration-200"
      >
        🗑
      </button>

      <div className="flex items-start justify-between pr-8">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
            {t('agreementTitle')} - {id.slice(0, 4)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
            {materials?.length || 0} {t('materialsTitle')}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50 dark:border-gray-800">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${statusStyles[status] || statusStyles.Draft}`}
        >
          {status === 'Complete' ? t('complete') : t('draft')}
        </span>
        {billAmount != null && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            ₹{Number(billAmount).toLocaleString('en-IN')}
          </span>
        )}
      </div>
    </div>
  );
}

function EmptyState({ t }) {
  return (
    <div
      className="flex flex-col items-center justify-center flex-1 px-8 py-20"
      style={{ animation: 'fadeSlideUp 0.5s ease-out both' }}
    >
      <span className="text-6xl mb-4" role="img" aria-label="clipboard">
        📋
      </span>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
        {t('noContracts')}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-[260px]">
        {t('noContractsDesc')}
      </p>
    </div>
  );
}

export default function HomeScreen({
  contracts = [],
  onNewProject,
  onEditProject,
  onDeleteProject,
}) {
  const { t } = useLang();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Stagger animation keyframes */}
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Top bar */}
      <header
        className="sticky top-0 z-30 flex items-center justify-between px-4 py-3.5
          bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl
          border-b border-gray-100 dark:border-gray-800/60"
      >
        <h1
          className="text-sm font-semibold tracking-widest text-gray-900 dark:text-gray-100
            uppercase select-none"
          style={{ fontVariant: 'small-caps' }}
        >
          {t('appName')}
        </h1>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="w-9 h-9 flex items-center justify-center rounded-xl
            bg-gray-100 dark:bg-gray-800
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition-all duration-200 active:scale-90 text-lg"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </header>

      {/* Contract list or empty state */}
      {contracts.length === 0 ? (
        <EmptyState t={t} />
      ) : (
        <main className="flex-1 overflow-y-auto px-4 pt-4 pb-28">
          <div className="flex flex-col gap-3">
            {contracts.map((contract, i) => (
              <ContractCard
                key={contract.id}
                contract={contract}
                index={i}
                onEdit={onEditProject}
                onDelete={onDeleteProject}
                t={t}
              />
            ))}
          </div>
        </main>
      )}

      {/* Bottom sticky button */}
      <div className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-6 pt-4
        bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent
        dark:from-gray-950 dark:via-gray-950/80 pointer-events-none">
        <button
          type="button"
          onClick={onNewProject}
          className="w-full py-4 rounded-2xl font-semibold text-white text-base
            bg-gradient-to-b from-blue-600 to-blue-700
            shadow-lg shadow-blue-500/25
            transition-all duration-200 active:scale-95
            pointer-events-auto"
        >
          ＋ {t('newProject')}
        </button>
      </div>
    </div>
  );
}
