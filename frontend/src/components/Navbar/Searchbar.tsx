import { Input } from '@mantine/core';
import {IconSearch} from '@tabler/icons-react';
import classes from '../../styles/NavBar/Searchbar.module.css';
import { useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { useLanguageStore } from '../../stores/language-store';
import { SEARCH_TEAMS } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

export default function Searchbar() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const language = useLanguageStore((state) => state.language);
  const [teamName, setTeamName] = useState('');

  const { loading, error, data } = useQuery(SEARCH_TEAMS, {
    variables: { teamName },
  });

  useEffect(() => {
    if (data) {
      console.log(data.searchTeams);
    }
  }, [data]);

  if (loading) {
    console.log('Loading...');
  }

  if (error) {
    console.log(error);
  }

  return (
    <Input
      leftSection={<IconSearch size={18} className={classes.icon}/>}
      placeholder={language === 'en' ? 'Search for a nation or a matchup' : 'Søk etter en nasjon eller en kamp'}
      variant="filled"
      size='sm'
      radius="xl"
      classNames={classes}
      value={teamName}
      onChange={(event) => setTeamName(event.currentTarget.value)}
      styles={{
        input: {
            backgroundColor: colorScheme === 'dark' ? theme.colors.darkmode[2] : 'white',
        },
    }}
    />
  );
}


 