import classes from '../../styles/SideBar/Competitions.module.css';
import { NavLink, Text } from '@mantine/core';

const data = [
  {
    name: 'FIFA World Cup',
    link: '',
  },
  {
    name: 'Euros',
    link: '',
  },
  {
    name: 'Copa America',
    link: '',
  },
  {
    name: 'Asian Cup',
    link: '',
  },
  {
    name: 'African Cup of Nations',
    link: '',
  },
  {
    name: 'Friendlies',
    link: '',
  },
  {
    name: 'Others',
    link: '',
  },
];

export default function Competitions() {
  const links = data.map((item) => {
    return (
      <NavLink
        key={item.name}
        label={item.name}
        color="primary"
        variant="filled"
        noWrap
        />
    );
  });

  return (
    <div className={classes.container}>
      <Text size="xs">Competitions</Text>
      {links}
    </div>
  );
}
