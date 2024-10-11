import { Button, Modal, Textarea, TextInput, useMantineTheme } from '@mantine/core';
import { CommentType } from '../../types/comment';
import { useMantineColorScheme } from '@mantine/core';
import { useState } from 'react';
import classes from '../../styles/Matchup/CommentModal.module.css';
import { useLanguageStore } from '../../stores/language-store';

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
  const language = useLanguageStore((state) => state.language);

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
      handleClose();
    }
  };

  const handleClose = () => {
    setButtonPressed(false);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={language === 'en' ? 'Add comment' : 'Legg til kommentar'}
      className={classes.container}
    >
      <TextInput
        label={language === 'en' ? 'Username' : 'Brukernavn'}
        required
        error={
          buttonPressed && !username ? (language === 'en' ? 'Username is required' : 'Brukernavn er påkrevd') : null
        }
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
        label={language === 'en' ? 'Comment' : 'Kommentar'}
        required
        value={commentText}
        error={
          buttonPressed && !commentText ? (language === 'en' ? 'Comment is required' : 'Kommentar er påkrevd') : null
        }
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
      <Button radius={100} color="primary" onClick={handleClick} className={classes.button}>
        {language === 'en' ? 'Post comment' : 'Post kommentar'}
      </Button>
    </Modal>
  );
}
