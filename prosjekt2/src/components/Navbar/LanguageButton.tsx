import { Button, Image } from '@mantine/core';
import classes from '../../styles/Navbar/Navbar.module.css';
import UKFlag from '../../assets/images/uk.jpg';
import NorwayFlag from '../../assets/images/no.jpg';
import { Menu } from '@mantine/core';
import { useState } from 'react';
import { useLanguageStore } from '../../stores/language-store';
import { Language } from '../../types/language';

export default function LanguageButton() {
  const [opened, setOpened] = useState(false);
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

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
    <Menu opened={opened} onChange={setOpened}>
      <Menu.Target>
        <Button className={classes.languageButton}>
          <Image src={languageImage} alt={'UK flag'} className={classes.countryImage} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown className={classes.dropdown}>
        <Button className={classes.languageButton} onClick={() => handleSelect('en')}>
          <Image src={UKFlag} alt={'UK flag'} className={classes.countryImage} />
        </Button>
        <Button className={classes.languageButton} onClick={() => handleSelect('no')}>
          <Image src={NorwayFlag} alt={'UK flag'} className={classes.countryImage} />
        </Button>
      </Menu.Dropdown>
    </Menu>
  );
}
