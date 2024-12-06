import { Text } from '@mantine/core';
import { useSidebarCollapseStore } from '../../stores/sidebar-collapse-store';
import classes from '../../styles/SideBar/Sidebar.module.css';
import { useNavigate } from 'react-router-dom';

function Logo() {
  const { isCollapsed } = useSidebarCollapseStore();
  const navigate = useNavigate();

  return (
      <div className={isCollapsed ? classes.hiddenLogoTextContainer : classes.logoTextContainer}>
        <Text
          size="xl"
          fw={700}
          c="primary"
          id={classes.logoText}
          aria-label="Footy Archives logo"
        >
          Footy
        </Text>
    <div
      className={isCollapsed ? classes.hiddenLogoTextContainer : classes.logoTextContainer}
      onClick={() => {
        navigate('/project2');
      }}
    >
      <Text size="xl" fw={700} c="primary" id={classes.logoText}>
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
      </div>
  );
}

export default Logo;
