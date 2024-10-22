import '../styles/App.css';
import '@mantine/core/styles.css';
import { Group, Image, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import MatchCardCarousel from '../components/Carousel';
import classes from '../styles/Home/Home.module.css';
import Norge from '../assets/Norge.png';
import { useSidebarCollapseStore } from '../stores/sidebar-collapse-store';

const Norway = {
  country: 'Norway',
  flag: Norge,
  totalGames: 130,
  wins: 100,
  draws: 20,
  losses: 10,
};

function Country() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const { isCollapsed } = useSidebarCollapseStore();

  const totalGamesColor = colorScheme === 'dark' ? '#a9a9a9' : theme.colors.dark[6];
  return (
    <div className="layoutContainer">
      <SideBar />
      <div id='rightContainer' className={isCollapsed ? "rightContainerCollapsed" : "rightContainerExpanded"}>
        <div className="rightInnerContainer">
          <Navbar />
          <div
            className={classes.countryContainer}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '6rem',
            }}
          >
            <Group align="center" style={{ display: 'flex', margin: '20px' }}>
              <Image src={Norway.flag} alt={Norway.country} width={170} height={170} />
              <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Text size="xl" style={{ fontWeight: 'bold' }}>
                  {Norway.country}
                </Text>
                <Text size="lg" style={{ color: totalGamesColor, marginBottom: '10px', marginTop: '15px' }}>
                  {Norway.totalGames} games
                </Text>
                <Group align="center" style={{ justifyContent: 'center' }}>
                  <Text size="md" style={{ marginRight: '10px' }}>
                    {Norway.wins} W
                  </Text>
                  <Text size="md" style={{ marginRight: '10px' }}>
                    {Norway.draws} D
                  </Text>
                  <Text size="md">{Norway.losses} L</Text>
                </Group>
              </div>
            </Group>
          </div>
          <div className={classes.carouselSection}>
            <h2>Recent matchups</h2>
            <MatchCardCarousel />
          </div>
          <div className={classes.carouselSection}>
            <h2>Biggest wins</h2>
            <MatchCardCarousel />
          </div>
          <div className={classes.carouselSection}>
            <h2>Worst defeats</h2>
            <MatchCardCarousel />
          </div>
          {/* <DiscoverButton /> */}
        </div>
      </div>
    </div>
  );
}

export default Country;
