import { MultiSelect, ComboboxItem, OptionsFilter } from '@mantine/core';
import { useLanguageStore } from '../../stores/language-store';
import classes from '../../styles/Filters/MultiSelect.module.css';
import { useMantineColorScheme } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const splittedSearch = search.toLowerCase().trim().split(' ');
  return (options as ComboboxItem[]).filter((option) => {
    const words = option.label.toLowerCase().trim().split(' ');
    return splittedSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
  });
};

export default function CountryFilter() {
  const language = useLanguageStore((state) => state.language);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = useMantineTheme();

  return (
    <MultiSelect
      classNames={classes}
      label={language === 'en' ? 'Teams' : 'Lag'}
      placeholder={language === 'en' ? 'Select one or more teams' : 'Velg ett eller flere lag'}
      data={['Norway', 'Brazil', 'France']}
      filter={optionsFilter}
      searchable
      clearable
      radius="xl"
      styles={{
        input: {
          backgroundColor: isDark ? theme.colors.darkmode[2] : 'white',
        },
        dropdown: {
          backgroundColor: isDark ? theme.colors.darkmode[2] : 'white',
        },
      }}
    />
  );
}
