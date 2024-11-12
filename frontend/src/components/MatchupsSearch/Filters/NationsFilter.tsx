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
} from '@mantine/core';
import classes from '../../../styles/Filters/MultiSelect.module.css';
import { useLanguageStore } from '../../../stores/language-store';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { getCountryCode } from '../../../utils/imageUtils';
import debounce from 'lodash/debounce';
import translations from '../../../assets/translations.json';
import { getNorwegianName } from '../../../utils/translationUtils';
import { useFilterStore } from '../../../stores/filter-store';

export default function NationsFilter() {
  const { selectedTeams, setSelectedTeams } = useFilterStore();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const language = useLanguageStore((state) => state.language);
  const [teamName, setTeamName] = useState('');
  const [filteredTeams, setFilteredTeams] = useState<{ No: string; En: string }[]>([]);
  const [dropDownMessage, setDropDownMessage] = useState('');
  const combobox = useCombobox();

  // Filter the teams based on the query
  const filterTeams = useCallback(
    (query: string) => {
      if (!query) {
        setFilteredTeams([]);
        setDropDownMessage('');
        return;
      }

      const key = language === 'en' ? 'En' : 'No';
      const results = translations
        .filter((item) => item[key].toLowerCase().startsWith(query.toLowerCase()))
        .slice(0, 5);

      if (results.length === 0) {
        setDropDownMessage(language === 'en' ? 'No results found' : 'Ingen resultater funnet');
      } else {
        setDropDownMessage('');
      }

      setFilteredTeams(results);
    },
    [language],
  );

  // Debounce the filtering function to avoid rapid updates
  const debouncedFilterTeams = useMemo(() => debounce((query) => filterTeams(query), 200), [filterTeams]);

  useEffect(() => {
    debouncedFilterTeams(teamName);
  }, [teamName, language, debouncedFilterTeams]);

  // Create options for the combobox dropdown based on the filtered teams
  const options = filteredTeams.map((team) => (
    <Combobox.Option
      key={team.En}
      value={team.En}
      className={selectedTeams.includes(team.En) ? classes.optionSelected : classes.option}
      id={isDark ? classes.optionDark : ''}
    >
      {selectedTeams.includes(team.En) && <CheckIcon size={12} />}
      <div className={classes.imageContainer}>
        <span className={`fi fi-${getCountryCode([team.En])}`} id={classes.image}></span>
      </div>
      {language === 'en' ? team.En : team.No}
    </Combobox.Option>
  ));

  const handleOptionSubmit = (value: string) => {
    if (!selectedTeams.includes(value)) {
      setSelectedTeams([...selectedTeams, value]);
    }
  };

  const handleTeamRemove = (team: string) => {
    setSelectedTeams(selectedTeams.filter((selectedTeam) => selectedTeam !== team));
  };

  const pills = selectedTeams.map((team) => (
    <Pill key={team} withRemoveButton onRemove={() => handleTeamRemove(team)} className={classes.pill}>
      {language === 'en' ? team : getNorwegianName(team)}
    </Pill>
  ));

  return (
    <Combobox store={combobox} onOptionSubmit={(value) => handleOptionSubmit(value)} withinPortal={false}>
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
          {filteredTeams.length > 0 ? (
            options
          ) : (
            <Combobox.Empty style={{ color: theme.colors.dark[1] }}>{dropDownMessage}</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
