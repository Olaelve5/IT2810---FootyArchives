import { Button, Modal, TextInput, useMantineTheme } from '@mantine/core';
import { CommentType } from '../../types/comment';
import { useMantineColorScheme } from '@mantine/core';
import { useState } from 'react';
import { IconUserCircle } from '@tabler/icons-react';

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

  const getColor = () => {
    return isDark ? theme.colors.darkmode[2] : 'white';
  };

  const handleClick = () => {
    if (username && commentText) {
      const newComment: CommentType = {
        username,
        text: commentText,
        date: new Date().toISOString(),
      };

      setCommentText('');
      setUsername('');

      // Add the new comment to the list of comments
      setComments([...comments, newComment]);
      onClose();
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add comment">
      <TextInput
        label="Username"
        leftSection={<IconUserCircle size={22} />}
        required
        value={username}
        onChange={(event) => setUsername(event.currentTarget.value)}
        styles={{
          input: {
            backgroundColor: getColor(),
          },
        }}
      />
      <TextInput
        label="Comment"
        required
        value={commentText}
        onChange={(event) => setCommentText(event.currentTarget.value)}
        styles={{
          input: {
            backgroundColor: getColor(),
          },
        }}
      />
      <Button color="primary" onClick={handleClick}>
        Add comment
      </Button>
    </Modal>
  );
}