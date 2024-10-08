import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../../styles/Matchup/MatchComments.module.css';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { CommentType } from '../../types/comment';
import Comment from './Comment';
import { mockupComments } from '../../utils/tempUtils';
import CommentModal from './CommentModal';

export default function MatchComments() {
  const [comments, setComments] = useState<CommentType[]>(mockupComments);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className={classes.container}>
      <CommentModal opened={opened} onClose={close} comments={comments} setComments={setComments} />
      <div className={classes.topContainer}>
        <h1 className={classes.title}>3 comments</h1>
        <Button color="primary" className={classes.button} leftSection={<IconPlus size={20} />} onClick={open}>
          Add comment
        </Button>
      </div>
      <div className={classes.commentsContainer}>
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
}
