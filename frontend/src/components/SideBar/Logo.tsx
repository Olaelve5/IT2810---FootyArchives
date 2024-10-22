import { Text } from '@mantine/core';
import { useSidebarCollapseStore } from '../../stores/sidebar-collapse-store';

function Logo() {
  const { isCollapsed } = useSidebarCollapseStore();

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 2rem', marginBottom: '1rem', justifyContent: isCollapsed ? 'center' : '' }}>
      {isCollapsed ? (
        <Text size="xl" fw={700} c="primary">
          F
        </Text>
      ) : (
        <Text size="xl" fw={700} c="primary">
          Footy
        </Text>
      )}

      {isCollapsed ? (
        <Text size="xl" fw={700}>
          A
        </Text>
      ) : (
        <Text size="xl" fw={700}>
          Archives
        </Text>
      )}
    </div>
  );
}

export default Logo;
