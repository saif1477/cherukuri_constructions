import { useLang } from '../context/LanguageContext';

export default function MaterialCard({ index, data, onChange, onDelete }) {
  const { t } = useLang();

  return (
    <div className="animate-slideUp bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 mb-3 transition-all duration-200">
      {/* Top row: S.No badge + delete */}
      <div className="flex items-center justify-between mb-3">
        <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
            {index + 1}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onDelete(data.id)}
          className="text-red-400 hover:text-red-500 transition-colors duration-150"
          aria-label="Delete material"
        >
          🗑
        </button>
      </div>

      {/* Material input */}
      <input
        type="text"
        value={data.material || ''}
        onChange={(e) => onChange(data.id, 'material', e.target.value)}
        placeholder={t('material')}
        className="w-full bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 mb-2"
      />

      {/* Specifications and Cost input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={data.specifications || ''}
          onChange={(e) => onChange(data.id, 'specifications', e.target.value)}
          placeholder={t('specifications')}
          className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-200"
        />
        <input
          type="text"
          value={data.cost || ''}
          onChange={(e) => onChange(data.id, 'cost', e.target.value)}
          placeholder={t('cost')}
          className="w-1/3 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-200"
        />
      </div>
    </div>
  );
}
