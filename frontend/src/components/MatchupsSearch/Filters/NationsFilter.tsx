import { IconSearch } from '@tabler/icons-react';
import {
  useMantineTheme,
  useMantineColorScheme,
  Combobox,
  useCombobox,
  CloseButton,
  Pill,
  PillsInput,
  CheckIcon,
  Loader,
} from '@mantine/core';
import classes from '../../../styles/Filters/MultiSelect.module.css';
import { useLanguageStore } from '../../../stores/language-store';
import { useState, useEffect, useMemo } from 'react';
import { getCountryCode } from '../../../utils/imageUtils';
import debounce from 'lodash/debounce';
import { useFilterStore } from '../../../stores/filter-store';
import { IconX } from '@tabler/icons-react';
import { SEARCH_NATIONS } from '../../../graphql/searchOperations';
import { useQuery } from '@apollo/client';

interface searchOption {
  en: string;
  no: string;
}

export default function NationsFilter() {
  const { selectedTeams, setSelectedTeams, lastQueriedFilters } = useFilterStore();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const language = useLanguageStore((state) => state.language);
  const [teamName, setTeamName] = useState('');
  const combobox = useCombobox();

  // Fetch teams based on the search term
  const { data, loading, refetch } = useQuery(SEARCH_NATIONS, {
    variables: { searchTerm: teamName, language, limit: 8 },
  });

  const filteredTeams = data?.search.nations || [];

  const debouncedRefetch = useMemo(
    () =>
      debounce((value: string) => {
        refetch({ searchTerm: value, language, limit: 8 });
      }, 300),
    [refetch, language],
  );

  // Update the search query based on the input value
  useEffect(() => {
    if (teamName.trim() !== '') {
      debouncedRefetch(teamName);
    }
  }, [teamName, debouncedRefetch]);

  // Set the selected teams to match the applied query
  useEffect(() => {
    if (lastQueriedFilters && lastQueriedFilters.teams) {
      setSelectedTeams(lastQueriedFilters.teams);
    }
  }, [lastQueriedFilters, setSelectedTeams]);

  // Create options for the combobox dropdown based on the filtered teams
  const options = filteredTeams.map((team: searchOption) => (
    <Combobox.Option
      key={team.en}
      value={team.en}
      className={
        selectedTeams.includes(team)
          ? isDark
            ? classes.optionSelectedDark
            : classes.optionSelectedLight
          : isDark
            ? classes.optionDark
            : classes.optionLight
      }
    >
      {selectedTeams.includes(team) && <CheckIcon size={12} />}
      <div className={classes.imageContainer}>
        <span className={`fi fi-${getCountryCode([team.en])}`} id={classes.image}></span>
      </div>
      {language === 'en' ? team.en : team.no}
    </Combobox.Option>
  ));

  // Handle selection of an option from the dropdown
  const handleOptionSubmit = (value: string) => {
      const team = filteredTeams.find((team: searchOption) => team.en === value);
      if (team && !selectedTeams.includes(team)) {
        setSelectedTeams([...selectedTeams, team]);
      }
    };

  // Handle removal of a selected option
  const handleTeamRemove = (team: searchOption) => {
    setSelectedTeams(selectedTeams.filter((selectedTeam) => selectedTeam !== team));
  };

  // Render selected teams as pills
  const pills = selectedTeams.map((team) => (
    <Pill
      key={team.en}
      aria-label={`Selected ${team} pill`}
      withRemoveButton
      onRemove={() => handleTeamRemove(team)}
      onClick={() => handleTeamRemove(team)}
      className={isDark ? classes.pillDark : classes.pillLight}
    >
      <p className={classes.pillText}>{language === 'en' ? team.en : team.no}</p>
    </Pill>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(value) => handleOptionSubmit(value)}
      withinPortal={false}
      classNames={{ group: classes.group }}
    >
      <Combobox.DropdownTarget>
        <PillsInput
          leftSection={<IconSearch size={18} className={classes.searchIcon} />}
          radius="xl"
          classNames={classes}
          description={language === 'en' ? 'Select one or more nations' : 'Velg en eller flere nasjoner'}
          rightSection={
            <CloseButton
              onClick={() => {
                setTeamName('');
              }}
              icon={
                <IconX size={18} color={teamName ? (isDark ? 'white' : theme.colors.darkmode[0]) : 'transparent'} />
              }
              className={teamName ? classes.visibleClose : classes.hiddenClose}
              onMouseDown={(event) => event.preventDefault()}
            />
          }
        >
          <Pill.Group>
            {pills}
            <Combobox.EventsTarget>
              <PillsInput.Field
                className={classes.field}
                placeholder={language === 'en' ? 'E.g. Norway' : 'F.eks. Norge'}
                variant="filled"
                value={teamName}
                onChange={(event) => {
                  setTeamName(event.currentTarget.value);
                  combobox.openDropdown();

                  if (event.currentTarget.value === '') {
                    combobox.closeDropdown();
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown className={isDark ? classes.darkDropdown : classes.lightDropdown}>
        <Combobox.Options>
          {loading && <Loader size={20} color="primary" />}

          {options}

          {options.length === 0 && teamName.trim() !== '' && !loading && (
            <Combobox.Empty style={{ color: theme.colors.dark[1] }}>
              {language === 'en' ? 'Found no matching nations' : 'Fant ingen matchende nasjoner'}
            </Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
