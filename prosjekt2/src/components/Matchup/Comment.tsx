import { CommentType } from '../../types/comment';
import classes from '../../styles/Matchup/Comment.module.css';
import { Group, Text, useMantineTheme } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';

export default function Comment({ comment }: { comment: CommentType }) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <div className={classes.container}>
      <Group className={classes.nameTimeContainer}>
        <Text size="md">@{comment.username}</Text>
        <Text size="xs" c={isDark ? theme.colors.darkmode[8] : 'black'}>
          {' '}
          1 year ago
        </Text>
      </Group>
      <Text size="md">{comment.text}</Text>
    </div>
  );
}
