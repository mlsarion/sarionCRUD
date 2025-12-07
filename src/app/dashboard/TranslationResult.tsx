import React from 'react';

interface TranslationResultProps {
  translationResult: string;
  target: string;
  targetLanguage: string;
}

export default function TranslationResult({
  translationResult,
  target,
  targetLanguage,
}: TranslationResultProps) {
  if (!translationResult) {
    return null;
  }

  return (
    <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-md">
      <h3 className="text-lg font-semibold text-green-900 mb-4">
        Translation Result ({target} - {targetLanguage})
      </h3>
      <p className="text-gray-800 whitespace-pre-wrap">{translationResult}</p>
      <button
        onClick={() => {
          navigator.clipboard.writeText(translationResult);
          alert('Translation copied to clipboard!');
        }}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        Copy to Clipboard
      </button>
    </div>
  );
}
