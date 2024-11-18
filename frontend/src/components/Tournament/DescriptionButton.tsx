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

function DescriptionButton({ startYear, endYear, tournamentName }: DescriptionButtonProps) {
  const { resetFilters, setSelectedTournaments, setFilterCount, setLastQueriedFilters } = useFilterStore();
  const navigate = useNavigate();
  const { language } = useLanguageStore();

  const handleClick = async () => {
    resetFilters();
    setSelectedTournaments([tournamentName]);
    setFilterCount(1);
    setLastQueriedFilters({ tournaments: [tournamentName] });
    navigate('/project2/matchups');
  };

  return (
    <div>
      <p>
        {language === 'no'
          ? `Oppdag ${tournamentName} turneringer fra ${startYear} til ${endYear}`
          : `Discover ${tournamentName} tournaments from ${startYear} to ${endYear}`}
      </p>
      <Button onClick={handleClick} className={classes.button} radius="xl" variant="outline" color="primary" size='sm'>
        {language === 'no' ? `Utforsk alle ${tournamentName} kamper` : `Explore all ${tournamentName} matchups`}
      </Button>
    </div>
  );
}

export default DescriptionButton;
