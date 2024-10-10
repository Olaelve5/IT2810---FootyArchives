import classes from '../styles/Home/BigLogo.module.css';
import { useMantineColorScheme } from '@mantine/core';

export default function BigLogo() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <div className={classes.container}>
      <div className={classes.logoContainer}>
        <h1 className={classes.header} id={isDark ? classes.headerGreenDark : classes.headerGreenLight}>Footy</h1>
        <h1 className={classes.header}>Archives</h1>
      </div>
      <p className={classes.subHeader}>Discover and explore international matches from 1872 to 2024. </p>
    </div>
  );
}
