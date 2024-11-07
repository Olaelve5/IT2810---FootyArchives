import { Card, Text, useMantineTheme, useMantineColorScheme, Group } from '@mantine/core';
import classes from '../../styles/Cards/Cards.module.css';
import { NationType } from '../../types/NationType';
import { Link } from 'react-router-dom';
import { getCountryCode } from '../../utils/imageUtils';
import { useLanguageStore } from '../../stores/language-store';
import { getNorwegianName } from '../../utils/translationUtils';

function NationCard(props: NationType) {
  const { language } = useLanguageStore();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const getNationName = () => {
    if (language === 'no') {
      return getNorwegianName(props._id);
    }
    return props._id;
  };

  return (
    <Link to={`/project2/nation/${props._id}`}>
      <div className={classes.container}>
        <Card
          padding="xs"
          radius="md"
          shadow="xl"
          className={classes.card}
          id={isDark ? classes.darkCard : classes.lightCard}
          style={{
            backgroundColor: isDark ? theme.colors.darkmode[1] : 'white',
          }}
        >
          <Group className={classes.nationCardHeader}>
            <div className="flagImageContainer">
              <span className={`fi fi-${getCountryCode([props._id])}`} id="flagImage"></span>
            </div>
            <Text size="lg" fw={600} style={{ whiteSpace: 'noWrap' }}>
              {getNationName()}
            </Text>
          </Group>
          <Group>
            <Text fw={600} className={isDark ? classes.darkText : classes.lightText}>
              {props.total_team_games} games
            </Text>
          </Group>
          <Group>
            <Text fw={600}>{props.total_team_wins} W</Text>
            <Text fw={600}>{props.total_team_draws} D</Text>
            <Text fw={600}>{props.total_team_losses} L</Text>
          </Group>
        </Card>
      </div>
    </Link>
  );
}

export default NationCard;
