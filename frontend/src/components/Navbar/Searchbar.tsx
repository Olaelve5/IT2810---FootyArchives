import { IconSearch } from '@tabler/icons-react';
import classes from '../../styles/NavBar/Searchbar.module.css';
import { useMantineTheme, useMantineColorScheme, Combobox, useCombobox, CloseButton, TextInput } from '@mantine/core';
import { useLanguageStore } from '../../stores/language-store';
import { SEARCH_TEAMS } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { useMemo, useState, useEffect } from 'react';
import { getCountryCode } from '../../utils/imageUtils';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';

export default function Searchbar() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const language = useLanguageStore((state) => state.language);
  const [teamName, setTeamName] = useState('');
  const [teamNameToSearch, setTeamNameToSearch] = useState('');
  const [dropDownMessage, setDropDownMessage] = useState('');
  const combobox = useCombobox();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(SEARCH_TEAMS, {
    variables: { teamName: teamNameToSearch },
  });

  // Debounce the setTeamNameToSearch function to avoid unnecessary calls to the DB
  const debouncedSetTeamNameToSearch = useMemo(() => debounce(setTeamNameToSearch, 200), []);

  useEffect(() => {
    debouncedSetTeamNameToSearch(teamName);
  }, [teamName, debouncedSetTeamNameToSearch]);

  useEffect(() => {
    if (loading) {
      setDropDownMessage(language === 'en' ? 'Loading...' : 'Laster...');
    }

    if (error) {
      setDropDownMessage(language === 'en' ? 'Something went wrong' : 'Noe gikk galt');
    }

    if (data?.searchTeams?.length === 0) {
      setDropDownMessage(language === 'en' ? 'No results found' : 'Ingen resultater funnet');
    }
  }, [data, error, loading, language]);

  const options = data?.searchTeams?.map((team: string) => (
    <Combobox.Option key={team} value={team} className={classes.option} id={isDark ? classes.optionDark : ''}>
      <div className={classes.imageContainer}>
        <span className={`fi fi-${getCountryCode([team])}`} id={classes.image}></span>
      </div>
      {team}
    </Combobox.Option>
  ));

  const handleOptionSubmit = (value: string) => {
    navigate(`/project2/Country/${value}`);
    setTeamName('');
    setTeamNameToSearch('');
    combobox.closeDropdown();
  };

  return (
    <Combobox store={combobox} onOptionSubmit={(value) => handleOptionSubmit(value)} withinPortal={false}>
      <Combobox.Target>
        <TextInput
          leftSection={<IconSearch size={18} className={classes.icon} />}
          placeholder={language === 'en' ? 'Search for a nation' : 'Søk etter en nasjon'}
          variant="filled"
          size="sm"
          radius="xl"
          value={teamName}
          classNames={classes}
          rightSection={
            <CloseButton
              onClick={() => setTeamName('')}
              className={teamName ? classes.visibleClose : classes.hiddenClose}
              onMouseDown={(event) => event.preventDefault()}
            />
          }
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
          {data?.searchTeams?.length > 0 ? (
            options
          ) : (
            <Combobox.Empty style={{ color: theme.colors.dark[1] }}>{dropDownMessage}</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
