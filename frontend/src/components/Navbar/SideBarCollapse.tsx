import { IconLayoutSidebarLeftCollapse } from '@tabler/icons-react';
import classes from '../../styles/Navbar/SideBarCollapse.module.css';
import { useMantineColorScheme } from '@mantine/core';

function SideBarCollapse() {
    const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
        <button className={classes.button}>
          <IconLayoutSidebarLeftCollapse size={35} stroke={1.5} className={isDark ? classes.darkIcon : classes.lightIcon}/>
        </button>
  );
}

export default SideBarCollapse;
