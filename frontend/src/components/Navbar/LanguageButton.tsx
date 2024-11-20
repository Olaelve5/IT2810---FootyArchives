import { Button, Image } from '@mantine/core';
import classes from '../../styles/Navbar/Navbar.module.css';
import UKFlag from '../../assets/images/uk.png';
import NorwayFlag from '../../assets/images/no.png';
import { useLanguageStore } from '../../stores/language-store';
import { useMantineColorScheme } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { IconSwitchHorizontal } from '@tabler/icons-react';

export default function LanguageButton() {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = useMantineTheme();

  const handleClick = () => {
    if (language === 'en') {
      setLanguage('no');
    } else {
      setLanguage('en');
    }
  };

  const languageImage = language === 'en' ? UKFlag : NorwayFlag;

  return (
    <Button
      rightSection={
        <IconSwitchHorizontal
          size={20}
          className={classes.chevron}
          style={{
            transform: language === 'en' ? 'rotate(-180deg)' : 'rotate(0deg)',
          }}
        />
      }
      onClick={handleClick}
      leftSection={<Image src={languageImage} alt={'Language flag'} className={classes.countryImage} />}
      className={isDark ? classes.languageButtonDark : classes.languageButtonLight}
      color={isDark ? theme.colors.darkmode[2] : 'white'}
      c={isDark ? 'white' : theme.colors.darkmode[2]}
    >
      <h4>{language === 'en' ? 'EN' : 'NO'}</h4>
    </Button>
  );
}
