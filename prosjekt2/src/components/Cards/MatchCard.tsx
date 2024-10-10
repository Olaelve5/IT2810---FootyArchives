import { Card, Image, Text, Badge, Group, Flex, Stack } from '@mantine/core';
import { MatchCardType } from '../../types/MatchcardType';
import classes from '../../styles/Cards/MatchCard.module.css';
import { useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { Link } from 'react-router-dom';


export function MatchCard(props: MatchCardType) {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

  return (
    <Link to={`/project2/matchup/ex`}>
    <div className={classes.container}>
    <Card shadow="xl"  padding="xs" radius="md" style={{ width: '75%', height: 150, backgroundColor: colorScheme === 'dark' ? theme.colors.darkmode[2] : 'white',
            borderColor: colorScheme === 'dark' ? theme.colors.darkmode[3] : theme.colors.darkmode[6], }}>
      <Group align="center" justify="center" mb='sm'>
        <Badge color='primary' >{props.tournament}</Badge>
        <Text>{props.date}</Text>
      </Group>
      <Flex align="center" justify="space-between">
        <Stack align="center">
          <Image src={props.HometeamFlag} alt={props.homeTeam} width={50} height={50} />
          <Text>{props.homeTeam}</Text>
        </Stack>
        <Stack align="center">
          <Group align="center" mb='lg'>
            <Text>{props.homeScore}</Text>
            <Text>-</Text>
            <Text>{props.awayScore}</Text>
          </Group>
        </Stack>
        <Stack align="center">
          <Image src={props.AwayteamFlag} alt={props.awayTeam} width={50} height={50} />
          <Text>{props.awayTeam}</Text>
        </Stack>
      </Flex>
    </Card>
    </div>
    </Link>
  );
}



