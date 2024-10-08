import { useMantineColorScheme, Button, useMantineTheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export default function ColorSchemeBtn() {
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const isDark = colorScheme === 'dark';
  const theme = useMantineTheme();

  return (
    <Button
      color={isDark ? theme.colors.darkmode[2] : 'white'}
      onClick={() => setColorScheme(isDark ? 'light' : 'dark')}
      style={{ height: '35px', width: '35px', padding: '0', border: '1px solid', boxShadow: '0 0 10px -5px rgba(0, 0, 0, 0.5)' }}
    >
      {isDark ? <IconSun size={20} color='white'/> : <IconMoon size={20} color={theme.colors.dark[4]}/>}
    </Button>
  );
}
