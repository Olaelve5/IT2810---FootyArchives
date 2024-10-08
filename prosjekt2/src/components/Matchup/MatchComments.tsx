import { Button } from '@mantine/core';
import classes from '../../styles/Matchup/MatchComments.module.css';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { CommentType } from '../../types/comment';
import Comment from './Comment';
import { mockupComments } from '../../utils/tempUtils';

export default function MatchComments() {
  const [comments, setComments] = useState<CommentType[]>(mockupComments);

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <h1 className={classes.title}>3 comments</h1>
        <Button color="primary" className={classes.button} leftSection={<IconPlus size={20} />}>
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
