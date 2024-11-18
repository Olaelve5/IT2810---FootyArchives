import { Button, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../../styles/Matchup/MatchComments.module.css';
import { IconPlus } from '@tabler/icons-react';
import { CommentType } from '../../types/CommentType';
import Comment from './Comment';
import CommentModal from './CommentModal';
import { useLanguageStore } from '../../stores/language-store';
import { ResultType } from '../../types/ResultType';
import { GET_COMMENTS } from '../../graphql/commentOperations';
import { useQuery } from '@apollo/client';
import { Key, useEffect } from 'react';
import LoadCommentsButton from './LoadCommentsButton';
import { useState } from 'react';

interface MatchCommentsProps {
  result: ResultType;
}

export default function MatchComments({ result }: MatchCommentsProps) {
  const [page, setPage] = useState(1);
  const { data, loading, error, fetchMore } = useQuery(GET_COMMENTS, {
    variables: { resultId: result._id, page: page, limit: 10 },
    onCompleted: (data) => {
      setComments(data.getComments.comments);
    },
  });
  const [opened, { open, close }] = useDisclosure(false);
  const language = useLanguageStore((state) => state.language);
  const count = data?.getComments.totalCount || 0;
  const totalPages = data?.getComments.totalPages || 0;
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    if (page > 1) {
      fetchMore({
        variables: { page: page },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          setComments([...comments, ...fetchMoreResult.getComments.comments]);
        },
      });
    }
  }, [page]);

  return (
    <div className={classes.container}>
      <CommentModal opened={opened} onClose={close} resultId={result._id} />
      <div className={classes.topContainer}>
        <h1 className={classes.title}>
          {count} {language === 'en' ? 'comments' : 'kommentarer'}
        </h1>
        {error && <Text size='sm' c='red'>{language === 'en' ? 'Something when wrong' : 'Noe gikk galt'}</Text>}
        <Button
          color="primary"
          className={classes.button}
          leftSection={<IconPlus size={20} color="white" />}
          onClick={open}
        >
          <p>{language === 'en' ? 'Add comment' : 'Legg til kommentar'}</p>
        </Button>
      </div>
      <div className={classes.commentsContainer}>
        {comments.length === 0 && (
          <p className={classes.noComments}>{language === 'en' ? 'No comments yet' : 'Ingen kommentarer enda'}</p>
        )}
        {comments.map((comment: CommentType, index: Key | null | undefined) => (
          <Comment key={index} comment={comment} />
        ))}
        {comments.length > 0 && (
          <LoadCommentsButton
            language={language}
            classes={classes}
            totalPages={totalPages || 0}
            setPage={setPage}
            page={page}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
