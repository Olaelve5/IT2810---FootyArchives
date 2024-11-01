import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../../styles/Matchup/MatchComments.module.css';
import { IconPlus } from '@tabler/icons-react';
import { CommentType } from '../../types/CommentType';
import Comment from './Comment';
import CommentModal from './CommentModal';
import { useLanguageStore } from '../../stores/language-store';
import { ResultType } from '../../types/ResultType';

interface MatchCommentsProps {
  result: ResultType;
}

export default function MatchComments({ result }: MatchCommentsProps) {
  const comments: CommentType[] = result.comments ? result.comments : [];
  const [opened, { open, close }] = useDisclosure(false);
  const language = useLanguageStore((state) => state.language);

  return (
    <div className={classes.container}>
      <CommentModal opened={opened} onClose={close} resultId={result._id} />
      <div className={classes.topContainer}>
        <h1 className={classes.title}>
          {comments.length} {language === 'en' ? 'comments' : 'kommentarer'}
        </h1>
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
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
}
