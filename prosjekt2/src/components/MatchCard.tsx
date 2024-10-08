import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import  {MatchCardType}  from '../types/MatchcardType';


export function MatchCard(props: MatchCardType) {
  return (
    <Card shadow="xs" padding="md" radius="md">
      <Group align="center">
        <Image src={props.HometeamFlag} alt={props.homeTeam} width={50} height={50} />
        <Text>{props.homeTeam}</Text>
        <Text>{props.homeScore}</Text>
      </Group>
      <Group align="center">
        <Image src={props.AwayteamFlag} alt={props.awayTeam} width={50} height={50} />
        <Text>{props.awayTeam}</Text>
        <Text>{props.awayScore}</Text>
      </Group>
      <Group align="center">
        <Text>{props.date}</Text>
        <Badge>{props.tournament}</Badge>
      </Group>
      <Button>Read more</Button>
    </Card>
  );
}
