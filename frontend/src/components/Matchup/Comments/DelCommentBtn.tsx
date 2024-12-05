import { Button } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import classes from '../../../styles/Matchup/Comment.module.css';
import { useMantineColorScheme, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useLanguageStore } from '../../../stores/language-store';
import { DELETE_COMMENT } from '../../../graphql/commentOperations';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { CommentType } from '../../../types/CommentType';

interface DelCommentBtnProps {
  commentId: string;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

function DelCommentBtn({ commentId, setComments, setTotalCount }: DelCommentBtnProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [opened, { open, close }] = useDisclosure(false);
  const [error, setError] = useState(false);
  const { language } = useLanguageStore();

  const [deleteComment] = useMutation(DELETE_COMMENT);

  // Delete comment from database
  const handleDeleteComment = async () => {
    const { data } = await deleteComment({
      variables: {
        commentId: commentId,
      },
    });

    // If the comment was deleted, remove it from the list of comments
    if (data.deleteComment) {
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
      setTotalCount((prevTotalCount) => prevTotalCount - 1);
      setError(false);
      close();
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Button className={classes.deleteButton} size="xs" color="red" radius="xl" onClick={open}>
        <IconTrash
          size={20}
          color="white"
          className={`${classes.deleteIcon} ${isDark ? classes.deleteIconDark : classes.deleteIconLight}`}
        />
      </Button>
      <Modal opened={opened} onClose={close} withCloseButton={false} size="xs" centered>
        <div className={classes.modalContainer}>
          {error && <Text c="red">{language === 'en' ? 'Something went wrong' : 'Noe gikk galt'}</Text>}
          <h3>{language === 'en' ? 'Delete comment?' : 'Slett kommentar?'}</h3>
          <div className={classes.modalButtons}>
            <Button className={classes.modalButton} onClick={close} radius="xl" color="primary">
              <p>{language === 'en' ? 'Cancel' : 'Avbryt'}</p>
            </Button>
            <Button className={classes.modalButton} onClick={handleDeleteComment} color="red" radius="xl">
              <p>{language === 'en' ? 'Yes' : 'Ja'}</p>
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DelCommentBtn;
