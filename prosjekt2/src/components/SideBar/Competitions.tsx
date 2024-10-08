import classes from '../../styles/SideBar/SideBar.module.css';
import { Group, NavLink, Text, useMantineColorScheme } from '@mantine/core';
import { Link } from 'react-router-dom';

const data = [
  {
    name: 'FIFA World Cup',
    link: 'FIFA-World-Cup',
  },
  {
    name: 'Euros',
    link: 'Euros',
  },
  {
    name: 'Copa America',
    link: 'Copa-America',
  },
  {
    name: 'Asian Cup',
    link: 'Asian-Cup',
  },
  {
    name: 'African Cup',
    link: 'African-Cup',
  },
];

interface CompetitionsProps {
  selected: string;
  setSelected: (label: string) => void;
}

export default function Competitions({ selected, setSelected }: CompetitionsProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const links = data.map((item) => {
    return (
      <div className={classes.linkContainer}>
        <Link to={`/project2/competition/${item.link}`}>
          <NavLink
            key={item.name}
            label={item.name}
            active={selected === item.name}
            color="primary"
            variant="filled"
            noWrap
            className={selected === item.name ? classes.linkSelected : isDark ? classes.linkDark : classes.link}
            onClick={() => setSelected(item.name)}
          />
        </Link>
      </div>
    );
  });

  return (
    <div className={classes.container}>
      <div className={classes.subTitleContainer}>
        <Text size="xs">Tournaments</Text>
      </div>
      <Group className={classes.links} style={{ border: 'none' }}>
        {links}
      </Group>
    </div>
  );
}
