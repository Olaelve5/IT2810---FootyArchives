import Logo from '../Navbar/Logo';
import { Group, useMantineTheme, useMantineColorScheme, NavLink } from '@mantine/core';
import Competitions from './Tournaments';
import classes from '../../styles/SideBar/SideBar.module.css';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

export default function SideBar() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const location = useLocation();
  const { tournamentName } = useParams<{ tournamentName: string }>(); // Get the tournament name from the URL
  const [selected, setSelected] = useState('');
  
  const isDark = colorScheme === 'dark';

  // Set the selected link based on the current URL
  useEffect(() => {
    const path = location.pathname;

    if (path === '/project2') {
      setSelected('Home');
    } else if (path.startsWith('/project2/matchups')) {
      setSelected('Find Matchups');
    } else if (path.startsWith('/project2/tournament')) {
      setSelected(tournamentName || '');
    } else {
      setSelected('');
    }
  }, [location.pathname, tournamentName]);

  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: isDark ? theme.colors.darkmode[1] : 'white',
      }}
    >
      <Logo />
      <Group className={classes.links}>
        <div className={classes.linkContainer}>
          <NavLink
            component={Link}
            to="/project2"
            label="Home"
            color="primary"
            active={selected === 'Home'}
            variant="filled"
            onClick={() => setSelected('Home')}
            noWrap
            className={selected === 'Home' ? classes.linkSelected : isDark ? classes.linkDark : classes.link}
          />
        </div>
        <div className={classes.linkContainer}>
          <NavLink
            component={Link}
            to="/project2/matchups"
            label="Find Matchups"
            color="primary"
            active={selected === 'Find Matchups'}
            variant="filled"
            onClick={() => setSelected('Find Matchups')}
            noWrap
            className={selected === 'Find Matchups' ? classes.linkSelected : isDark ? classes.linkDark : classes.link}
          />
        </div>
      </Group>
      <Competitions selected={selected} setSelected={setSelected} />
    </div>
  );
}
