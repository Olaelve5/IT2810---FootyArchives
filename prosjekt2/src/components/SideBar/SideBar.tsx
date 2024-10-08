import Logo from '../Navbar/Logo';
import { Group, useMantineTheme, useMantineColorScheme, NavLink } from '@mantine/core';
import Competitions from './Competitions';
import classes from '../../styles/SideBar/SideBar.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SideBar() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [selected, setSelected] = useState('Home');
  const isDark = colorScheme === 'dark';

  const handleSelect = (label: string) => {
    setSelected(label);
  };

  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: isDark ? theme.colors.darkmode[1] : 'white',
        borderColor: isDark ? theme.colors.darkmode[3] : theme.colors.dark[1],
      }}
    >
      <Logo />
      <Group className={classes.topLinks}>
        <div className={classes.linkContainer}>
          <Link to={'/project2'}>
            <NavLink
              label="Home"
              color="primary"
              active={selected === 'Home'}
              variant="filled"
              onClick={() => handleSelect('Home')}
              noWrap
              className={selected === 'Home' ? classes.linkSelected : isDark ? classes.linkDark : classes.link}
            />
          </Link>
        </div>
        <div className={classes.linkContainer}>
          <Link to={'/project2/matchups'}>
            <NavLink
              label="Find Matchups"
              color="primary"
              active={selected === 'Find Matchups'}
              variant="filled"
              onClick={() => handleSelect('Find Matchups')}
              noWrap
              className={selected === 'Find Matchups' ? classes.linkSelected : isDark ? classes.linkDark : classes.link}
            />
          </Link>
        </div>
      </Group>
      <Competitions />
    </div>
  );
}
