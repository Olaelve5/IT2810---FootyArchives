import CountryFilter from './NationsFilter';
import TournamentFilter from './TournamentFilter';
import classes from '../../../styles/Filters/Filters.module.css';
import YearsInput from './YearsInput';
import { Button, Menu } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import { useMantineColorScheme } from '@mantine/core';
import { QueryFilterType } from '../../../types/QueryFilterType';
import { useState } from 'react';

interface FiltersProps {
  setFilters: (filters: QueryFilterType) => void;
  setPage: (page: number) => void;
}

export default function Filters({ setFilters, setPage }: FiltersProps) {
  const [yearRange, setYearRange] = useState<[number, number]>([1872, 2024]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedTournaments, setSelectedTournaments] = useState<string[]>([]);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [opened, setOpened] = useState(false);

  const handleApplyFilters = () => {
    setFilters({
      teams: selectedTeams,
      tournaments: selectedTournaments,
      yearRange: { startYear: yearRange[0], endYear: yearRange[1] },
    });
    setPage(1);
    setOpened(false);
  };

  const handleClearFilters = () => {
    setSelectedTeams([]);
    setSelectedTournaments([]);
    setYearRange([1872, 2024]);
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
          <TournamentFilter setSelectedTournaments={setSelectedTournaments} selectedTournaments={selectedTournaments} />
          <div>
            <YearsInput setYearRange={setYearRange} yearRange={yearRange}/>
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
