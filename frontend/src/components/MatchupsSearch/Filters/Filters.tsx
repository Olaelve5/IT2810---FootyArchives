import CountryFilter from './CountryFilter';
import TournamentFilter from './TournamentFilter';
import classes from '../../../styles/Filters/Filters.module.css';
// import YearsInput from './YearsInput';
import { Button, Menu } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import { useMantineColorScheme } from '@mantine/core';

export default function Filters() {
  // const [rangeValue, setRangeValue] = useState<[number, number]>([1872, 2024]);
  // const [endValue, setEndValue] = useState<[number, number]>([1872, 2024]);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Menu withArrow closeOnItemClick={false}>
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
          <CountryFilter />
          <TournamentFilter />
          <div className={classes.buttonContainer}>
            <Button className={classes.resetApplyButton} radius={'xl'} color='transparent'>Clear</Button>
            <Button className={classes.resetApplyButton} radius={'xl'}>Apply</Button>
          </div>
        </div>
      </Menu.Dropdown>
    </Menu>
  );
}
