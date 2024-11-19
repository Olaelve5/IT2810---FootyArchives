import { Button } from '@mantine/core';
import classes from '../../styles/Matchup/MatchComments.module.css';

interface LoadCommentsButtonProps {
  language: string;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  loading: boolean;
}

const LoadCommentsButton: React.FC<LoadCommentsButtonProps> = ({ language, setPage, page, totalPages, loading }) => {
  const loadMoreComments = (event: React.MouseEvent) => {
    setPage(page + 1);
    event.preventDefault();
  };

  return (
    <>
      <Button
        color="primary"
        className={classes.button}
        loading={loading}
        onClick={loadMoreComments}
        disabled={totalPages === page}
        style={{ width: '25%' }} // Adjust the width and add margin
      >
        <p>{language === 'en' ? 'Load more comments' : 'Last inn flere kommentarer'}</p>
      </Button>
    </>
  );
};

export default LoadCommentsButton;
