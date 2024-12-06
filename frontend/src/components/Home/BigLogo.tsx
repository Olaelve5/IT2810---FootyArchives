import classes from '../../styles/Home/BigLogo.module.css';
import { useMantineColorScheme } from '@mantine/core';
import { useLanguageStore } from '../../stores/language-store';

export default function BigLogo() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const language = useLanguageStore((state) => state.language);

  const subHeaderText = () => {
    if (language === 'en') {
      return 'Discover and explore international matches from 1872 to 2024';
    } else {
      return 'Oppdag og utforsk internasjonale kamper fra 1872 til 2024';
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.logoContainer}>
        <h1 className={classes.header} id={isDark ? classes.headerGreenDark : classes.headerGreenLight}>
          Footy
        </h1>
        <h1 className={classes.header}>Archives</h1>
      </div>
      <p className={classes.subHeader}>{subHeaderText()} </p>
    </div>
  );
}
