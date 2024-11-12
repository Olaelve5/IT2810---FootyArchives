import CountryFilter from './NationsFilter';
import TournamentFilter from './TournamentFilter';
import classes from '../../../styles/Filters/Filters.module.css';
import YearsInput from './YearsInput';
import ExclusiveSwitch from './ExclusiveSwitch';
import { Button, Modal } from '@mantine/core';
import { IconFilter, IconTrashFilled, IconFilterFilled } from '@tabler/icons-react';
import { useFilterStore } from '../../../stores/filter-store';
import { useMantineColorScheme } from '@mantine/core';
import { QueryFilterType } from '../../../types/QueryFilterType';
import { useLanguageStore } from '../../../stores/language-store';

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
  const { language } = useLanguageStore();

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
    <>
      <Button
        leftSection={<IconFilter size={20} />}
        radius="xl"
        color="transparent"
        className={isDark ? classes.filterButtonDark : classes.filterButtonLight}
        onClick={() => setOpened(true)}
      >
        {language === 'en' ? 'Filters' : 'Filtre'}
      </Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={language === 'en' ? 'Filters' : 'Filtre'}
        className={classes.modal}
        size="lg"
        classNames={{
          title: classes.title,
          header: classes.header,
          close: classes.close,
        }}
      >
        <div className={classes.container}>
          <CountryFilter />
          <TournamentFilter />
          <YearsInput />
          <ExclusiveSwitch />
          <div className={classes.buttonContainer}>
            <Button
              className={classes.resetButton}
              radius={'xl'}
              color="transparent"
              onClick={handleClearFilters}
              leftSection={<IconTrashFilled size={18} />}
            >
              <p>{language === 'en' ? 'Clear' : 'Tøm'}</p>
            </Button>
            <Button
              className={classes.applyButton}
              radius={'xl'}
              onClick={handleApplyFilters}
              leftSection={<IconFilterFilled size={18} color='white' />}
            >
              <p>{language === 'en' ? 'Apply' : 'Bruk'}</p>
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
