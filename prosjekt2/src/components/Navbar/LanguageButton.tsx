import { Button, Image } from '@mantine/core';
import classes from '../../styles/Navbar/Navbar.module.css';
import UKFlag from '../../assets/images/uk.png';
import NorwayFlag from '../../assets/images/no.png';
import { Menu } from '@mantine/core';
import { useState } from 'react';
import { useLanguageStore } from '../../stores/language-store';
import { Language } from '../../types/language';
import { useMantineColorScheme } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

export default function LanguageButton() {
  const [opened, setOpened] = useState(false);
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = useMantineTheme();

  const handleSelect = (value: Language) => {
    if (value === language) {
      setOpened(false);
      return;
    }
    setLanguage(value);
    setOpened(false);
  };

  const languageImage = language === 'en' ? UKFlag : NorwayFlag;

  return (
    <Menu opened={opened} onChange={setOpened} radius={10} shadow='lg'>
      <Menu.Target>
        <Button
          rightSection={
            <IconChevronDown
              size={20}
              className={classes.chevron}
              style={{
                transform: opened ? 'rotate(-180deg)' : 'rotate(0deg)',
              }}
            />
          }
          leftSection={<Image src={languageImage} alt={'UK flag'} className={classes.countryImage} />}
          className={isDark ? classes.languageButtonDark : classes.languageButtonLight}
          id={isDark ? classes.darkButton : classes.lightButton}
          color={isDark ? theme.colors.darkmode[2] : 'white'}
          c={isDark ? 'white' : theme.colors.darkmode[2]}
        >
          <h4>{language === 'en' ? 'EN' : 'NO'}</h4>
        </Button>
      </Menu.Target>

      <Menu.Dropdown className={classes.dropdown} id={isDark ? classes.dropdownDark : classes.dropdownLight}>
        <Button
          leftSection={<Image src={UKFlag} alt={'UK flag'} className={classes.countryImage} />}
          className={isDark ? classes.languageButtonDropdown : classes.languageButtonDropdownLight}
          onClick={() => handleSelect('en')}
          color={isDark ? theme.colors.darkmode[2] : 'white'}
          c={isDark ? 'white' : theme.colors.darkmode[2]}
        >
          EN
        </Button>
        <Button
          leftSection={<Image src={NorwayFlag} alt={'UK flag'} className={classes.countryImage} />}
          onClick={() => handleSelect('no')}
          color={isDark ? theme.colors.darkmode[2] : 'white'}
          className={isDark ? classes.languageButtonDropdown : classes.languageButtonDropdownLight}
          c={isDark ? 'white' : theme.colors.darkmode[2]}
        >
          NO
        </Button>
      </Menu.Dropdown>
    </Menu>
  );
}
