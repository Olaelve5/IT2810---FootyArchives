import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../../styles/Matchup/MatchComments.module.css';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { CommentType } from '../../types/CommentType';
import Comment from './Comment';
import { mockupComments } from '../../utils/tempUtils';
import CommentModal from './CommentModal';
import { useLanguageStore } from '../../stores/language-store';

export default function MatchComments() {
  const [comments, setComments] = useState<CommentType[]>(mockupComments);
  const [opened, { open, close }] = useDisclosure(false);
  const language = useLanguageStore((state) => state.language);

  return (
    <div className={classes.container}>
      <CommentModal opened={opened} onClose={close} comments={comments} setComments={setComments} />
      <div className={classes.topContainer}>
        <h1 className={classes.title}>
          {comments.length} {language === 'en' ? 'comments' : 'kommentarer'}
        </h1>
        <Button color="primary" className={classes.button} leftSection={<IconPlus size={20} />} onClick={open}>
          {language === 'en' ? 'Add comment' : 'Legg til kommentar'}
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
