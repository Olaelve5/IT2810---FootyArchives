import { Card, Image, Text, Group, useMantineTheme, useMantineColorScheme } from '@mantine/core';
import classes from '../../styles/Cards/CountryCard.module.css';
import Norge from '../../assets/Norge.png';

const Norway = {
  country: 'Norway',
  flag: Norge,
  totalGames: 130,
  wins: 100,
  draws: 20,
  losses: 10,
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
          width: '100%', // Adjust card width for better scaling
          height: 300, // Adjust card height to accommodate new text
          backgroundColor: colorScheme === 'dark' ? theme.colors.darkmode[0] : 'white',
          borderColor: colorScheme === 'dark' ? theme.colors.darkmode[0] : theme.colors.darkmode[0],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Group align="center" style={{ display: 'flex', }}>
          <Image src={Norway.flag} alt={Norway.country} width={180} height={180} />
          <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Text size="xl" style={{ fontWeight: 'bold' }}>
              {Norway.country}
            </Text>
            <Text size="md" color="#a9a9a9" style={{ marginBottom: '10px', marginTop: '15px' }}>
              {Norway.totalGames} games
            </Text>
            <Group align="center" style={{ justifyContent: 'center' }}>
              <Text size="sm" style={{ marginRight: '10px' }}>
                {Norway.wins} W
              </Text>
              <Text size="sm" style={{ marginRight: '10px' }}>
                {Norway.draws} D
              </Text>
              <Text size="sm">{Norway.losses} L</Text>
            </Group>
          </div>
        </Group>
      </Card>
    </div>
  );
}

export default CountryCard;
