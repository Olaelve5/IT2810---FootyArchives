import { Switch, useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { useLanguageStore } from '../../../stores/language-store';
import classes from '../../../styles/Filters/ExclusiveSwitch.module.css';
import { useFilterStore } from '../../../stores/filter-store';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useEffect } from 'react';

export default function ExclusiveSwitch() {
  const { selectedTeams, exclusive, setExclusive, lastQueriedFilters } = useFilterStore();
  const { language } = useLanguageStore();
  const theme = useMantineTheme();
  const isDisabled = selectedTeams.length < 2;
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    if (isDisabled) {
      setExclusive(false);
    }
  }, [isDisabled, selectedTeams, setExclusive]);

  // Set the selected teams to match the applied query
  useEffect(() => {
    if (lastQueriedFilters && lastQueriedFilters.exclusive) {
      setExclusive(lastQueriedFilters.exclusive);
    }
  }, [lastQueriedFilters, setExclusive]);

  return (
    <div className={classes.switchContainer}>
      <Switch
        onChange={(event) => setExclusive(event.currentTarget.checked)}
        disabled={selectedTeams.length < 2}
        color={theme.colors.primary[6]}
        size="md"
        onLabel={<IconCheck size={16} color="white" />}
        offLabel={<IconX size={16} color={theme.colors.gray[5]} />}
        label={language === 'en' ? 'Exclusive' : 'Eksklusiv'}
        description={
          language === 'en'
            ? 'Display only head-to-head games among selected teams'
            : 'Vis kun innbyrdes kamper mellom valgte lag'
        }
        checked={exclusive}
        classNames={{
          track: !isDisabled
            ? exclusive
              ? isDark
                ? classes.trackSelectedDark
                : classes.trackSelectedLight
              : classes.track
            : classes.trackDisabled,
          root: !isDisabled ? classes.root : classes.rootDisabled,
          thumb: !isDisabled ? classes.thumb : classes.thumbDisabled,
          description: classes.description,
          label: !isDisabled ? classes.label : classes.labelDisabled,
        }}
      />
    </div>
  );
}
