import { Button, Modal, Textarea, TextInput, useMantineTheme } from '@mantine/core';
import { CommentType } from '../../types/comment';
import { useMantineColorScheme } from '@mantine/core';
import { useState } from 'react';
import classes from '../../styles/Matchup/CommentModal.module.css';

interface CommentModalProps {
  opened: boolean;
  onClose: () => void;
  comments: CommentType[];
  setComments: (comments: CommentType[]) => void;
}

export default function CommentModal({ opened, onClose, comments, setComments }: CommentModalProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = useMantineTheme();

  const [commentText, setCommentText] = useState('');
  const [username, setUsername] = useState('');

  const [buttonPressed, setButtonPressed] = useState(false);

  const getColor = () => {
    return isDark ? theme.colors.darkmode[2] : 'white';
  };

  const handleClick = () => {
    setButtonPressed(true);
    if (username && commentText) {
      const newComment: CommentType = {
        username,
        text: commentText,
        date: new Date().toISOString(),
      };

      setCommentText('');
      setUsername('');

      // Add the new comment to the list of comments
      setComments([newComment, ...comments]);
      onClose();
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add comment" className={classes.container}>
      <TextInput
        label="Username"
        required
        error={buttonPressed && !username ? 'Username is required' : null}
        value={username}
        onChange={(event) => {
          setUsername(event.currentTarget.value);
          setButtonPressed(false);
        }}
        styles={{
          root: {
            marginBottom: 20,
          },
          input: {
            backgroundColor: getColor(),
          },
        }}
      />
      <Textarea
        label="Comment"
        required
        value={commentText}
        error={buttonPressed && !commentText ? 'Comment is required' : null}
        onChange={(event) => {
          setCommentText(event.currentTarget.value);
          setButtonPressed(false);
        }}
        styles={{
          input: {
            backgroundColor: getColor(),
          },
        }}
      />
      <Button color="primary" onClick={handleClick} className={classes.button}>
        Post comment
      </Button>
    </Modal>
  );
}
