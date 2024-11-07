import translations from '../assets/translations.json';

export const getEnglishName = (name: string) => {
  const translation = translations.find((t) => t.No === name);
  return translation ? translation.En : name;
};

export const getNorwegianName = (name: string) => {
  const translation = translations.find((t) => t.En === name);
  return translation ? translation.No : name;
};
