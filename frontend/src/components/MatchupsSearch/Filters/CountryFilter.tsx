import { IconSearch } from '@tabler/icons-react';
import {
  useMantineTheme,
  useMantineColorScheme,
  Combobox,
  useCombobox,
  CloseButton,
  Pill,
  PillsInput,
} from '@mantine/core';
import classes from '../../../styles/Navbar/SearchBar.module.css';
import { useLanguageStore } from '../../../stores/language-store';
import { SEARCH_TEAMS } from '../../../graphql/queries';
import { useQuery } from '@apollo/client';
import { useMemo, useState, useEffect } from 'react';
import { getCountryCode } from '../../../utils/imageUtils';
import debounce from 'lodash/debounce';

export default function NationsFilter() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const language = useLanguageStore((state) => state.language);
  const [teamName, setTeamName] = useState('');
  const [teamNameToSearch, setTeamNameToSearch] = useState('');
  const [dropDownMessage, setDropDownMessage] = useState('');
  const combobox = useCombobox();
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

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
    if (!selectedTeams.includes(value)) {
      setSelectedTeams([...selectedTeams, value]);
    }
  };

  const handleTeamRemove = (team: string) => {
    setSelectedTeams(selectedTeams.filter((selectedTeam) => selectedTeam !== team));
  };

  const pillValues = selectedTeams.map((team) => (
    <Pill key={team} withRemoveButton onRemove={() => handleTeamRemove(team)}>
      {team}
    </Pill>
  ));

  return (
    <Combobox store={combobox} onOptionSubmit={(value) => handleOptionSubmit(value)} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput
          leftSection={<IconSearch size={18} className={classes.icon} />}
          radius="xl"
          rightSection={
            <CloseButton
              onClick={() => setTeamName('')}
              className={teamName ? classes.visibleClose : classes.hiddenClose}
              onMouseDown={(event) => event.preventDefault()}
            />
          }
        >
          <Pill.Group>
            {pillValues}

            <Combobox.EventsTarget>
              <PillsInput.Field
                placeholder={language === 'en' ? 'Select one or more nations' : 'Velg en eller flere nasjoner'}
                variant="filled"
                value={teamName}
                classNames={classes}
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
