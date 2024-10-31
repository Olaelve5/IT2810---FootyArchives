import { NumberInput } from '@mantine/core';
import classes from '../../../styles/Filters/YearFilter.module.css';
import { useMantineColorScheme } from '@mantine/core';

interface YearFilterProps {
  rangeValue: [number, number];
  setRangeValue: (value: [number, number]) => void;
  setEndValue: (value: [number, number]) => void;
}

export default function YearsInput({ rangeValue, setRangeValue, setEndValue }: YearFilterProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <div className={classes.numbersContainer}>
      <NumberInput
        value={rangeValue[0]}
        radius={10}
        onChange={(value) => {
          if (typeof value === 'number') {
            setRangeValue([value, rangeValue[1]]);
            setEndValue([value, rangeValue[1]]);
          }
        }}
        min={1872}
        max={2024}
        allowDecimal={false}
        hideControls
        classNames={{
          input: isDark ? classes.numberInputDark : classes.numberInputLight,
          root: classes.numberRoot,
        }}
      />
      <p>-</p>
      <NumberInput
        hideControls
        radius={10}
        value={rangeValue[1]}
        onChange={(value) => {
          if (typeof value === 'number') {
            setRangeValue([rangeValue[0], value]);
            setEndValue([rangeValue[0], value]);
          }
        }}
        min={1872}
        max={2024}
        allowDecimal={false}
        classNames={{
          input: isDark ? classes.numberInputDark : classes.numberInputLight,
          root: classes.numberRoot,
        }}
      />
    </div>
  );
}
