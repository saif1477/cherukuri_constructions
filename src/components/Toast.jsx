import { useEffect } from 'react';

export default function Toast({ message, isVisible, onHide }) {
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      onHide();
    }, 3000);

    return () => clearTimeout(timer);
  }, [isVisible, onHide]);

  return (
    <div
      className={`fixed bottom-20 left-0 right-0 mx-4 z-50 transition-all duration-300 ease-out ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl px-5 py-3 text-sm font-medium shadow-lg text-center">
        {message}
      </div>
    </div>
  );
}
