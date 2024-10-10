import { Card, Image, Text, Group, useMantineTheme, useMantineColorScheme } from '@mantine/core';
import classes from '../../styles/Cards/CountryCard.module.css';
import Norge from '../../assets/Norge.png';

const Norway = {
  country: 'Norway',
  flag: Norge,
  totalGames: 862,
  wins: 531,
  draws: 109,
  losses: 222,
};

export function CountryCard() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  return (
    <div className={classes.container}>
      <Card
        shadow="xl"
        padding="xs"
        radius="md"
        style={{
          width: '24%', // Adjust card width for better scaling
          height: 150, // Adjust card height to accommodate new text
          backgroundColor: colorScheme === 'dark' ? theme.colors.darkmode[2] : 'white',
          borderColor: colorScheme === 'dark' ? theme.colors.darkmode[3] : theme.colors.darkmode[6],
        }}
      >
        {/* Top section: Flag and Country Name */}
        <Group align="center" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Image src={Norway.flag} alt={Norway.country} width={55} height={55} />
          <Text size="xl" style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            {Norway.country}
          </Text>
        </Group>

        {/* Middle section: Total games played */}
        <Text size="md" color="#a9a9a9" style={{ marginBottom: '10px', marginTop: '15px' }}>
          {Norway.totalGames} games
        </Text>

        {/* Bottom section: Wins, Draws, and Losses */}
        <Group align="center" style={{ justifyContent: 'center' }}>
          <Text size="sm">{Norway.wins} W</Text>
          <Text size="sm">{Norway.draws} D</Text>
          <Text size="sm">{Norway.losses} L</Text>
        </Group>
      </Card>
    </div>
  );
}

export default CountryCard;
