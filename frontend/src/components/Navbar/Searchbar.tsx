import { IconSearch } from '@tabler/icons-react';
import classes from '../../styles/Navbar/SearchBar.module.css';
import { useMantineTheme, useMantineColorScheme, Combobox, useCombobox, CloseButton, TextInput } from '@mantine/core';
import { useLanguageStore } from '../../stores/language-store';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { getCountryCode } from '../../utils/imageUtils';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import translations from '../../assets/translations.json'; // Assuming JSON file is located here

export default function Searchbar() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const { language } = useLanguageStore();
  const [teamName, setTeamName] = useState('');
  const [filteredTeams, setFilteredTeams] = useState<{ No: string; En: string }[]>([]);
  const [dropDownMessage, setDropDownMessage] = useState('');
  const combobox = useCombobox();
  const navigate = useNavigate();

  // Filter the teams based on the query
  const filterTeams = useCallback(
    (query: string) => {
      if (!query) {
        setFilteredTeams([]);
        setDropDownMessage('');
        return;
      }

      const key = language === 'en' ? 'En' : 'No';
      const results = translations.filter((item) => item[key].toLowerCase().startsWith(query.toLowerCase())).slice(0, 8);

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
    <Combobox.Option key={team.En} value={team.En} className={classes.option} id={isDark ? classes.optionDark : ''}>
      <div className={classes.imageContainer}>
        <span className={`fi fi-${getCountryCode([team.En])}`} id={classes.image}></span>
      </div>
      {language === 'en' ? team.En : team.No}
    </Combobox.Option>
  ));

  // Handle the submission of an option in the combobox
  const handleOptionSubmit = (value: string) => {
    navigate(`/project2/nation/${value}`);
    setTeamName('');
    combobox.closeDropdown();
  };

  return (
    <Combobox store={combobox} onOptionSubmit={handleOptionSubmit} withinPortal={false}>
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
