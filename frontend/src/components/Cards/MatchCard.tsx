import { Card, Image, Text, Badge, Group, Flex, Stack } from '@mantine/core';
import { ResultType } from '../../types/Result';
import classes from '../../styles/Cards/MatchCard.module.css';
import { useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateUtils';

export function MatchCard(props: ResultType) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const date = formatDate(props.date);

  return (
    <Link to={`/project2/matchup/${props._id}`}>
      <div className={classes.container}>
        <Card
          shadow="xl"
          padding="xs"
          radius="md"
          style={{
            width: '75%',
            height: 150,
            backgroundColor: colorScheme === 'dark' ? theme.colors.darkmode[2] : 'white',
            borderColor: colorScheme === 'dark' ? theme.colors.darkmode[3] : theme.colors.darkmode[6],
          }}
        >
          <Group align="center" justify="center" mb="sm">
            <Badge color="primary">{props.tournament}</Badge>
            <Text>{date}</Text>
          </Group>
          <Flex align="center" justify="space-between">
            <Stack align="center">
              <Image src={props.HometeamFlag} alt={props.home_team} width={50} height={50} />
              <Text>{props.home_team}</Text>
            </Stack>
            <Stack align="center">
              <Group align="center" mb="lg">
                <Text>{props.home_score}</Text>
                <Text>-</Text>
                <Text>{props.away_score}</Text>
              </Group>
            </Stack>
            <Stack align="center">
              <Image src={props.AwayteamFlag} alt={props.away_team} width={50} height={50} />
              <Text>{props.away_team}</Text>
            </Stack>
          </Flex>
        </Card>
      </div>
    </Link>
  );
}
