import { Group } from '@mantine/core';
import classes from '../../styles/Matchup/MatchScore.module.css';
import { Link } from 'react-router-dom';
import { ResultType } from '../../types/ResultType';
import { getCountryCode } from '../../utils/imageUtils';
import { useEffect, useState } from 'react';
import { useLanguageStore } from '../../stores/language-store';

export default function MatchScore(result: ResultType) {
  const [countryCodes, setCountryCodes] = useState<string[]>([]);
  const { language } = useLanguageStore();

  useEffect(() => {
    const codes = getCountryCode([result.home_team, result.away_team]);
    setCountryCodes(codes as string[]);
  }, [result.home_team, result.away_team]);

  return (
    <Group className={classes.container}>
      <Group className={classes.imageNameContainer}>
        <Link to={`/project2/nation/${result.home_team}`}>
          <div className="flagImageContainer" id={classes.flagImageContainer} aria>
            <span
              className={`fi fi-${countryCodes[0]}`}
              id="flagImage"
              aria-label={language === 'en' ? `${result.home_team} flag` : `${result.home_team_no} flagg`}
            ></span>
          </div>
        </Link>
        <h2 className={classes.name}>{language == 'no' ? result.home_team_no : result.home_team}</h2>
      </Group>
      <Group className={classes.scoreContainer}>
        <h1>
          {result.home_score} - {result.away_score}
        </h1>
      </Group>
      <Group className={classes.imageNameContainer}>
        <Link to={`/project2/nation/${result.away_team}`}>
          <div className="flagImageContainer" id={classes.flagImageContainer}>
            <span
              className={`fi fi-${countryCodes[1]}`}
              id="flagImage"
              aria-label={language === 'en' ? `${result.away_team} flag` : `${result.away_team_no} flagg`}
            ></span>
          </div>
        </Link>
        <h2 className={classes.name}>{language == 'no' ? result.away_team_no : result.away_team}</h2>
      </Group>
    </Group>
  );
}
