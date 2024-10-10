import { Carousel } from '@mantine/carousel';
import { MatchCard } from './Cards/MatchCard';
import England from '../assets/England.png';
import Norge from '../assets/Norge.png';
import classes from '../styles/Carousel.module.css';

const matchCard1 = {
  homeTeam: 'Norway',
  awayTeam: 'England',
  HometeamFlag: Norge,
  AwayteamFlag: England,
  homeScore: 0,
  awayScore: 0,
  date: '2002',
  tournament: 'World Cup',
};

const matchCard2 = {
  homeTeam: 'Norway',
  awayTeam: 'England',
  HometeamFlag: Norge,
  AwayteamFlag: England,
  homeScore: 1,
  awayScore: 2,
  date: '2006',
  tournament: 'Euro Cup',
};

const matchCard3 = {
  homeTeam: 'Norway',
  awayTeam: 'England',
  HometeamFlag: Norge,
  AwayteamFlag: England,
  homeScore: 1,
  awayScore: 7,
  date: '2014',
  tournament: 'World Cup',
};

const matchCard4 = {
  homeTeam: 'Norway',
  awayTeam: 'England',
  HometeamFlag: Norge,
  AwayteamFlag: England,
  homeScore: 0,
  awayScore: 1,
  date: '2016',
  tournament: 'Euro Cup',
};

const matchCard5 = {
  homeTeam: 'Norway',
  awayTeam: 'England',
  HometeamFlag: Norge,
  AwayteamFlag: England,
  homeScore: 2,
  awayScore: 3,
  date: '2018',
  tournament: 'Copa America',
};
const matchCard6 = {
  homeTeam: 'Norway',
  awayTeam: 'England',
  HometeamFlag: Norge,
  AwayteamFlag: England,
  homeScore: 4,
  awayScore: 3,
  date: '2020',
  tournament: 'Copa America',
};
const matchCard7 = {
  homeTeam: 'Norway',
  awayTeam: 'England',
  HometeamFlag: Norge,
  AwayteamFlag: England,
  homeScore: 4,
  awayScore: 3,
  date: '2020',
  tournament: 'Copa America',
};

function MatchcardCarousel() {
  
  return (
    <Carousel
      controlSize={30}
      slideSize="33%"
      slideGap="xs"
      loop={false}
      align="start"
      slidesToScroll={3}
      classNames={classes}
    >
      <Carousel.Slide>
        <MatchCard {...matchCard1} />
      </Carousel.Slide>
      <Carousel.Slide>
        <MatchCard {...matchCard2} />
      </Carousel.Slide>
      <Carousel.Slide>
        <MatchCard {...matchCard3} />
      </Carousel.Slide>
      <Carousel.Slide>
        <MatchCard {...matchCard4} />
      </Carousel.Slide>
      <Carousel.Slide>
        <MatchCard {...matchCard5} />
      </Carousel.Slide>
      <Carousel.Slide>
        <MatchCard {...matchCard6} />
      </Carousel.Slide>
      <Carousel.Slide>
        <MatchCard {...matchCard7} />
      </Carousel.Slide>
    </Carousel>
  );
}

export default MatchcardCarousel;
