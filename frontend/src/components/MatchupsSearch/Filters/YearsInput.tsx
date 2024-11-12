import { NumberInput } from '@mantine/core';
import classes from '../../../styles/Filters/YearFilter.module.css';
import { useMantineColorScheme, Text } from '@mantine/core';
import { useState, useEffect, useCallback } from 'react';
import { IconSelector } from '@tabler/icons-react';
import { useFilterStore } from '../../../stores/filter-store';
import { useLanguageStore } from '../../../stores/language-store';

export default function YearsInput() {
  const { yearRange, setYearRange, lastQueriedFilters } = useFilterStore();
  const { colorScheme } = useMantineColorScheme();
  const { language } = useLanguageStore();
  const isDark = colorScheme === 'dark';
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [draggingInput, setDraggingInput] = useState<'start' | 'end' | null>(null);
  const dragScale = 0.6;

  // Handle the mouse down event to start dragging the year range
  const handleMouseDown = (event: React.MouseEvent, input: 'start' | 'end') => {
    setIsDragging(true);
    setStartY(event.clientY);
    setDraggingInput(input);
    document.body.style.userSelect = 'none'; // Prevent text selection
    document.body.classList.add('cursor-ns-resize');
  };

  // Handle the mouse move event to update the year range
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDragging && draggingInput) {
        const deltaY = startY - event.clientY;
        let newStartValue = yearRange.startYear;
        let newEndValue = yearRange.endYear;

        if (draggingInput === 'start') {
          newStartValue = Math.max(1872, Math.min(2024, yearRange.startYear + deltaY * dragScale));
          if (newStartValue > newEndValue) {
            newEndValue = newStartValue;
          }
        } else if (draggingInput === 'end') {
          newEndValue = Math.max(1872, Math.min(2024, yearRange.endYear + deltaY * dragScale));
          if (newEndValue < newStartValue) {
            newStartValue = newEndValue;
          }
        }

        setYearRange({ startYear: Math.round(newStartValue), endYear: Math.round(newEndValue) });
        setStartY(event.clientY);
      }
    },
    [draggingInput, isDragging, setYearRange, startY, yearRange],
  );

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingInput(null);
    document.body.style.userSelect = ''; // Re-enable text selection
    document.body.classList.remove('cursor-ns-resize');
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, isDragging]);

  // Set filter to match the applied query
  useEffect(() => {
    if (lastQueriedFilters && lastQueriedFilters.yearRange) {
      setYearRange(lastQueriedFilters.yearRange);
    }
  }, [lastQueriedFilters, setYearRange]);

  return (
    <div className={classes.container}>
      <label>{language == 'en' ? 'Select years' : 'Velg årstall'}</label>
      <div className={classes.numbersContainer}>
        <NumberInput
          value={yearRange.startYear}
          onFocus={handleFocus}
          radius="xl"
          min={1872}
          max={2024}
          allowDecimal={false}
          hideControls
          rightSection={
            <div className={classes.dragHandle} onMouseDown={(event) => handleMouseDown(event, 'start')}>
              <IconSelector size={20} className={classes.upDownIcon} />
            </div>
          }
          classNames={{
            input: isDark ? classes.numberInputDark : classes.numberInputLight,
            root: classes.numberRoot,
          }}
        />
        <Text fw={600}>-</Text>
        <NumberInput
          hideControls
          onFocus={handleFocus}
          radius="xl"
          value={yearRange.endYear}
          min={1872}
          max={2024}
          allowDecimal={false}
          rightSection={
            <div className={classes.dragHandle} onMouseDown={(event) => handleMouseDown(event, 'end')}>
              <IconSelector size={20} className={classes.upDownIcon} />
            </div>
          }
          classNames={{
            input: isDark ? classes.numberInputDark : classes.numberInputLight,
            root: classes.numberRoot,
          }}
        />
      </div>
    </div>
  );
}
