import classes from '../../styles/SideBar/SideBar.module.css';
import { Group, NavLink, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '../../stores/language-store';
import { useSidebarCollapseStore } from '../../stores/sidebar-collapse-store';
import { IconTrophyFilled } from '@tabler/icons-react';

const data = [
  {
    name: 'FIFA World Cup',
    link: 'FIFA World Cup',
    color: 'yellow',
  },
  {
    name: 'UEFA Euro',
    link: 'UEFA Euro',
    color: 'blue',
  },
  {
    name: 'Copa América',
    link: 'Copa América',
    color: 'orange',
  },
  {
    name: 'AFC Asian Cup',
    link: 'AFC Asian Cup',
    color: 'red',
  },
  {
    name: 'African Cup of Nations',
    link: 'African Cup of Nations',
    color: 'green',
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
  const theme = useMantineTheme();

  // Map data colors to Mantine theme colors
  const colorMap: { [key: string]: string } = {
    yellow: theme.colors.yellow[8],
    blue: theme.colors.blue[8],
    orange: theme.colors.orange[8],
    red: theme.colors.red[8],
    green: theme.colors.green[8],
  };

  const links = data.map((item) => {
    const themeColor = colorMap[item.color];

    return (
      <div className={classes.linkContainer} key={item.name}>
        <NavLink
          component={Link}
          to={`/project2/tournament/${item.link}`}
          label={item.name}
          active={selected === item.name}
          color="primary"
          variant="filled"
          leftSection={<IconTrophyFilled stroke={1.5} size={25} color={themeColor} />}
          noWrap
          className={selected === item.name ? classes.linkSelected : isDark ? classes.linkDark : classes.link}
          onClick={() => setSelected(item.name)}
          classNames={{
            label: isCollapsed ? classes.linkLabelCollapsed : classes.linkLabel,
            body: classes.linkLabelBody,
          }}
          id={classes.link}
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
