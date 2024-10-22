import { Card, Text, useMantineTheme, useMantineColorScheme } from '@mantine/core';
import classes from '../../styles/Cards/CountryCard.module.css';
import { NationType } from '../../types/Nation';


export function CountryCard(props: NationType) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  return (
    <div className={classes.container}>
      <Card
        shadow="xl"
        padding="xs"
        radius="md"
        style={{
          width: '100%', // Adjust card width for better scaling
          height: 300, // Adjust card height to accommodate new text
          backgroundColor: colorScheme === 'dark' ? theme.colors.darkmode[0] : 'white',
          borderColor: colorScheme === 'dark' ? theme.colors.darkmode[0] : theme.colors.darkmode[0],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>{props._id}</Text>
        <Text>{props.total_team_wins}</Text>
      </Card>
    </div>
  );
}

export default CountryCard;
