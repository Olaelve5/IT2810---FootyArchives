import { CommentType } from '../../../types/CommentType';
import classes from '../../../styles/Matchup/Comment.module.css';
import { Button, Group, Text, useMantineTheme } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
import { calculateTimeDifference } from '../../../utils/dateUtils';
import { useState } from 'react';
import { useLanguageStore } from '../../../stores/language-store';
import { IconEdit } from '@tabler/icons-react';
import { getUserId } from '../../../utils/localStorageUtils';
import DelCommentBtn from './DelCommentBtn';

interface CommentProps {
  comment: CommentType;
  open: () => void;
  setIsEditMode: (isEditMode: boolean) => void;
  setCommentText: (commentText: string) => void;
  setActiveCommentId: (activeCommentId: string) => void;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function Comment({
  comment,
  open,
  setIsEditMode,
  setCommentText,
  setActiveCommentId,
  setComments,
  setTotalCount,
}: CommentProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [showFullComment, setShowFullComment] = useState(false);
  const { language } = useLanguageStore();

  const MAX_WORDS = 100;
  const getShortComment = (text: string) => {
    const words = text.split(' ');
    if (words.length <= MAX_WORDS) {
      return text;
    }
    return words.slice(0, MAX_WORDS).join(' ') + '...';
  };

  const handleReadMore = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowFullComment(true);
  };

  const handleShowLess = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowFullComment(false);
  };

  const canEdit = getUserId() === comment.user.id;

  return (
    <div className={classes.container}>
      <Group className={classes.headerContainer}>
        <div className={classes.nameTimeContainer}>
          <Text size="md" className={classes.username}>@{comment.user.username}</Text>
          <Text size="xs" c={isDark ? theme.colors.darkmode[8] : 'black'}>
            {calculateTimeDifference(comment.date)}
          </Text>
        </div>
        {canEdit && (
          <div className={classes.buttonContainer}>
            <Button
              className={classes.editButton}
              onClick={() => {
                setActiveCommentId(comment.id ?? '');
                setCommentText(comment.comment);
                setIsEditMode(true);
                open();
              }}
              size="xs"
              radius="xl"
            >
              <IconEdit
                size={20}
                color="white"
                className={`${classes.editIcon} ${isDark ? classes.editIconDark : classes.editIconLight}`}
              />
            </Button>
            <DelCommentBtn commentId={comment.id ?? ''} setComments={setComments} setTotalCount={setTotalCount} />
          </div>
        )}
      </Group>
      <Text size="md">{showFullComment ? comment.comment : getShortComment(comment.comment)}</Text>
      {comment.comment.split(' ').length > MAX_WORDS && (
        <Text
          component="span"
          className={`${classes.showMore} ${isDark ? classes.showMoreDark : classes.showMoreLight}`}
          onClick={showFullComment ? handleShowLess : handleReadMore}
        >
          {showFullComment
            ? language == 'no'
              ? 'Se mindre'
              : 'Show less'
            : language == 'no'
              ? 'Les mer'
              : 'Read more'}
        </Text>
      )}
    </div>
  );
}
