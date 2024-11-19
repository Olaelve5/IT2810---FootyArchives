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
  en: string;
  no: string;
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
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const nations = data?.search.nations || [];
  const tournaments = data?.search.tournaments || [];

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
  const nationOptions = [
    ...nations.map((nation: searchOption) => (
      <Combobox.Option
        key={nation.en}
        value={nation.en}
        className={classes.option}
        id={isDark ? classes.optionDark : classes.optionLight}
        data-type="nation" // Add custom data attribute
      >
        <div className={classes.imageContainer}>
          <span className={`fi fi-${getCountryCode([nation.en])}`} id={classes.image}></span>
        </div>
        {language === 'en' ? nation.en : nation.no}
      </Combobox.Option>
    )),
  ];

  const tournamentOptions = [
    ...tournaments.map((tournament: searchOption) => (
      <Combobox.Option
        key={tournament.en}
        value={tournament.en}
        className={classes.option}
        id={isDark ? classes.optionDark : classes.optionLight}
        data-type="tournament" // Add custom data attribute
      >
        <IconTrophy size={20} />
        {language === 'en' ? tournament.en : tournament.no}
      </Combobox.Option>
    )),
  ];

  const handleOptionSubmit = (value: string) => {
    if (!data?.search) {
      console.error('Data is not available');
      return;
    }

    const { nations, tournaments } = data.search;

    // Search in nations and tournaments
    const selectedOption =
      nations.find((nation: searchOption) => nation.en === value || nation.no === value) ||
      tournaments.find((tournament: searchOption) => tournament.en === value || tournament.no === value);

    const datatype = selectedOption ? (nations.includes(selectedOption) ? 'nation' : 'tournament') : null;

    if (datatype === 'nation') {
      navigate(`/project2/nation/${value}`);
    } else if (datatype === 'tournament') {
      navigate(`/project2/tournament/${value}`);
    } else {
      console.error('No matching option found for the submitted value.');
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

          <Combobox.Group label={language === 'en' ? 'Nations' : 'Nasjoner'}>
            {nationOptions.length > 0 ? nationOptions : <p>{loading ? 'Loading...' : 'No options found'}</p>}
          </Combobox.Group>

          <Combobox.Group label={language === 'en' ? 'Tournaments' : 'Turneringer'}>
            {tournamentOptions.length > 0 ? tournamentOptions : <p>{loading ? 'Loading...' : 'No options found'}</p>}
          </Combobox.Group>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
