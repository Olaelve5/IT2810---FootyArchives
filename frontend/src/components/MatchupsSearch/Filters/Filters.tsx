import CountryFilter from './NationsFilter';
import TournamentFilter from './TournamentFilter';
import classes from '../../../styles/Filters/Filters.module.css';
// import YearsInput from './YearsInput';
import { Button, Menu } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import { useMantineColorScheme } from '@mantine/core';
import { QueryFilterType } from '../../../types/QueryFilterType';
import { useState } from 'react';

interface FiltersProps {
  filters: QueryFilterType;
  setFilters: (filters: QueryFilterType) => void;
}

export default function Filters({ setFilters }: FiltersProps) {
  // const [rangeValue, setRangeValue] = useState<[number, number]>([1872, 2024]);
  // const [endValue, setEndValue] = useState<[number, number]>([1872, 2024]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedTournaments, setSelectedTournaments] = useState<string[]>([]);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const handleApplyFilters = () => {
    setFilters({
      teams: selectedTeams,
      tournaments: selectedTournaments,
      // yearRange: { start: rangeValue[0], end: rangeValue[1] },
    });
    
  };

  const handleClearFilters = () => {
    setSelectedTeams([]);
    setSelectedTournaments([]);
    // setRangeValue([1872, 2024]);
  };

  return (
    <Menu withArrow closeOnItemClick={false}>
      <Menu.Target>
        <Button
          leftSection={<IconFilter size={20} />}
          radius="xl"
          color="transparent"
          className={isDark ? classes.filterButtonDark : classes.filterButtonLight}
        >
          Filters
        </Button>
      </Menu.Target>

      <Menu.Dropdown className={classes.dropdown}>
        <div className={classes.container}>
          <CountryFilter setSelectedTeams={setSelectedTeams} selectedTeams={selectedTeams} />
          <TournamentFilter />
          <div className={classes.buttonContainer}>
            <Button className={classes.resetApplyButton} radius={'xl'} color="transparent" onClick={handleClearFilters}>
              Clear
            </Button>
            <Button className={classes.resetApplyButton} radius={'xl'} onClick={handleApplyFilters}>
              Apply
            </Button>
          </div>
        </div>
      </Menu.Dropdown>
    </Menu>
  );
}
