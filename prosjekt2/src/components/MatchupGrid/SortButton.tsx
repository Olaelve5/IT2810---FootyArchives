import { Button, Menu } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import classes from '../../styles/Navbar/Navbar.module.css';
import { useMantineColorScheme, useMantineTheme } from '@mantine/core';

const sortOptions = ['Most recent', 'Most goals', 'Least recent', 'Least goals'];

export default function SortButton() {
  const [opened, setOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = useMantineTheme();

  return (
    <div>
      <Menu opened={opened} onChange={setOpened} radius={10} shadow="lg">
        <Menu.Target>
          <Button
            className={isDark ? classes.languageButtonDark : classes.languageButtonLight}
            id={isDark ? classes.darkButton : classes.lightButton}
            color={isDark ? theme.colors.darkmode[2] : 'white'}
            c={isDark ? 'white' : theme.colors.darkmode[2]}
            value={selectedOption}
            rightSection={
              <IconChevronDown
                className={classes.chevron}
                size={20}
                style={{
                  transform: opened ? 'rotate(-180deg)' : 'rotate(0deg)',
                }}
              />
            }
            size="sm"
          >
            {selectedOption}
          </Button>
        </Menu.Target>
        <Menu.Dropdown className={classes.dropdown} id={isDark ? classes.dropdownDark : classes.dropdownLight}>
          {sortOptions.map((option) => (
            <Button
              key={option}
              size="sm"
              className={isDark ? classes.languageButtonDropdown : classes.languageButtonDropdownLight}
              color="transparent"
              onClick={() => {
                setSelectedOption(option);
                setOpened(false);
              }}
            >
              {option}
            </Button>
          ))}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
