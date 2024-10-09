import { useMantineColorScheme, Button, useMantineTheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import classes from '../../styles/Navbar/ColorSchemeBtn.module.css';

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
      className={isDark ? classes.buttonDark : classes.buttonLight}
    >
      {isDark ? <IconSun size={20} color='white'/> : <IconMoon size={20} color={theme.colors.dark[4]}/>}
    </Button>
  );
}
