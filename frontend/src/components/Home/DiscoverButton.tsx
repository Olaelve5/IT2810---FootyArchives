import classes from '../../styles/Home/DiscoverButton.module.css';
import { Link } from 'react-router-dom';
import { useMantineColorScheme } from '@mantine/core';
import { useLanguageStore } from '../../stores/language-store';

export default function DiscoverButton() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const language = useLanguageStore((state) => state.language);

  return (
    <div className={classes.container}>
      <Link to={'/project2/matchups'}>
        <button className={classes.root} id={isDark ? classes.darkButton : classes.lightButton}>
          {language === 'en' ? 'Browse matchups' : 'Utforsk kamper'}
        </button>
      </Link>
    </div>
  );
}
