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
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

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
    <Menu opened={opened} onChange={setOpened} radius={10}>
      <Menu.Target>
        <Button
          rightSection={opened ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
          leftSection={<Image src={languageImage} alt={'UK flag'} className={classes.countryImage} />}
          className={classes.languageButton}
          color={isDark ? theme.colors.darkmode[2] : 'white'}
        >
          <h4>{language === 'en' ? 'EN' : 'NO'}</h4>
        </Button>
      </Menu.Target>

      <Menu.Dropdown className={classes.dropdown}>
        <Button
          leftSection={<Image src={UKFlag} alt={'UK flag'} className={classes.countryImage} />}
          className={classes.languageButtonDropdown}
          onClick={() => handleSelect('en')}
          color={isDark ? theme.colors.darkmode[2] : 'white'}
        >
          EN
        </Button>
        <Button
          leftSection={<Image src={NorwayFlag} alt={'UK flag'} className={classes.countryImage} />}
          onClick={() => handleSelect('no')}
          color={isDark ? theme.colors.darkmode[2] : 'white'}
          className={classes.languageButtonDropdown}
        >
          NO
        </Button>
      </Menu.Dropdown>
    </Menu>
  );
}
