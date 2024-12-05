import { Button, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../../../styles/Matchup/MatchComments.module.css';
import { IconPlus } from '@tabler/icons-react';
import { CommentType } from '../../../types/CommentType';
import Comment from './Comment';
import CommentModal from './CommentModal';
import { useLanguageStore } from '../../../stores/language-store';
import { ResultType } from '../../../types/ResultType';
import { GET_COMMENTS } from '../../../graphql/commentOperations';
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
  });
  const [opened, { open, close }] = useDisclosure(false);
  const language = useLanguageStore((state) => state.language);
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = data?.getComments.totalPages || 0;
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [activeCommentId, setActiveCommentId] = useState('');

  // Initialize comments only on the first page load
  useEffect(() => {
    if (page === 1 && data?.getComments?.comments) {
      setComments(data.getComments.comments);
      setTotalCount(data.getComments.totalCount);
    }
  }, [data, page]);

  // Fetch more tournaments when button is clicked
  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault();

    const { data } = await fetchMore({
      variables: { resultId: result._id, page: page + 1 },
    });

    if (data) {
      setPage((prevPage) => prevPage + 1);
      setComments((prevComments) => [...prevComments, ...data.getComments.comments]);
    }
  };

  return (
    <div className={classes.container}>
      <CommentModal
        opened={opened}
        onClose={close}
        resultId={result._id}
        setComments={setComments}
        setTotalCount={setTotalCount}
        isEditMode={isEditMode}
        commentText={commentText}
        setCommentText={setCommentText}
        commentId={activeCommentId}
      />
      <div className={classes.topContainer}>
        <h1 className={classes.title}>
          {totalCount} {language === 'en' ? 'comments' : 'kommentarer'}
        </h1>
        {error && (
          <Text size="sm" c="red">
            {language === 'en' ? 'Something when wrong' : 'Noe gikk galt'}
          </Text>
        )}
        <Button
          color="primary"
          className={classes.button}
          leftSection={<IconPlus size={20} color="white" />}
          onClick={() => {
            setIsEditMode(false);
            setCommentText('');
            open();
          }}
        >
          <p>{language === 'en' ? 'Add' : 'Legg til'}</p>
        </Button>
      </div>
      <div className={classes.commentsContainer}>
        {comments.length === 0 && (
          <p className={classes.noComments}>{language === 'en' ? 'No comments yet' : 'Ingen kommentarer enda'}</p>
        )}
        {comments.map((comment: CommentType, index: Key | null | undefined) => (
          <Comment
            key={index}
            comment={comment}
            open={open}
            setIsEditMode={setIsEditMode}
            setCommentText={setCommentText}
            setActiveCommentId={setActiveCommentId}
            setComments={setComments}
            setTotalCount={setTotalCount}
          />
        ))}
        {page < totalPages && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <LoadCommentsButton
              page={page}
              language={language}
              totalPages={totalPages || 0}
              handleClick={handleClick}
              loading={loading}
            />
          </div>
        )}
      </div>
    </div>
  );
}
