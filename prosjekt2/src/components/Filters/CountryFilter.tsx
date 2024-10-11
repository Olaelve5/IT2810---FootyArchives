import { MultiSelect, ComboboxItem, OptionsFilter } from '@mantine/core';
import { useLanguageStore } from '../../stores/language-store';
import classes from '../../styles/Filters/MultiSelect.module.css';
import { useMantineColorScheme } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

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
      leftSection={<IconSearch size={18} className={classes.icon} />}
      label={language === 'en' ? 'Nations' : 'Nasjoner'}
      placeholder={language === 'en' ? 'Select one or more nation' : 'Velg en eller flere nasjoner'}
      data={['Norway', 'Brazil', 'France', 'Germany', 'Spain']}
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
