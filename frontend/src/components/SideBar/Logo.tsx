import { Text } from '@mantine/core';
import { useSidebarCollapseStore } from '../../stores/sidebar-collapse-store';
import classes from '../../styles/SideBar/Sidebar.module.css';

function Logo() {
  const { isCollapsed } = useSidebarCollapseStore();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
        marginBottom: '1rem',
      }}
    >
      <Text
        size="xl"
        fw={700}
        c="primary"
        id={classes.logoText}
        className={!isCollapsed ? classes.visibleLogoTextF : classes.hiddenLogoTextF}
      >
        Footy
      </Text>

      <Text
        size="xl"
        fw={700}
        id={classes.logoText}
        className={!isCollapsed ? classes.visibleLogoTextA : classes.hiddenLogoTextA}
      >
        Archives
      </Text>
    </div>
  );
}

export default Logo;
