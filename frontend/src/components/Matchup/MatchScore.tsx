import { Group, Image } from '@mantine/core';
import NorwayFlag from '../../assets/images/no.png';
import BrazilFlag from '../../assets/images/br.png';
import classes from '../../styles/Matchup/MatchScore.module.css';
import { Link } from 'react-router-dom';
import { ResultType } from '../../types/ResultType';

export default function MatchScore(result: ResultType) {
  return (
    <Group className={classes.container} gap={100}>
      <Group className={classes.imageNameContainer}>
        <Link to={`/project2/Country/ex`}>
          <Image src={BrazilFlag} h={80} radius={5} />
        </Link>
        <h2 className={classes.name}>{result.home_team}</h2>
      </Group>
      <Group className={classes.scoreContainer}>
        <h1>{result.home_score}</h1>
        <h1>-</h1>
        <h1>{result.away_score}</h1>
      </Group>
      <Group className={classes.imageNameContainer}>
        <Link to={`/project2/Country/ex`}>
          <Image src={NorwayFlag} h={80} radius={5} />
        </Link>
        <h2 className={classes.name}>{result.away_team}</h2>
      </Group>
    </Group>
  );
}
