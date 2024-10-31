import { Button, Menu } from '@mantine/core';
import { IconChevronDown, IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import { useState } from 'react';
import classes from '../../styles/Navbar/Navbar.module.css';
import { useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { QuerySortType } from '../../types/QuerySortType';

const sortOptions = ['Most recent', 'Most goals', 'Least recent', 'Least goals'];

interface SortButtonProps {
  sort: QuerySortType;
  setSort: (sort: QuerySortType) => void;
}

export default function SortButton({ sort, setSort }: SortButtonProps) {
  const {order, field} = sort;
  const [opened, setOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = useMantineTheme();

  const handleSortClick = () => {
    setSort({
      field: field,
      order: order === 1 ? -1 : 1,
    });
  };

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
      <Button radius={'xl'} onClick={handleSortClick}>
        {order === 1 ? <IconSortAscending size={20} /> : <IconSortDescending size={20} />}
      </Button>
    </div>
  );
}
