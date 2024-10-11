import { Input } from '@mantine/core';
import {IconSearch} from '@tabler/icons-react';
import classes from '../../styles/Searchbar.module.css';
import { useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { useLanguageStore } from '../../stores/language-store';

export default function Searchbar() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const language = useLanguageStore((state) => state.language);

  return (
    <Input
      leftSection={<IconSearch size={18} className={classes.icon}/>}
      placeholder={language === 'en' ? 'Search for a team or a matchup' : 'Søk etter et lag eller en kamp'}
      variant="filled"
      size='sm'
      radius="xl"
      classNames={classes}
      styles={{
        input: {
            backgroundColor: colorScheme === 'dark' ? theme.colors.darkmode[2] : 'white',
        },
    }}
    />
  );
}


 