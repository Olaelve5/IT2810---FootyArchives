import { Button, Modal, useMantineTheme } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
import { useState } from 'react';
import classes from '../../../styles/Matchup/CommentModal.module.css';
import { useLanguageStore } from '../../../stores/language-store';
import { POST_COMMENT, GET_COMMENTS, EDIT_COMMENT } from '../../../graphql/commentOperations';
import { useMutation } from '@apollo/client';
import { CommentType } from '../../../types/CommentType';
import UsernameInput from './UsernameInput';
import { IconMessagePlus, IconEdit } from '@tabler/icons-react';
import { setUserId } from '../../../utils/localStorageUtils';
import CommentInput from './CommentInput';

interface CommentModalProps {
  opened: boolean;
  onClose: () => void;
  resultId: string;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
  isEditMode?: boolean;
  commentText: string;
  commentId?: string;
  setCommentText: (commentText: string) => void;
}

export default function CommentModal({
  opened,
  onClose,
  resultId,
  setComments,
  setTotalCount,
  isEditMode,
  commentText,
  setCommentText,
  commentId,
}: CommentModalProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = useMantineTheme();
  const language = useLanguageStore((state) => state.language);
  const [username, setUsername] = useState('');
  const [buttonPressed, setButtonPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userIdState, setUserIdState] = useState('');

  const [postComment, { loading, error }] = useMutation(POST_COMMENT, {
    refetchQueries: [{ query: GET_COMMENTS, variables: { resultId: resultId } }], // Refetch after posting
    awaitRefetchQueries: true,
  });

  const [editComment] = useMutation(EDIT_COMMENT, {
    refetchQueries: [{ query: GET_COMMENTS, variables: { resultId: resultId } }], // Refetch after editing
    awaitRefetchQueries: true,
  });

  const getColor = () => {
    return isDark ? theme.colors.darkmode[2] : 'white';
  };

  // Validate comment input and return error message if invalid
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

  // Post comment to backend and update state if successful
  const handleClick = async () => {
    setButtonPressed(true);

    const validationError = validateComment();
    if (validationError) {
      setErrorMessage(validationError);
      return; // Stop execution on validation error
    }

    if (username && commentText) {
      try {
        if (isEditMode && commentId) {
          // Edit comment
          const { data } = await editComment({
            variables: {
              commentId: commentId,
              comment: commentText,
              username: username,
              ...(userIdState && { user_id: userIdState }), // Only include user_id if it's available
            },
          });

          if (data) {
            const updatedComment = data.editComment;
            setComments((prevComments) =>
              prevComments.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment)),
            );

            // Reset input fields and close modal
            setCommentText('');
            setErrorMessage('');
            handleClose();
          }
        } else {
          // Post comment
          const { data } = await postComment({
            variables: {
              resultId: resultId,
              comment: commentText,
              username: username,
              ...(userIdState && { user_id: userIdState }), // Only include user_id if it's available
            },
          });

          if (data) {
            const newComment = data.addComment;
            setUserId(newComment.user.id);

            // Update comments state
            setComments((prevComments) => [
              {
                id: newComment.id,
                user: {
                  id: newComment.user.id,
                  username: newComment.user.username,
                },
                date: newComment.date,
                comment: newComment.comment,
                result_id: newComment.result_id,
              },
              ...prevComments,
            ]);

            setTotalCount((prevTotalCount) => prevTotalCount + 1);

            // Store user_id in localStorage if not already set
            if (!userIdState && newComment.user.id) {
              setUserId(newComment.user.id);
            }

            // Reset input fields and close modal
            setCommentText('');
            setErrorMessage('');
            handleClose();
          }
        }
      } catch (error) {
        if (!(error as Error).message.includes('The username is already taken')) {
          console.error('Error posting comment:', error);
        }
      }
    }
  };

  const handleClose = () => {
    setButtonPressed(false);
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} className={classes.container} withCloseButton={false}>
      <div className={classes.titleContainer}>
        {isEditMode ? <IconEdit size={25} /> : <IconMessagePlus size={25} />}
        <h3 className={classes.title}>
          {isEditMode
            ? language === 'en'
              ? 'Edit comment'
              : 'Rediger kommentar'
            : language === 'en'
              ? 'Add comment'
              : 'Legg til kommentar'}
        </h3>
      </div>

      <UsernameInput
        username={username}
        setUsername={setUsername}
        buttonPressed={buttonPressed}
        setButtonPressed={setButtonPressed}
        setUserIdState={setUserIdState}
        parentError={error}
      />
      <CommentInput
        commentText={commentText}
        setCommentText={setCommentText}
        errorMessage={errorMessage}
        buttonPressed={buttonPressed}
        setButtonPressed={setButtonPressed}
        setErrorMessage={setErrorMessage}
        getColor={getColor}
      />
      <div className={classes.buttonContainer}>
        <Button radius="xl" color="red" onClick={handleClose} className={classes.button}>
          <p>{language === 'en' ? 'Cancel' : 'Avbryt'}</p>
        </Button>
        <Button radius="xl" color="primary" onClick={handleClick} className={classes.button} loading={loading}>
          <p>
            {language === 'en'
              ? isEditMode
                ? 'Edit comment'
                : 'Post comment'
              : isEditMode
                ? 'Rediger kommentar'
                : 'Post kommentar'}
          </p>
        </Button>
      </div>
    </Modal>
  );
}
