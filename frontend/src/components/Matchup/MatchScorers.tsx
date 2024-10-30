import { useQuery } from '@apollo/client';
import { GET_GOALSCORERS } from '../../graphql/queries';
import { IconBallFootball } from '@tabler/icons-react';
import classes from '../../styles/Matchup/MatchScorers.module.css';
import { Goalscorer } from '../../types/GoalscorerType';
import { Loader, useMantineTheme } from '@mantine/core';
import { ResultType } from '../../types/ResultType';

interface MatchScorersProps {
  result: ResultType;
}

export default function MatchScorers({ result }: MatchScorersProps) {
  const { home_score, away_score, home_team, away_team, date } = result;
  const { loading, error, data } = useQuery(GET_GOALSCORERS, {
    variables: { home_team, away_team, date },
  });
  const theme = useMantineTheme();

  if (loading) return <Loader size={25} color={theme.colors.primary[5]} />;
  if (error) return <p>Error: {error.message}</p>;

  const goals: Goalscorer[] = data.goalscorers;
  const home_goals = goals.filter((goal) => goal.team === home_team);
  const away_goals = goals.filter((goal) => goal.team === away_team);
  const orderedGoals = [...home_goals, ...away_goals].sort((a, b) => a.minute - b.minute);

  const getNamePositionStyle = (home: boolean) => {
    const homeStyle = { transform: 'translateX(-50%)', right: '2rem' };
    const awayStyle = { transform: 'translateX(50%)', left: '2rem' };
    return home ? homeStyle : awayStyle;
  };

  return (
    <div className={classes.container}>
      {home_score + away_score > 0 && data.goalscorers.length === 0 && <p className={classes.noDataText}>No goalscorer data available</p>}
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
  );
}
