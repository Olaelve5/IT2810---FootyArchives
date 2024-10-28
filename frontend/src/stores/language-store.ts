import { Language } from '../types/LanguageType';
import { create } from 'zustand';

export interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

// The store is created with the initial state of 'en'
export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'en',
  setLanguage: (language: Language) => set({ language }),
}));
