import { IconMenu3 } from '@tabler/icons-react';
import classes from '../../styles/Navbar/SideBarCollapse.module.css';
import { useMantineColorScheme } from '@mantine/core';
import { useSidebarCollapseStore } from '../../stores/sidebar-collapse-store';
import { useLanguageStore } from '../../stores/language-store';

function SideBarCollapse() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const { isCollapsed, setCollapsed } = useSidebarCollapseStore();
  const { language } = useLanguageStore();

  const handleClick = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <button
      className={classes.button}
      onClick={handleClick}
      aria-label={language === 'en' ? 'Toggle sidebar' : 'Veksle sidefelt'}
    >
      <IconMenu3 size={38} stroke={1.5} className={isDark ? classes.darkIcon : classes.lightIcon} />
    </button>
  );
}

export default SideBarCollapse;
