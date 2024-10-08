import { Input } from '@mantine/core';
import {IconSearch} from '@tabler/icons-react';
import classes from '../../styles/Searchbar.module.css';
import { useMantineTheme, useMantineColorScheme } from '@mantine/core';

export default function Searchbar() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Input
      leftSection={<IconSearch size={18} className={classes.icon}/>}
      placeholder="Search"
      variant="filled"
      size='sm'
      radius="xl"
      classNames={classes}
      styles={{
        input: {
            backgroundColor: colorScheme === 'dark' ? theme.colors.darkmode[2] : 'white',
        },
    }}
    />
  );
}


 