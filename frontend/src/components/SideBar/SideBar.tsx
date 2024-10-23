import Logo from './Logo';
import { Group, useMantineTheme, useMantineColorScheme, NavLink } from '@mantine/core';
import Competitions from './Tournaments';
import classes from '../../styles/SideBar/SideBar.module.css';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useLanguageStore } from '../../stores/language-store';
import { useSidebarCollapseStore } from '../../stores/sidebar-collapse-store';
import { IconHome, IconListSearch } from '@tabler/icons-react';

export default function SideBar() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const language = useLanguageStore((state) => state.language);
  const { isCollapsed } = useSidebarCollapseStore();

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
      setSelected('Browse matchups');
    } else if (path.startsWith('/project2/tournament')) {
      setSelected(tournamentName || '');
    } else {
      setSelected('');
    }
  }, [location.pathname, tournamentName]);

  return (
    <div
      className={classes.container}
      id={isCollapsed ? classes.containerCollapsed : classes.containerExpanded}
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
              leftSection={<IconHome stroke={1.5} size={25}/>}
              color="primary"
              active={selected === 'Home'}
              variant="filled"
              onClick={() => setSelected('Home')}
              noWrap
              className={selected === 'Home' ? classes.linkSelected : isDark ? classes.linkDark : classes.link}
              id={isCollapsed ? classes.linkCollapsed : ''}
            />
          </div>
          <div className={classes.linkContainer}>
            <NavLink
              component={Link}
              to="/project2/matchups"
              label={language === 'en' ? 'Browse matchups' : 'Uforsk kamper'}
              leftSection={<IconListSearch stroke={1.5} size={25}/>}
              color="primary"
              active={selected === 'Browse matchups'}
              variant="filled"
              onClick={() => setSelected('Browse matchups')}
              noWrap
              className={selected === 'Browse matchups' ? classes.linkSelected : isDark ? classes.linkDark : classes.link}
              id={isCollapsed ? classes.linkCollapsed : ''}
            />
          </div>
        </Group>
        <Competitions selected={selected} setSelected={setSelected} />
      </div>
    </div>
  );
}
