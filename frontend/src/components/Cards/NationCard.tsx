import { Card, Text, useMantineTheme, useMantineColorScheme, Group } from '@mantine/core';
import classes from '../../styles/Cards/Cards.module.css';
import { NationType } from '../../types/Nation';
import { Link } from 'react-router-dom';
import { getCountryCode } from '../../utils/imageUtils';

function NationCard(props: NationType) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Link to={`/project2/Country/${props._id}`}>
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
              {props._id}
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
