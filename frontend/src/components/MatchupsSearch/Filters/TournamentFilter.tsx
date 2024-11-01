import {
  CheckIcon,
  CloseButton,
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
  useMantineColorScheme,
} from '@mantine/core';
import classes from '../../../styles/Filters/MultiSelect.module.css';
import { IconSelector } from '@tabler/icons-react';

interface TournamentFilterProps {
  selectedTournaments: string[];
  setSelectedTournaments: (tournaments: string[]) => void;
}

const options = [
  { value: 'FIFA World Cup', label: 'FIFA World Cup' },
  { value: 'UEFA Euro', label: 'UEFA Euro' },
  { value: 'Copa América', label: 'Copa América' },
  { value: 'AFC Asian Cup', label: 'AFC Asian Cup' },
  { value: 'African Cup of Nations', label: 'African Cup of Nations' },
  { value: 'UEFA Nations League', label: 'UEFA Nations League' },
  { value: 'Friendly', label: 'Friendlies' },
];

function TournamentFilter({ selectedTournaments, setSelectedTournaments }: TournamentFilterProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const handleOptionSelect = (option: string) => {
    setSelectedTournaments(
      selectedTournaments.includes(option)
        ? selectedTournaments.filter((tournament: string) => tournament !== option)
        : [...selectedTournaments, option],
    );
  };

  const handleOptionRemove = (option: string) => {
    setSelectedTournaments(selectedTournaments.filter((tournament: string) => tournament !== option));
  };

  const pills = selectedTournaments.map((tournament) => (
    <Pill key={tournament} withRemoveButton onRemove={() => handleOptionRemove(tournament)} className={classes.pill}>
      {tournament}
    </Pill>
  ));

  const optionsList = options.map((option) => (
    <Combobox.Option
      value={option.value}
      active={selectedTournaments.includes(option.value)}
      className={classes.option}
      id={isDark ? classes.optionDark : ''}
    >
      <Group gap="sm">
        {selectedTournaments.includes(option.value) && <CheckIcon size={12} />}
        <span>{option.label}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleOptionSelect} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput
          pointer
          radius="xl"
          onClick={() => combobox.openDropdown()}
          classNames={classes}
          description="Tournaments"
          leftSection={<IconSelector size={18} className={classes.searchIcon} />}
          rightSection={
            selectedTournaments.length > 0 && (
              <CloseButton className={classes.visibleClose} onClick={() => setSelectedTournaments([])} />
            )
          }
        >
          <Pill.Group>
            {pills.length > 0 ? (
              pills
            ) : (
              <PillsInput.Field
                placeholder="Select one or more tournaments"
                variant="filled"
                className={classes.field}
              />
            )}

            <Combobox.EventsTarget>
              <PillsInput.Field type="hidden" onBlur={() => combobox.closeDropdown()} />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown className={isDark ? classes.darkDropdown : classes.lightDropdown}>
        <Combobox.Options>{optionsList}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default TournamentFilter;
