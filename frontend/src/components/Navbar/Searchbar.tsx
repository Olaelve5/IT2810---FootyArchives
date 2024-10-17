import { Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import classes from '../../styles/NavBar/Searchbar.module.css';
import { useMantineTheme, useMantineColorScheme, Combobox, useCombobox } from '@mantine/core';
import { useLanguageStore } from '../../stores/language-store';
import { SEARCH_TEAMS } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { getCountryCode } from '../../utils/imageUtils';
import { useNavigate } from 'react-router-dom';

export default function Searchbar() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const language = useLanguageStore((state) => state.language);
  const [teamName, setTeamName] = useState('');
  const combobox = useCombobox();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(SEARCH_TEAMS, {
    variables: { teamName },
  });

  const options = data?.searchTeams.map((team: string) => (
    <Combobox.Option key={team} value={team} className={classes.option} id={isDark ? classes.optionDark : ''}>
      <span className={`fi fi-${getCountryCode([team])}`} id={classes.image}></span>
      {team}
    </Combobox.Option>
  ));

  const handleOptionSubmit = (value: string) => {
    navigate(`/project2/Country/${value}`);
    setTeamName('');
    combobox.closeDropdown();
  };

  if (loading) {
    console.log('Loading...');
  }

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    console.log(options);
  }, [data, options]);

  return (
    <Combobox store={combobox} onOptionSubmit={(value) => handleOptionSubmit(value)} withinPortal={false}>
      <Combobox.Target>
        <Input
          leftSection={<IconSearch size={18} className={classes.icon} />}
          placeholder={language === 'en' ? 'Search for a nation or a matchup' : 'Søk etter en nasjon eller en kamp'}
          variant="filled"
          size="sm"
          radius="xl"
          classNames={classes}
          value={teamName}
          onChange={(event) => {
            setTeamName(event.currentTarget.value);
            combobox.openDropdown();
          }}
          styles={{
            input: {
              backgroundColor: colorScheme === 'dark' ? theme.colors.darkmode[2] : 'white',
            },
          }}
        />
      </Combobox.Target>

      <Combobox.Dropdown className={isDark ? classes.darkDropdown : classes.lightDropdown}>
        <Combobox.Options>
          {data?.searchTeams.length > 0 ? (
            options
          ) : (
            <Combobox.Empty style={{color: theme.colors.dark[1]}}>{language === 'en' ? 'No results found' : 'Ingen resultater funnet'}</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
