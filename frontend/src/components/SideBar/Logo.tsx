import { Text } from '@mantine/core';
import { useSidebarCollapseStore } from '../../stores/sidebar-collapse-store';
import classes from '../../styles/SideBar/Sidebar.module.css';

function Logo() {
  const { isCollapsed } = useSidebarCollapseStore();

  return (
      <div className={isCollapsed ? classes.hiddenLogoTextContainer : classes.logoTextContainer}>
        <Text
          size="xl"
          fw={700}
          c="primary"
          id={classes.logoText}
        >
          Footy
        </Text>

        <Text
          size="xl"
          fw={700}
          id={classes.logoText}
        >
          Archives
        </Text>
      </div>
  );
}

export default Logo;
