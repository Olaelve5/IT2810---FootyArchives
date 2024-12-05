import Logo from './Logo';
import { Group, useMantineTheme, useMantineColorScheme } from '@mantine/core';
import Competitions from './Tournaments';
import classes from '../../styles/SideBar/Sidebar.module.css';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useLanguageStore } from '../../stores/language-store';
import { useSidebarCollapseStore } from '../../stores/sidebar-collapse-store';
import { IconHome, IconListSearch, IconSettings } from '@tabler/icons-react';
import ColorSchemeBtn from '../Navbar/ColorSchemeBtn';
import LanguageBtn from '../Navbar/LanguageButton';
import SideBarCollapse from '../Navbar/SideBarCollapse';
import NavLinkItem from './NavLinkItem';

export default function SideBar() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const language = useLanguageStore((state) => state.language);
  const { isCollapsed, setCollapsed } = useSidebarCollapseStore();
  const location = useLocation();
  const { tournamentName } = useParams<{ tournamentName: string }>(); // Get the tournament name from the URL
  const [selected, setSelected] = useState('');
  const isDark = colorScheme === 'dark';
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update the window width state on resize
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  // Set the sidebar collapse state based on the window width on mount
  useEffect(() => {
    if (windowWidth < 900) {
      setCollapsed(true);
    }
  }, [windowWidth, setCollapsed]);

  // Set the selected link based on the current URL
  useEffect(() => {
    const path = location.pathname;

    if (path === '/project2') {
      setSelected(language === 'en' ? 'Home' : 'Hjem');
    } else if (path.startsWith('/project2/matchups')) {
      setSelected(language === 'en' ? 'Browse Matchups' : 'Uforsk kamper');
    } else if (path.startsWith('/project2/tournament')) {
      setSelected(tournamentName || '');
    } else {
      setSelected('');
    }
  }, [language, location.pathname, tournamentName]);

  return (
    <div
      className={classes.container}
      id={isCollapsed ? classes.containerCollapsed : classes.containerExpanded}
      style={{
        backgroundColor: isDark ? theme.colors.darkmode[1] : 'white',
      }}
    >
      <div>
        <div className={classes.logoContainer}>
          <SideBarCollapse />
          <div className={isCollapsed ? classes.outerLogoContainer : ''}>
            <Logo />
          </div>
        </div>
        <Group className={classes.links}>
          <div className={classes.linkContainer}>
            <NavLinkItem
              to="/project2"
              label={language === 'en' ? 'Home' : 'Hjem'}
              icon={<IconHome stroke={1.5} size={25} />}
              selected={selected}
              setSelected={setSelected}
              isDark={isDark}
            />
          </div>
          <div className={classes.linkContainer}>
            <NavLinkItem
              to="/project2/matchups"
              label={language === 'en' ? 'Browse Matchups' : 'Uforsk kamper'}
              icon={<IconListSearch stroke={1.5} size={25} />}
              selected={selected}
              setSelected={setSelected}
              isDark={isDark}
            />
          </div>
        </Group>
        <Competitions selected={selected} setSelected={setSelected} />
        <div className={classes.bottomContainer}>
          <IconSettings
            stroke={1.5}
            size={30}
            className={isCollapsed ? classes.iconSettingsVisible : classes.iconSettingsHidden}
            onClick={() => setCollapsed(!isCollapsed)}
          />

          <div className={isCollapsed ? classes.innerBottomContainerHidden : classes.innerBottomContainerVisible}>
            <ColorSchemeBtn />
            <LanguageBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
