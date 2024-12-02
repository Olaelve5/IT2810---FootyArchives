import CountryFilter from './NationsFilter';
import TournamentFilter from './TournamentFilter';
import classes from '../../../styles/Filters/Filters.module.css';
import YearsInput from './YearsInput';
import ExclusiveSwitch from './ExclusiveSwitch';
import { Button, Modal, Text } from '@mantine/core';
import { IconFilter, IconTrashFilled, IconFilterFilled } from '@tabler/icons-react';
import { useFilterStore } from '../../../stores/filter-store';
import { useMantineColorScheme, Indicator } from '@mantine/core';
import { QueryFilterType } from '../../../types/QueryFilterType';
import { useLanguageStore } from '../../../stores/language-store';
import { useState } from 'react';

interface FiltersProps {
  setFilters: (filters: QueryFilterType) => void;
}

export default function Filters({ setFilters }: FiltersProps) {
  const {
    selectedTeams,
    yearRange,
    exclusive,
    selectedTournaments,
    filterCount,
    setFilterCount,
    setLastQueriedFilters,
    resetFilters,
    setPage,
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

    setLastQueriedFilters({
      teams: selectedTeams,
      tournaments: selectedTournaments,
      yearRange: { startYear: yearRange.startYear, endYear: yearRange.endYear },
      exclusive: exclusive,
    });

    setPage(1);
    setOpened(false);
    calculateFilterCount();
  };

  const calculateFilterCount = () => {
    let count = 0;
    if (selectedTeams.length > 0) count++;
    if (selectedTournaments.length > 0) count++;
    if (yearRange.startYear !== 1872 || yearRange.endYear !== 2024) count++;
    if (exclusive) count++;
    setFilterCount(count);
  };

  return (
    <>
      <Indicator
        color="red"
        disabled={filterCount === 0}
        size={18}
        label={
          <Text size="xs" c={'white'}>
            {filterCount}
          </Text>
        }
        offset={5}
        c="white"
      >
        <Button
          leftSection={<IconFilter size={20} />}
          radius="xl"
          color="transparent"
          className={isDark ? classes.filterButtonDark : classes.filterButtonLight}
          onClick={() => setOpened(true)}
        >
          {language === 'en' ? 'Filters' : 'Filtre'}
        </Button>
      </Indicator>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={language === 'en' ? 'Filters' : 'Filtre'}
        className={classes.modal}
        closeButtonProps={{ 'aria-label': 'Close filters button' }} // Pass props directly
        size="lg"
        classNames={{
          root: classes.root,
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
              onClick={resetFilters}
              leftSection={<IconTrashFilled size={18} />}
            >
              <p>{language === 'en' ? 'Clear' : 'Tøm'}</p>
            </Button>
            <Button
              className={classes.applyButton}
              radius={'xl'}
              onClick={handleApplyFilters}
              leftSection={<IconFilterFilled size={18} color="white" />}
            >
              <p>{language === 'en' ? 'Apply' : 'Bruk'}</p>
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
