import { NumberInput } from '@mantine/core';
import classes from '../../../styles/Filters/YearFilter.module.css';
import { useMantineColorScheme, Text } from '@mantine/core';
import { useState, useEffect, useCallback } from 'react';
import { IconSelector } from '@tabler/icons-react';

interface YearFilterProps {
  setYearRange: (value: [number, number]) => void;
  yearRange: [number, number];
}

export default function YearsInput({ setYearRange, yearRange}: YearFilterProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [draggingInput, setDraggingInput] = useState<'start' | 'end' | null>(null);

  const handleMouseDown = (event: React.MouseEvent, input: 'start' | 'end') => {
    setIsDragging(true);
    setStartY(event.clientY);
    setDraggingInput(input);
    document.body.style.userSelect = 'none'; // Prevent text selection
  };

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (isDragging && draggingInput) {
      const deltaY = startY - event.clientY;
      let newStartValue = yearRange[0];
      let newEndValue = yearRange[1];

      if (draggingInput === 'start') {
        newStartValue = Math.max(1872, Math.min(2024, yearRange[0] + deltaY));
        if (newStartValue > newEndValue) {
          newEndValue = newStartValue;
        }
      } else if (draggingInput === 'end') {
        newEndValue = Math.max(1872, Math.min(2024, yearRange[1] + deltaY));
        if (newEndValue < newStartValue) {
          newStartValue = newEndValue;
        }
      }

      setYearRange([newStartValue, newEndValue]);
    }
  }, [draggingInput, isDragging, setYearRange, startY, yearRange]);

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingInput(null);
    document.body.style.userSelect = ''; // Re-enable text selection
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

  return (
    <div className={classes.container}>
      <label>Year</label>
      <div className={classes.numbersContainer}>
        <NumberInput
          value={yearRange[0]}
          radius='xl'
          min={1872}
          max={2024}
          allowDecimal={false}
          hideControls
          rightSection={
            <div className={classes.dragHandle} onMouseDown={(event) => handleMouseDown(event, 'start')}>
              <IconSelector size={20} className={classes.upDownIcon}/>
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
          radius='xl'
          value={yearRange[1]}
          min={1872}
          max={2024}
          allowDecimal={false}
          rightSection={
            <div className={classes.dragHandle} onMouseDown={(event) => handleMouseDown(event, 'end')}>
              <IconSelector size={20} className={classes.upDownIcon}/>
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