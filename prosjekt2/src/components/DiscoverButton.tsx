import classes from '../styles/Home/DiscoverButton.module.css';
import { Link } from 'react-router-dom';
import { useMantineColorScheme } from '@mantine/core';

export default function DiscoverButton() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <div className={classes.container}>
      <Link to={'/project2/discover'}>
        <button className={classes.root} id={isDark ? classes.darkButton : classes.lightButton}>
          Discover mathcups
        </button>
      </Link>
    </div>
  );
}
