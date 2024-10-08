import { matchup } from '../../utils/tempUtils';
import { IconBallFootball } from '@tabler/icons-react';
import classes from '../../styles/Matchup/MatchScorers.module.css';

export default function MatchScore() {
  const home_goals = matchup.goal_scorers_home;
  const away_goals = matchup.goal_scorers_away;
  const orderedGoals = [...home_goals, ...away_goals].sort((a, b) => a.minute - b.minute);

  return (
    <div className={classes.container}>
      {orderedGoals.map((goal, index) => (
        <div key={index} className={classes.goalContainer}>
          <IconBallFootball size={18} stroke={1.5} />
          <p>
            {goal.name} {goal.minute}'
            {goal.own_goal && ' (OG)'}
            {goal.penalty && ' (P)'}
          </p>
        </div>
      ))}
    </div>
  );
}
