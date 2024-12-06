import { Button } from '@mantine/core';
import { useFilterStore } from '../../stores/filter-store';
import { useNavigate } from 'react-router-dom';
import { useLanguageStore } from '../../stores/language-store';
import classes from '../../styles/Tournament/DescriptionButton.module.css';

interface DescriptionButtonProps {
  startYear: number;
  endYear: number;
  tournamentName: string;
}

// Button that navigates to the matchups page with the selected tournament
function DescriptionButton({ startYear, endYear, tournamentName }: DescriptionButtonProps) {
  const { resetFilters, setSelectedTournaments, setFilterCount, setLastQueriedFilters, setPage } = useFilterStore();
  const navigate = useNavigate();
  const { language } = useLanguageStore();

  // Handle button click by resetting filters and setting the selected tournament
  const handleClick = async () => {
    resetFilters();
    setSelectedTournaments([tournamentName]);
    setFilterCount(1);
    setLastQueriedFilters({ tournaments: [tournamentName] });
    setPage(1);
    navigate('/project2/matchups');
  };

  return (
    <div className={classes.container}>
      <p>
        {language === 'no'
          ? `Oppdag ${tournamentName} kamper fra ${startYear} til ${endYear}`
          : `Discover ${tournamentName} matchups from ${startYear} to ${endYear}`}
      </p>
      <Button onClick={handleClick} className={classes.button} radius="xl" color="primary" size="sm" c="white">
        <p>{language === 'no' ? `Utforsk alle kamper` : `Explore all matchups`} </p>
      </Button>
    </div>
  );
}

export default DescriptionButton;
