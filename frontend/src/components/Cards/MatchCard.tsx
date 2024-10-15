import { Card, Text, Badge, Group, Flex, Stack } from '@mantine/core';
import { ResultType } from '../../types/Result';
import classes from '../../styles/Cards/MatchCard.module.css';
import { useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateUtils';
import { getCountryCode } from '../../utils/imageUtils';
import { useEffect, useState } from 'react';

export function MatchCard(props: ResultType) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const date = formatDate(props.date);
  const [countryCodes, setCountryCodes] = useState<string[]>([]);

  useEffect(() => {
    const codes = getCountryCode([props.home_team, props.away_team]);
    setCountryCodes(codes as string[]);
  }, [props.home_team, props.away_team]);


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
              <span className={`fi fi-${countryCodes[0]}`}></span>
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
              <span className={`fi fi-${countryCodes[1]}`}></span>
              <Text>{props.away_team}</Text>
            </Stack>
          </Flex>
        </Card>
      </div>
    </Link>
  );
}
