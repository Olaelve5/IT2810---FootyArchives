import { Button, Modal, Textarea, TextInput, useMantineTheme } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
import { useState } from 'react';
import classes from '../../styles/Matchup/CommentModal.module.css';
import { useLanguageStore } from '../../stores/language-store';
import { POST_COMMENT } from '../../graphql/commentOperations';
import { GET_COMMENTS } from '../../graphql/commentOperations';
import { useMutation } from '@apollo/client';
import { CommentType } from '../../types/ResultType';

interface CommentModalProps {
  opened: boolean;
  onClose: () => void;
  resultId: string;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function CommentModal({ opened, onClose, resultId, setComments, setTotalCount }: CommentModalProps) {
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
  const [errorMessage, setErrorMessage] = useState('');
  const [postComment, { loading, error }] = useMutation(POST_COMMENT, {
    refetchQueries: [{ query: GET_COMMENTS, variables: { resultId: resultId } }], // Refetch after posting
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const getColor = () => {
    return isDark ? theme.colors.darkmode[2] : 'white';
  };

  const validateComment = () => {
    if (!commentText) {
      return language === 'en' ? 'Comment is required' : 'Kommentar er påkrevd';
    }
    const wordCount = commentText.trim().split(/\s+/).length;
    if (wordCount > 100) {
      return language === 'en' ? 'Comment cannot exceed 100 words' : 'Kommentaren kan ikke overstige 100 ord';
    }
    const charCount = commentText.length;
    if (charCount > 600) {
      return language === 'en' ? 'Comment cannot exceed 500 characters' : 'Kommentaren kan ikke overstige 500 tegn';
    }
    return '';
  };

  const handleClick = async () => {
    setButtonPressed(true);
    const validationError = validateComment();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    if (username && commentText) {
      try {
        const { data } = await postComment({
          variables: {
            resultId: resultId,
            comment: commentText,
            userName: username,
          },
        });

        // Add the new comment to the local state
        if (data) {
          const newComment = data.addComment; // Adjust field name as needed
          setComments((prevComments) => [newComment, ...prevComments]);
          setTotalCount((prevTotalCount) => prevTotalCount + 1);
        }

        // Store the username in localStorage
        storeUsernameInLocalStorage(username);

        // Reset the input fields and close the modal
        setCommentText('');
        setUsername('');
        setErrorMessage('');
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
        aria-label="Enter your username"
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
        aria-label="Write a comment"
        error={buttonPressed ? errorMessage : null}
        onChange={(event) => {
          setCommentText(event.currentTarget.value);
          setButtonPressed(false);
          setErrorMessage('');
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
