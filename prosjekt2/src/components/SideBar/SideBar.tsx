import Logo from './Logo';
import { Group, useMantineTheme, useMantineColorScheme, NavLink } from '@mantine/core';
import Competitions from './Tournaments';
import classes from '../../styles/SideBar/SideBar.module.css';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useLanguageStore } from '../../stores/language-store';

export default function SideBar() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const language = useLanguageStore((state) => state.language);

  const location = useLocation();
  const { tournamentName } = useParams<{ tournamentName: string }>(); // Get the tournament name from the URL
  const [selected, setSelected] = useState('');

  const isDark = colorScheme === 'dark';

  // Set the selected link based on the current URL
  useEffect(() => {
    const path = location.pathname;

    if (path === '/project2') {
      setSelected('Home');
    } else if (path.startsWith('/project2/discover')) {
      setSelected('Discover');
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
      <div>
        <Logo />
        <Group className={classes.links}>
          <div className={classes.linkContainer}>
            <NavLink
              component={Link}
              to="/project2"
              label={language === 'en' ? 'Home' : 'Hjem'}
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
              to="/project2/discover"
              label={language === 'en' ? 'Discover' : 'Oppdag'}
              color="primary"
              active={selected === 'Discover'}
              variant="filled"
              onClick={() => setSelected('Discover')}
              noWrap
              className={selected === 'Discover' ? classes.linkSelected : isDark ? classes.linkDark : classes.link}
            />
          </div>
        </Group>
        <Competitions selected={selected} setSelected={setSelected} />
      </div>
    </div>
  );
}
