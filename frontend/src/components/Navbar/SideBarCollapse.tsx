import { IconMenu3 } from '@tabler/icons-react';
import classes from '../../styles/Navbar/SideBarCollapse.module.css';
import { useMantineColorScheme } from '@mantine/core';
import { useSidebarCollapseStore } from '../../stores/sidebar-collapse-store';

function SideBarCollapse() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const { isCollapsed, setCollapsed } = useSidebarCollapseStore();

  const handleClick = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <button className={classes.button} onClick={handleClick}>
      <IconMenu3 size={38} stroke={1.5} className={isDark ? classes.darkIcon : classes.lightIcon} />
    </button>
  );
}

export default SideBarCollapse;
