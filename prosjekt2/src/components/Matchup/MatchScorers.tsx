import { matchup } from '../../utils/tempUtils';
import { IconBallFootball } from '@tabler/icons-react';
import classes from '../../styles/Matchup/MatchScorers.module.css';

export default function MatchScore() {
  const home_goals = matchup.goal_scorers_home;
  const away_goals = matchup.goal_scorers_away;
  const orderedGoals = [...home_goals, ...away_goals].sort((a, b) => a.minute - b.minute);

  const getNamePositionStyle = (home: boolean) => {
    const homeStyle = {transform: 'translateX(-50%)', right: '2rem'};
    const awayStyle = {transform: 'translateX(50%)', left: '2rem'};

    return home ? homeStyle : awayStyle
  }

  return (
    <div className={classes.container}>
      {orderedGoals.map((goal, index) => (
        <div key={index} className={classes.goalContainer}>
          <div className={classes.line}></div>
          <div className={classes.innerGoalContainer}>
            <IconBallFootball size={18} stroke={1.5} className={classes.icon} />
            <p className={classes.name} style={getNamePositionStyle(home_goals.includes(goal))}>
              {goal.name} {goal.minute}'{goal.own_goal && ' (OG.)'}
              {goal.penalty && ' (P.)'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
