import { IconTrophy, IconCalendarEvent, IconBuildingStadium } from '@tabler/icons-react';
import classes from '../../styles/Matchup/MatchDetails.module.css';
import { useMantineColorScheme, useMantineTheme, Text, Button } from '@mantine/core';
import { ResultType } from '../../types/ResultType';
import { useEffect, useState } from 'react';
import { formatDate } from '../../utils/dateUtils';
import { useNavigate } from 'react-router-dom';

export default function MatchDetails(data: ResultType) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [result, setResult] = useState<ResultType | null>(null);
  const navigate = useNavigate();

  const getColor = () => {
    return isDark ? theme.colors.darkmode[9] : 'black';
  };

  useEffect(() => {
    setResult(data);
  }, [data]);

  if (!result) {
    return null;
  }

  const handleTournamentClick = () => {
    navigate(`/project2/tournament/${result.tournament}`);
  };

  return (
    <div className={classes.container}>
      <div>
        <Button variant="transparent" p={0} className={classes.tournamentButton} c='white'>
          <IconTrophy size={26} stroke={1.5} className={classes.icon} />
          <Text className={classes.tournamentText} onClick={handleTournamentClick}>
            {data.tournament}
          </Text>
        </Button>
      </div>
      <div className={classes.bottomContainer}>
        <div className={classes.detailContainer}>
          <IconCalendarEvent size={22} stroke={1.5} color={getColor()} />
          <Text c={getColor()} className={classes.detailText}>
            {formatDate(data.date)}
          </Text>
        </div>
        <div className={classes.detailContainer}>
          <IconBuildingStadium size={22} stroke={1.5} color={getColor()} />
          <Text c={getColor()} className={classes.detailText}>
            {data.city}, {data.country}
          </Text>
        </div>
      </div>
    </div>
  );
}
