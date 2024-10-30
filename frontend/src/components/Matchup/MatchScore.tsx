import { Group } from '@mantine/core';
import classes from '../../styles/Matchup/MatchScore.module.css';
import { Link } from 'react-router-dom';
import { ResultType } from '../../types/ResultType';
import { getCountryCode } from '../../utils/imageUtils';
import { useEffect, useState } from 'react';

export default function MatchScore(result: ResultType) {
  const [countryCodes, setCountryCodes] = useState<string[]>([]);

  useEffect(() => {
    const codes = getCountryCode([result.home_team, result.away_team]);
    setCountryCodes(codes as string[]);
  }, [result.home_team, result.away_team]);

  return (
    <Group className={classes.container} gap={100}>
      <Group className={classes.imageNameContainer}>
        <Link to={`/project2/nation/${result.home_team}`}>
          <div className="flagImageContainer" id={classes.flagImageContainer}>
            <span className={`fi fi-${countryCodes[0]}`} id="flagImage"></span>
          </div>
        </Link>
        <h2 className={classes.name}>{result.home_team}</h2>
      </Group>
      <Group className={classes.scoreContainer}>
        <h1>{result.home_score}</h1>
        <h1>-</h1>
        <h1>{result.away_score}</h1>
      </Group>
      <Group className={classes.imageNameContainer}>
        <Link to={`/project2/nation/${result.away_team}`}>
          <div className="flagImageContainer" id={classes.flagImageContainer}>
            <span className={`fi fi-${countryCodes[1]}`} id="flagImage"></span>
          </div>
        </Link>
        <h2 className={classes.name}>{result.away_team}</h2>
      </Group>
    </Group>
  );
}
