import { Button, Modal, Textarea, TextInput, useMantineTheme } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
import { useState } from 'react';
import classes from '../../styles/Matchup/CommentModal.module.css';
import { useLanguageStore } from '../../stores/language-store';
import { POST_COMMENT } from '../../graphql/commentOperations';
import { GET_COMMENTS } from '../../graphql/commentOperations';
import { useMutation } from '@apollo/client';

interface CommentModalProps {
  opened: boolean;
  onClose: () => void;
  resultId: string;
}

export default function CommentModal({ opened, onClose, resultId }: CommentModalProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = useMantineTheme();
  const language = useLanguageStore((state) => state.language);

  const getUsernameFromLocalStorage = () => {
    return localStorage.getItem('username') || '';
  };

  const storeUsernameInLocalStorage = (username: string) => {
    localStorage.setItem('username', username);
  };

  const [commentText, setCommentText] = useState('');
  const [username, setUsername] = useState(getUsernameFromLocalStorage());
  const [buttonPressed, setButtonPressed] = useState(false);
  const [postComment, { loading, error }] = useMutation(POST_COMMENT, {
    refetchQueries: [{ query: GET_COMMENTS, variables: { resultId: resultId } }], // Refetch after posting
    awaitRefetchQueries: true,
  });

  const getColor = () => {
    return isDark ? theme.colors.darkmode[2] : 'white';
  };

  const handleClick = async () => {
    setButtonPressed(true);
    if (username && commentText) {
      try {
        await postComment({
          variables: {
            resultId: resultId,
            comment: commentText,
            userName: username,
          },
        });

        // Store the username in localStorage
        storeUsernameInLocalStorage(username);

        // Reset the input fields and close the modal
        setCommentText('');
        setUsername('');
        handleClose();
      } catch (error) {
        console.error(error);
      }
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
      {error && <p>{error.message}</p>}
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
      <Button radius={100} color="primary" onClick={handleClick} className={classes.button} loading={loading}>
        <p>{language === 'en' ? 'Post comment' : 'Post kommentar'}</p>
      </Button>
    </Modal>
  );
}
