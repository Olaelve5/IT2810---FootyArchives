import classes from '../../styles/SideBar/Sidebar.module.css';
import { Group, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useLanguageStore } from '../../stores/language-store';
import { useSidebarCollapseStore } from '../../stores/sidebar-collapse-store';
import { IconTrophyFilled } from '@tabler/icons-react';
import { tournamentData } from '../../utils/tournamentUtils';
import NavLinkItem from './NavLinkItem';

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

  const links = tournamentData.map((item) => {
    const themeColor = colorMap[item.color];

    return (
      <div className={classes.linkContainer} key={item.name}>
        <NavLinkItem
          to={`/project2/tournament/${item.name}`}
          label={item.name}
          icon={<IconTrophyFilled />}
          selected={selected}
          setSelected={setSelected}
          isDark={isDark}
          iconColor={themeColor}
          aria-label={item.name}  
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
      <Group
        className={classes.links}
        style={{ border: 'none' }}
        
      >
        {links}
      </Group>
    </div>
  );
}
