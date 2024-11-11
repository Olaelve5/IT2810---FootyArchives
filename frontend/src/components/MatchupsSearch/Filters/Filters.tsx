import CountryFilter from './NationsFilter';
import TournamentFilter from './TournamentFilter';
import classes from '../../../styles/Filters/Filters.module.css';
import YearsInput from './YearsInput';
import ExclusiveSwitch from './ExclusiveSwitch';
import { Button, Menu } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import { useFilterStore } from '../../../stores/filter-store';
import { useMantineColorScheme } from '@mantine/core';
import { QueryFilterType } from '../../../types/QueryFilterType';
import { useState } from 'react';

interface FiltersProps {
  setFilters: (filters: QueryFilterType) => void;
  setPage: (page: number) => void;
}

export default function Filters({ setFilters, setPage }: FiltersProps) {
  const {
    selectedTeams,
    setSelectedTeams,
    yearRange,
    setYearRange,
    exclusive,
    setExclusive,
    selectedTournaments,
    setSelectedTournaments,
  } = useFilterStore();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [opened, setOpened] = useState(false);

  const handleApplyFilters = () => {
    setFilters({
      teams: selectedTeams,
      tournaments: selectedTournaments,
      yearRange: { startYear: yearRange.startYear, endYear: yearRange.endYear },
      exclusive: exclusive,
    });

    setPage(1);
    setOpened(false);
  };

  const handleClearFilters = () => {
    setSelectedTeams([]);
    setSelectedTournaments([]);
    setYearRange({ startYear: 1872, endYear: 2024 });
    setExclusive(false);
  };

  return (
    <Menu withArrow closeOnItemClick={false} opened={opened} onChange={setOpened}>
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
          <div className={classes.yearExclusiveContainer}>
            <YearsInput />
            <ExclusiveSwitch />
          </div>
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
