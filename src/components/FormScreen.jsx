import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import MaterialCard from './MaterialCard';
import { generatePdf, shareOrDownloadPdf } from '../utils/pdfGenerator';
import { saveContract } from '../utils/storage';

const todayString = () => new Date().toISOString().split('T')[0];

export default function FormScreen({ contract, onBack, onSaved }) {
  const { lang, t, toggleLang, isTeluguActive } = useLang();

  /* ── state ────────────────────────────────────────────── */
  const [description, setDescription] = useState('');
  const [materials, setMaterials] = useState([
    { id: crypto.randomUUID(), material: '', specifications: '', cost: '' },
  ]);
  const [billAmount, setBillAmount] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [contractId] = useState(() => contract?.id || crypto.randomUUID());

  /* ── populate from existing contract ──────────────────── */
  useEffect(() => {
    if (!contract) return;
    setDescription(contract.description || '');
    setBillAmount(contract.billAmount || '');
    if (contract.materials?.length) {
      setMaterials(
        contract.materials.map((m) => ({
          id: m.id || crypto.randomUUID(),
          material: m.material || '',
          specifications: m.specifications || '',
          cost: m.cost || '',
        }))
      );
    }
  }, [contract]);

  /* ── helpers ──────────────────────────────────────────── */
  const buildContractData = () => ({
    id: contractId,
    description,
    materials,
    billAmount,
  });

  const handleMaterialChange = (id, field, value) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleDeleteMaterial = (id) => {
    setMaterials((prev) => (prev.length <= 1 ? prev : prev.filter((m) => m.id !== id)));
  };

  const addMaterial = () => {
    setMaterials((prev) => [
      ...prev,
      { id: crypto.randomUUID(), material: '', specifications: '', cost: '' },
    ]);
  };

  /* ── save draft ───────────────────────────────────────── */
  const handleSaveDraft = async () => {
    try {
      const data = { ...buildContractData(), status: 'draft' };
      await saveContract(data);
      onSaved?.();
    } catch (err) {
      console.error('Failed to save draft:', err);
    }
  };

  /* ── generate PDF ─────────────────────────────────────── */
  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      const contractData = { ...buildContractData(), status: 'complete' };
      await saveContract(contractData);
      const blob = await generatePdf(contractData, lang);
      const filename = `Contract_Agreement.pdf`;
      await shareOrDownloadPdf(blob, filename);
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  /* ── shared input classes ─────────────────────────────── */
  const inputClasses =
    'w-full rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 ' +
    'px-4 py-3.5 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 ' +
    'focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all duration-200';

  /* ── render ───────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-12">
      {/* ─── Top navigation bar ────────────────────────── */}
      <nav className="sticky top-0 z-30 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-800/60">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Back */}
          <button
            onClick={onBack}
            className="flex items-center justify-center w-9 h-9 rounded-full active:bg-gray-100 dark:active:bg-gray-800 transition-all duration-200"
            aria-label="Go back"
          >
            <span className="text-xl text-gray-700 dark:text-gray-300">◂</span>
          </button>

          {/* Language toggle pill */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-0.5">
            <button
              onClick={() => isTeluguActive && toggleLang()}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                !isTeluguActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => !isTeluguActive && toggleLang()}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                isTeluguActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              తెలుగు
            </button>
          </div>

          {/* Save draft */}
          <button
            onClick={handleSaveDraft}
            className="text-sm font-semibold text-blue-600 active:text-blue-800 transition-all duration-200"
          >
            {t('saveAsDraft')}
          </button>
        </div>
      </nav>

      {/* ─── Static header ─────────────────────────────── */}
      <div className="p-5 flex items-center justify-center gap-3">
        <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" onError={(e) => e.target.style.display = 'none'} />
        <div className="text-center">
          <h1 className="text-lg font-bold tracking-widest text-gray-800 dark:text-gray-100">
            CHERUKURI CONSTRUCTIONS
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">{t('phone')}</p>
        </div>
      </div>

      {/* ─── Client details ────────────────────────────── */}
      <div className="px-5 space-y-3">
        {/* Removed Client Details */}
      </div>

      {/* ─── Materials section ─────────────────────────── */}
      <div className="px-5 mt-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">🧱</span>
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
            {t('materialsTitle')}
          </h2>
        </div>

        <div className="space-y-3">
          {materials.map((m, index) => (
            <MaterialCard
              key={m.id}
              index={index}
              data={m}
              onChange={handleMaterialChange}
              onDelete={handleDeleteMaterial}
            />
          ))}
        </div>

        <button
          onClick={addMaterial}
          className="mt-3 w-full rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 py-3.5 flex items-center justify-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 active:bg-blue-50 dark:active:bg-blue-950 transition-all duration-200"
        >
          <span className="text-lg leading-none">+</span>
          {t('addItem')}
        </button>

        {/* ─── Contract Details Description ──────────────── */}
        <div className="mt-6">
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide mb-2">
            {t('description')}
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('description')}
            rows="4"
            className={`${inputClasses} resize-y min-h-[100px]`}
          />
        </div>
      </div>

      {/* ─── Financials section ────────────────────────── */}
      <div className="px-5 mt-6">
        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide mb-2">
          {t('billContract')}
        </label>
        <input
          type="text"
          inputMode="numeric"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          placeholder={t('billPlaceholder')}
          className={`${inputClasses} text-2xl font-bold`}
        />
        <p className="text-xs text-gray-400 mt-1.5">
          ₹ {billAmount ? Number(billAmount).toLocaleString('en-IN') : '0'}
        </p>
      </div>

      {/* ─── Generate button (end of form) ───────────────── */}
      <div className="px-5 mt-10 mb-4">
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 text-base shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all duration-200 ${
            isGenerating ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              {t('generating')}
            </span>
          ) : (
            t('generateDocument')
          )}
        </button>
      </div>
    </div>
  );
}
