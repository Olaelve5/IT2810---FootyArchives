import { useQuery } from '@apollo/client';
import { GET_GOALSCORERS } from '../../graphql/queries';
import { IconBallFootball } from '@tabler/icons-react';
import classes from '../../styles/Matchup/MatchScorers.module.css';
import { Goalscorer } from '../../types/Goalscorer';

interface MatchScorersProps {
  home_team: string;
  away_team: string;
  date: string;
}

export default function MatchScorers({ home_team, away_team, date }: MatchScorersProps) {
  const { loading, error, data } = useQuery(GET_GOALSCORERS, {
    variables: { home_team, away_team, date },
  });

  if (loading) return <p>Loading...</p>;
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
