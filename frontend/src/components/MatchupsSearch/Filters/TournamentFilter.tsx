import {
  CheckIcon,
  CloseButton,
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
  useMantineColorScheme,
  Loader,
} from '@mantine/core';
import classes from '../../../styles/Filters/MultiSelect.module.css';
import { IconSelector } from '@tabler/icons-react';
import { useFilterStore } from '../../../stores/filter-store';
import { useLanguageStore } from '../../../stores/language-store';
import { SEARCH_TOURNAMENTS } from '../../../graphql/searchOperations';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

// Default options to display when the search query is empty
const options = [
  { value: 'FIFA World Cup', label: 'FIFA World Cup' },
  { value: 'UEFA Euro', label: 'UEFA Euro' },
  { value: 'Copa América', label: 'Copa América' },
  { value: 'AFC Asian Cup', label: 'AFC Asian Cup' },
  { value: 'African Cup of Nations', label: 'African Cup of Nations' },
  { value: 'Friendly', label: 'Friendlies' },
];

function TournamentFilter() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const { selectedTournaments, setSelectedTournaments, lastQueriedFilters } = useFilterStore();
  const { language } = useLanguageStore();
  const [query, setQuery] = useState('');
  const [dropDownOptions, setDropDownOptions] = useState<string[]>(options.map((option) => option.value));

  // Use Apollo's useQuery hook to fetch tournament options based on the search query
  const { loading, error, data } = useQuery(SEARCH_TOURNAMENTS, {
    variables: { searchTerm: query, language, limit: 6 },
    onCompleted: (data) => {
      setDropDownOptions(data.search.tournaments.map((tournament: { en: string }) => tournament.en));
    },
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  // Handle selection of an option from the dropdown
  const handleOptionSelect = (option: string) => {
    setSelectedTournaments(
      selectedTournaments.includes(option)
        ? selectedTournaments.filter((tournament: string) => tournament !== option)
        : [...selectedTournaments, option],
    );
  };

  // Handle removal of a selected option
  const handleOptionRemove = (option: string) => {
    setSelectedTournaments(selectedTournaments.filter((tournament: string) => tournament !== option));
  };

  // Set the selected tournaments to match the applied query
  useEffect(() => {
    if (lastQueriedFilters && lastQueriedFilters.tournaments) {
      setSelectedTournaments(lastQueriedFilters.tournaments);
    }
  }, [lastQueriedFilters, setSelectedTournaments]);

  // Update dropdown options when the query changes
  useEffect(() => {
    if (query === '') {
      setDropDownOptions(options.map((option) => option.value));
    }
  }, [data, query]);

  // Render selected tournaments as pills
  const pills = selectedTournaments.map((tournament) => (
    <Pill
      key={tournament}
      withRemoveButton
      aria-label={`Selected ${tournament} pill`}
      onRemove={() => handleOptionRemove(tournament)}
      onClick={() => handleOptionRemove(tournament)}
      className={isDark ? classes.pillDark : classes.pillLight}
    >
      <p className={classes.pillText}>{tournament}</p>
    </Pill>
  ));

  // Render dropdown options
  const optionsList = dropDownOptions.map((option) => (
    <Combobox.Option
      value={option}
      active={selectedTournaments.includes(option)}
      className={
        selectedTournaments.includes(option)
          ? isDark
            ? classes.optionSelectedDark
            : classes.optionSelectedLight
          : isDark
            ? classes.optionDark
            : classes.optionLight
      }
      key={option}
    >
      <Group gap="sm">
        {selectedTournaments.includes(option) && <CheckIcon size={12} />}
        <span>{option}</span>
      </Group>
    </Combobox.Option>
  ));

  // Render the combobox component
  return (
    <Combobox store={combobox} onOptionSubmit={handleOptionSelect} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput
          radius="xl"
          onClick={() => combobox.openDropdown()}
          classNames={classes}
          description={language === 'en' ? 'Select one or more tournaments' : 'Velg en eller flere turneringer'}
          leftSection={<IconSelector size={18} className={classes.searchIcon} />}
          rightSection={
            selectedTournaments.length > 0 &&
            (loading ? (
              <Loader size={18} color="primary" />
            ) : (
              <CloseButton className={classes.visibleClose} onClick={() => setQuery('')} />
            ))
          }
        >
          <Pill.Group>
            {pills}
            <Combobox.EventsTarget>
              <PillsInput.Field
                placeholder={
                  selectedTournaments.length <= 0
                    ? language === 'en'
                      ? 'E.g. FIFA World Cup'
                      : 'F.eks. FIFA World Cup'
                    : ''
                }
                variant="filled"
                className={classes.field}
                value={query}
                onChange={(event) => {
                  setQuery(event.currentTarget.value);
                  combobox.openDropdown();
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>
      {error && query.length > 0 ? (
        <p className={classes.errorMessage}>{language === 'en' ? 'Something went wrong' : 'Noe gikk galt'}</p>
      ) : null}
      <Combobox.Dropdown className={isDark ? classes.darkDropdown : classes.lightDropdown}>
        <Combobox.Options>
          {optionsList.length > 0 ? (
            optionsList
          ) : (
            <Combobox.Option value="no-results" disabled>
              {language === 'en' ? 'No tournaments found' : 'Ingen turneringer funnet'}
            </Combobox.Option>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default TournamentFilter;
