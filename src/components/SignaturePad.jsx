import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useLang } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function SignaturePad({ onSave }) {
  const { t } = useLang();
  const { isDark } = useTheme();
  const signatureRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleClear = () => {
    signatureRef.current?.clear();
    setIsEmpty(true);
  };

  const handleConfirm = () => {
    if (signatureRef.current?.isEmpty()) return;

    const dataUrl = signatureRef.current
      .getTrimmedCanvas()
      .toDataURL('image/png');
    onSave(dataUrl);
  };

  return (
    <div style={{ touchAction: 'none' }}>
      {/* Label */}
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
        {t('ownerSignature')}
      </label>

      {/* Canvas wrapper */}
      <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <SignatureCanvas
          ref={signatureRef}
          penColor={isDark ? '#93c5fd' : '#1e3a5f'}
          backgroundColor={isDark ? '#111827' : '#ffffff'}
          canvasProps={{
            className: 'w-full h-full',
            style: { width: '100%', height: '200px' },
          }}
          onBegin={() => setIsEmpty(false)}
        />
      </div>

      {/* Bottom controls */}
      <div className="flex justify-between mt-2">
        <button
          type="button"
          onClick={handleClear}
          className="text-sm text-red-500 hover:text-red-600 transition-colors duration-150"
        >
          {t('clear') || 'Clear'}
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isEmpty}
          className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {t('confirm') || 'Confirm'}
        </button>
      </div>
    </div>
  );
}
