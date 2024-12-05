import { Card, Text, Group } from '@mantine/core';
import { ResultType } from '../../types/ResultType';
import classes from '../../styles/Cards/Cards.module.css';
import { useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateUtils';
import { getCountryCode } from '../../utils/imageUtils';
import { useEffect, useState } from 'react';
import { useLanguageStore } from '../../stores/language-store';

export function MatchCard(props: ResultType) {
  const { language } = useLanguageStore();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const date = formatDate(props.date);
  const [countryCodes, setCountryCodes] = useState<string[]>([]);

  useEffect(() => {
    const codes = getCountryCode([props.home_team, props.away_team]);
    setCountryCodes(codes as string[]);
  }, [props.home_team, props.away_team]);

  return (
    <Link to={`/project2/matchup/${props._id}`}>
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
          <div className={classes.dateTournamentContainer}>
            <Text size="sm" fw={600} className={classes.tournamentName}>
              {props.tournament}
            </Text>
            <Text className={isDark ? classes.darkText : classes.lightText} size="sm">
              {date}
            </Text>
            <Text className={isDark ? classes.darkText : classes.lightText} size="sm">
              {props.city}, {props.country}
            </Text>
          </div>

          <Group>
            <div className={classes.nationContainer}>
              <div className="flagImageContainer">
                <span className={`fi fi-${countryCodes[0]}`} id="flagImage"></span>
              </div>
              <Text fw={600} size="sm" className={classes.nationTitle}>
                {language === 'no' ? props.home_team_no : props.home_team}
              </Text>
            </div>
            <Group className={classes.scoreContainer}>
              <Text fw={600} size="md">
                {props.home_score}
              </Text>
              <Text fw={600} size="md">
                -
              </Text>
              <Text fw={600} size="md">
                {props.away_score}
              </Text>
            </Group>
            <div className={classes.nationContainer}>
              <div className="flagImageContainer">
                <span className={`fi fi-${countryCodes[1]}`} id="flagImage"></span>
              </div>
              <Text fw={600} size="sm" className={classes.nationTitle}>
                {language === 'no' ? props.away_team_no : props.away_team}
              </Text>
            </div>
          </Group>
        </Card>
      </div>
    </Link>
  );
}
