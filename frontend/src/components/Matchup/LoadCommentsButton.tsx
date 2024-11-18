import { Button } from '@mantine/core';

interface LoadCommentsButtonProps {
  language: string;
  classes: any;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  loading: boolean;
}

const LoadCommentsButton: React.FC<LoadCommentsButtonProps> = ({
  language,
  classes,
  setPage,
  page,
  totalPages,
  loading,
}) => {
  const loadMoreComments = (event: React.MouseEvent) => {
    setPage(page + 1);
    event.preventDefault();

  };

  return (
    <>
      <Button color="primary" className={classes.button} loading= {loading} onClick={loadMoreComments} disabled={totalPages === page}>
        <p>{language === 'en' ? 'Load more comments' : 'Last inn flere kommentarer'}</p>
      </Button>
    </>
  );
};

export default LoadCommentsButton;
