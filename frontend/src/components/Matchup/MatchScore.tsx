import { Group, Image } from '@mantine/core';
import NorwayFlag from '../../assets/images/no.png';
import BrazilFlag from '../../assets/images/br.png';
import { matchup } from '../../utils/tempUtils';
import classes from '../../styles/Matchup/MatchScore.module.css';
import { Link } from 'react-router-dom';

export default function MatchScore() {
  return (
    <Group className={classes.container} gap={100}>
      <Group className={classes.imageNameContainer}>
        <Link to={`/project2/Country/ex`}>
        <Image src={BrazilFlag} h={80} radius={5} />
        </Link>
        <h2 className={classes.name}>{matchup.home_team}</h2>
      </Group>
      <Group className={classes.scoreContainer}>
        <h1>{matchup.home_score}</h1>
        <h1>-</h1>
        <h1>{matchup.away_score}</h1>
      </Group>
      <Group className={classes.imageNameContainer}>
        <Link to={`/project2/Country/ex`}>
        <Image src={NorwayFlag} h={80} radius={5} />
        </Link>
        <h2 className={classes.name}>{matchup.away_team}</h2>
      </Group>
    </Group>
  );
}
