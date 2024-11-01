import { RangeSlider, Text } from '@mantine/core';
import classes from '../../../styles/Filters/YearFilter.module.css';
import { useMantineColorScheme } from '@mantine/core';
import { useLanguageStore } from '../../../stores/language-store';
import { IconGripVertical } from '@tabler/icons-react';

const marks = [
  { value: 1900, label: '1900' },
  { value: 1950, label: '1950' },
  { value: 2000, label: '2000' },
];

interface YearFilterProps {
  rangeValue: [number, number];
  setRangeValue: (value: [number, number]) => void;
  endValue: [number, number];
  setEndValue: (value: [number, number]) => void;
}

export default function YearFilter({ rangeValue, setRangeValue, setEndValue }: YearFilterProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const language = useLanguageStore((state) => state.language);

  return (
    <div className={classes.container}>
      <Text size="sm" className={classes.label}>
        {language === 'en' ? 'Year' : 'Årstall'}
      </Text>
      <RangeSlider
        thumbChildren={<IconGripVertical className={classes.gripIcon} />}
        value={rangeValue}
        onChange={setRangeValue}
        showLabelOnHover={false}
        onChangeEnd={setEndValue}
        radius="md"
        min={1872}
        max={2024}
        label={null}
        minRange={0}
        defaultValue={[1872, 2024]}
        marks={marks}
        classNames={{
          root: classes.rangeSlider,
          mark: classes.mark,
          markLabel: isDark ? classes.markLabelDark : classes.markLabelLight,
          trackContainer: classes.trackContainer,
          track: classes.track,
          thumb: classes.thumb,
          bar: classes.bar,
          label: classes.label,
        }}
      />
    </div>
  );
}
