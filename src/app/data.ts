// Translation API Configuration and Constants
export const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const DEFAULT_SOURCE = 'en';
export const DEFAULT_TARGET = 'es';
export const DEFAULT_LANGUAGE = 'English';

export const MAX_CHAR_COUNT = 5000;

// Language codes and names mapping
export const languages: Record<string, string> = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  ru: 'Russian',
  ja: 'Japanese',
  ko: 'Korean',
  zh: 'Chinese',
  ar: 'Arabic',
  hi: 'Hindi',
  nl: 'Dutch',
  pl: 'Polish',
  tr: 'Turkish',
  id: 'Indonesian',
  th: 'Thai',
  vi: 'Vietnamese',
  el: 'Greek',
  sv: 'Swedish',
};

// Translation sources (API endpoints)
export const translationSources: Record<string, string> = {
  'Google Translate': 'https://translate.google.com',
  'Bing Translator': 'https://www.bing.com/translator',
  'DeepL': 'https://www.deepl.com',
};
