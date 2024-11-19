import { IconSearch } from '@tabler/icons-react';
import classes from '../../styles/Navbar/SearchBar.module.css';
import {
  useMantineTheme,
  Loader,
  useMantineColorScheme,
  Combobox,
  useCombobox,
  CloseButton,
  TextInput,
} from '@mantine/core';
import { useLanguageStore } from '../../stores/language-store';
import { useMemo, useState, useEffect } from 'react';
import { getCountryCode } from '../../utils/imageUtils';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { SEARCH } from '../../graphql/searchOperations';
import { useQuery } from '@apollo/client';
import { IconTrophy } from '@tabler/icons-react';

interface searchOption {
  type: string;
  value: string;
}

export default function Searchbar() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const { language } = useLanguageStore();
  const [teamName, setTeamName] = useState('');
  const combobox = useCombobox();
  const navigate = useNavigate();

  // Fetch the search results from the backend
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: { searchTerm: teamName, language: language },
  });

  const teams = data?.search || [];

  // Debounce the search query to avoid unnecessary requests
  const debouncedRefetch = useMemo(
    () =>
      debounce((value: string) => {
        refetch({ searchTerm: value, language });
      }, 300),
    [refetch, language],
  );

  // Update the search query based on the input value
  useEffect(() => {
    if (teamName.trim() !== '') {
      debouncedRefetch(teamName);
    }
  }, [teamName, debouncedRefetch]);

  // Create options for the combobox dropdown based on the filtered teams
  const options = teams.map((option: searchOption) => (
    <Combobox.Option
      key={option.value}
      value={option.value}
      className={classes.option}
      id={isDark ? classes.optionDark : classes.optionLight}
    >
      {option.type === 'nation' && (
        <div className={classes.imageContainer}>
          <span className={`fi fi-${getCountryCode([option.value])}`} id={classes.image}></span>
        </div>
      )}
      {option.type === 'tournament' && (
        <IconTrophy size={22} />
      )}
      {option.value}
    </Combobox.Option>
  ));

  // Handle the submission of an option in the combobox
  const handleOptionSubmit = (value: string) => {
    const selectedOption: searchOption | undefined = data?.search.find((team: searchOption) => team.value === value);
    const datatype = selectedOption?.type;

    if (datatype === 'nation') {
      navigate(`/project2/nation/${value}`);
    } else if (datatype === 'tournament') {
      navigate(`/project2/tournament/${value}`);
    }
    setTeamName('');
    combobox.closeDropdown();
  };

  return (
    <Combobox store={combobox} onOptionSubmit={handleOptionSubmit} withinPortal={false}>
      <Combobox.Target>
        <TextInput
          leftSection={<IconSearch size={20} className={classes.icon} />}
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

            if (event.currentTarget.value === '') {
              combobox.closeDropdown();
            }
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
          {loading && <Loader size={20} color="primary" />}
          {options}
          {teams.length === 0 && !loading && (
            <Combobox.Empty className={classes.option} id={isDark ? classes.optionDark : classes.optionLight}>
              {language === 'en' ? 'Found no matching options' : 'Fant ingen matchende alternativer'}
            </Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
