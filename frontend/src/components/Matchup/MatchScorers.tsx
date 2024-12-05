import { useQuery } from '@apollo/client';
import { GET_GOALSCORERS } from '../../graphql/resultOperations';
import { IconBallFootball } from '@tabler/icons-react';
import classes from '../../styles/Matchup/MatchScorers.module.css';
import { Goalscorer } from '../../types/GoalscorerType';
import { Button, Loader, useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { ResultType } from '../../types/ResultType';
import { useState, useEffect, useRef } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { useLanguageStore } from '../../stores/language-store';

interface MatchScorersProps {
  result: ResultType;
}

export default function MatchScorers({ result }: MatchScorersProps) {
  const { language } = useLanguageStore();
  const { home_score, away_score, home_team, away_team, date } = result;
  const [showGoalscorers, setShowGoalscorers] = useState(true);
  const innerContainerRef = useRef<HTMLDivElement>(null);
  const [dataAvailable, setDataAvailable] = useState(true);
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  // Fetch goalscorers data from the server
  const { loading, error, data } = useQuery(GET_GOALSCORERS, {
    variables: { home_team, away_team, date },
  });

  // Set the height of the inner container based on the showGoalscorers state
  useEffect(() => {
    if (innerContainerRef.current) {
      innerContainerRef.current.style.height = showGoalscorers ? `${innerContainerRef.current.scrollHeight}px` : '0';
    }
  }, [showGoalscorers, data]);

  // Update the dataAvailable state based on the data
  useEffect(() => {
    if (data) {
      setDataAvailable(!(home_score + away_score > 0 && data.goalscorers.length === 0));
    }
  }, [away_score, data, home_score]);

  if (loading) return <Loader size={25} color={theme.colors.primary[5]} />;
  if (error) return <p>Error: {error.message}</p>;

  // Filter goalscorers by team and sort them by minute
  const goals: Goalscorer[] = data.goalscorers;
  const home_goals = goals.filter((goal) => goal.team === home_team);
  const away_goals = goals.filter((goal) => goal.team === away_team);
  const orderedGoals = [...home_goals, ...away_goals].sort((a, b) => a.minute - b.minute);

  // Get the position of the name based on the team
  const getNamePositionStyle = (home: boolean) => {
    const homeStyle = { transform: 'translateX(-50%)', right: '1.2rem' };
    const awayStyle = { transform: 'translateX(50%)', left: '1.2rem' };
    return home ? homeStyle : awayStyle;
  };

  const handleHideGoalscorers = () => {
    setShowGoalscorers(!showGoalscorers);
  };

  if (!result) {
    return <div>{language === 'en' ? 'No data available' : 'Ingen data tilgjengelig'}</div>;
  }

  return (
    <div className={classes.container}>
      {!dataAvailable && (
        <p className={classes.noDataText}>
          {language == 'no' ? 'Ingen målscorer data tilgjengelig' : 'No goalscorer data available'}
        </p>
      )}
      {dataAvailable && goals.length > 0 && (
        <Button
          onClick={handleHideGoalscorers}
          className={classes.showHideButton}
          radius="xl"
          c={isDark ? 'white' : 'gray'}
          rightSection={
            <IconChevronDown
              size={20}
              className={classes.chevronIcon}
              id={showGoalscorers ? classes.chevronUp : classes.chevronDown}
            />
          }
        >
          {showGoalscorers
            ? language == 'no'
              ? 'Skjul målscorere'
              : 'Hide goalscorers'
            : language == 'no'
              ? 'Vis målscorere'
              : 'Show goalscorers'}
        </Button>
      )}
      <div ref={innerContainerRef} className={classes.innerContainer}>
        {orderedGoals.map((goal, index) => (
          <div key={index} className={classes.goalContainer}>
            <div className={classes.line}></div>
            <div className={classes.innerGoalContainer}>
              <IconBallFootball size={18} stroke={1.5} className={classes.icon} />
              <p className={classes.name} style={getNamePositionStyle(home_goals.includes(goal))}>
                {goal.scorer} {goal.minute}'{goal.own_goal && ' (OG.)'}
                {goal.penalty && ' (P.)'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
