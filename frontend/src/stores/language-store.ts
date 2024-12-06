import { Language } from '../types/LanguageType';
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

// Define the type for the language state
export interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

// Define the type for the persist configuration
type LanguagePersist = (
  config: (set: (partial: Partial<LanguageState>) => void) => LanguageState,
  options: PersistOptions<LanguageState>,
) => (set: (partial: Partial<LanguageState>) => void) => LanguageState;

// The store is created with the initial state of 'en'
export const useLanguageStore = create<LanguageState>(
  (persist as unknown as LanguagePersist)(
    (set) => ({
      language: 'en',
      setLanguage: (language: Language) => set({ language }),
    }),
    {
      name: 'language-storage',
    },
  ),
);
