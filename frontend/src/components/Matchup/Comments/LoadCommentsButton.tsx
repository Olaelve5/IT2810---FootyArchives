import { Button } from '@mantine/core';
import classes from '../../../styles/Matchup/MatchComments.module.css';

interface LoadCommentsButtonProps {
  language: string;
  handleClick: (event: React.MouseEvent) => void;
  page: number;
  totalPages: number;
  loading: boolean;
}

const LoadCommentsButton: React.FC<LoadCommentsButtonProps> = ({ language, handleClick, page, totalPages, loading }) => {
  
  return (
    <>
      <Button
        color="primary"
        className={classes.button}
        loading={loading}
        onClick={(event) => handleClick(event)}
        disabled={totalPages === page}
      >
        <p>{language === 'en' ? 'Load more comments' : 'Last inn flere kommentarer'}</p>
      </Button>
    </>
  );
};

export default LoadCommentsButton;
