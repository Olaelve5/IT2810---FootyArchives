import classes from '../../styles/SideBar/SideBar.module.css';
import { Group, NavLink, Text, useMantineColorScheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '../../stores/language-store';
import { useSidebarCollapseStore } from '../../stores/sidebar-collapse-store';

const data = [
  {
    name: 'FIFA World Cup',
    link: 'FIFA World Cup',
  },
  {
    name: 'Euros',
    link: 'Euros',
  },
  {
    name: 'Copa America',
    link: 'Copa America',
  },
  {
    name: 'Asian Cup',
    link: 'Asian Cup',
  },
  {
    name: 'African Cup',
    link: 'African Cup',
  },
];

interface CompetitionsProps {
  selected: string;
  setSelected: (label: string) => void;
}

export default function Tournaments({ selected, setSelected }: CompetitionsProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const language = useLanguageStore((state) => state.language);
  const { isCollapsed } = useSidebarCollapseStore();

  const links = data.map((item) => {
    return (
      <div className={classes.linkContainer} key={item.name}>
        <NavLink
          component={Link}
          to={`/project2/tournament/${item.link}`}
          label={item.name}
          active={selected === item.name}
          color="primary"
          variant="filled"
          noWrap
          className={selected === item.name ? classes.linkSelected : isDark ? classes.linkDark : classes.link}
          onClick={() => setSelected(item.name)}
        />
      </div>
    );
  });

  return (
    <div className={classes.container} id={isCollapsed ? classes.containerCollapsed : classes.containerExpanded}>
      <div className={classes.subTitleContainer}>
        <Text size="xs" style={{ opacity: isCollapsed ? 0 : 1 }} className={classes.subTitle}>
          {language === 'en' ? 'Tournaments' : 'Turneringer'}
        </Text>
      </div>
      <Group className={classes.links} style={{ border: 'none' }}>
        {links}
      </Group>
    </div>
  );
}
