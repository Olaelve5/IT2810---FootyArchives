import { RangeSlider, Text } from "@mantine/core";
import classes from "../../../styles/Filters/YearFilter.module.css";
import { useState } from "react";
import { useMantineColorScheme } from "@mantine/core";
import { useLanguageStore } from "../../../stores/language-store";

const marks = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
];

export default function GoalFilter() {
    const [value, setValue] = useState<[number, number]>([0, 40]);
    // const [endValue, setEndValue] = useState<[number, number]>([0, 40]);
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';
    const language = useLanguageStore((state) => state.language);

  return (
    <div className={classes.container}>
      <Text size="sm" className={classes.label}>
        {language === 'en' ? 'Total goals' : 'Totalt antall mål'}
      </Text>
      <RangeSlider
        value={value}
        onChange={setValue}
        min={0}
        max={40}
        minRange={0}
        defaultValue={[0, 40]}
        color="primary"
        marks={marks}
        size="lg"
        classNames={{
          root: classes.rangeSlider,
          mark: classes.mark,
          markLabel: isDark ? classes.markLabelDark : classes.markLabelLight,
          track: classes.track,
          thumb: classes.thumb,
          bar: classes.bar,
        }}
      />
    </div>
  );
}
