import { MultiSelect } from '@mantine/core';
import { useLanguageStore } from '../../../stores/language-store';
import { useState } from 'react';
import classes from '../../../styles/Filters/MultiSelect.module.css';
import { useMantineColorScheme } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';

const options = [
  { value: 'all', label: 'All' },
  { value: 'FIFA World Cup', label: 'FIFA World Cup' },
  { value: 'Euros', label: 'Euros' },
  { value: 'Copa America', label: 'Copa America' },
  { value: 'Asian Cup', label: 'Asian Cup' },
  { value: 'African Cup of Nations', label: 'African Cup of Nations' },
  { value: 'Nations League', label: 'Nations League' },
  { value: 'Friendlies', label: 'Friendlies' },
  { value: 'Other', label: 'Other' },
];

function TournamentFilter() {
  const language = useLanguageStore((state) => state.language);
  const [value, setValue] = useState<string[]>([]);

  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = useMantineTheme();

  return (
    <MultiSelect
      classNames={classes}
      onChange={setValue}
      radius="xl"
      label={language === 'en' ? 'Tournaments' : 'Turneringer'}
      placeholder={language === 'en' ? 'Select one or more tournaments' : 'Velg en eller flere turneringer'}
      data={options}
      clearable
      value={value}
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

export default TournamentFilter;
