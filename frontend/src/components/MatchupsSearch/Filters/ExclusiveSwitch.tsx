import { Tooltip, Switch, useMantineTheme } from '@mantine/core';
import { useLanguageStore } from '../../../stores/language-store';
import classes from '../../../styles/Filters/ExclusiveSwitch.module.css';

interface ExclusiveSwitchProps {
  exclusive: boolean;
  setExclusive: (value: boolean) => void;
  selectedTeams: string[];
}

export default function ExclusiveSwitch({ exclusive, setExclusive, selectedTeams }: ExclusiveSwitchProps) {
  const { language } = useLanguageStore();
  const theme = useMantineTheme();
  const isDisabled = selectedTeams.length < 2;

  return (
    <div className={classes.switchContainer}>
      <Switch
        onChange={(event) => setExclusive(event.currentTarget.checked)}
        disabled={selectedTeams.length < 2}
        color={theme.colors.primary[6]}
        size="md"
        checked={exclusive}
        classNames={{
          track: !isDisabled ? (exclusive ? classes.trackSelected : classes.track) : classes.trackDisabled,
          root: !isDisabled ? classes.root : classes.rootDisabled,
          thumb: !isDisabled ? classes.thumb : classes.thumbDisabled,
          body: classes.body,
        }}
      />
      <Tooltip
        label={
          language === 'en'
            ? 'Display only head-to-head games among selected teams'
            : 'Vis kun innbyrdes kamper mellom valgte lag'
        }
      >
        <span className={!isDisabled ? classes.label : classes.labelDisabled}>
          {language === 'en' ? 'Exclusive' : 'Eksklusiv'}
        </span>
      </Tooltip>
    </div>
  );
}
