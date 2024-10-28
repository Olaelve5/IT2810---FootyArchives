import { CommentType } from '../../types/CommentType';
import classes from '../../styles/Matchup/Comment.module.css';
import { Group, Text, useMantineTheme } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
import { calculateTimeDifference } from '../../utils/dateUtils';

export default function Comment({ comment }: { comment: CommentType }) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <div className={classes.container}>
      <Group className={classes.nameTimeContainer}>
        <Text size="md">@{comment.userName}</Text>
        <Text size="xs" c={isDark ? theme.colors.darkmode[8] : 'black'}>
          {' '}
          {calculateTimeDifference(comment.date)}
        </Text>
      </Group>
      <Text size="md">{comment.comment}</Text>
    </div>
  );
}
