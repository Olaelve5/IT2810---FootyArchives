import { Button } from '@mantine/core';
import { useFilterStore } from '../../stores/filter-store';
import { useNavigate } from 'react-router-dom';

interface DescriptionButtonProps {
  startYear: number;
  endYear: number;
  tournamentName: string;
}

function DescriptionButton({ startYear, endYear, tournamentName }: DescriptionButtonProps) {
  const { resetFilters, setSelectedTournaments } = useFilterStore();
  const navigate = useNavigate();

  const handleClick = async () => {
    resetFilters();
    setSelectedTournaments([tournamentName]);
    navigate('/project2/matchups');
  };

  return (
    <div>
      <p>
        Discover {tournamentName} tournaments ranging from {startYear} to {endYear}
      </p>
      <Button onClick={handleClick}>Explore all {tournamentName} matchups</Button>
    </div>
  );
}

export default DescriptionButton;
