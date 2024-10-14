import { Carousel } from '@mantine/carousel';
import { MatchCard } from './Cards/MatchCard';
import England from '../assets/England.png';
import Norge from '../assets/Norge.png';
import classes from '../styles/Carousel.module.css';
import { GET_RESULTS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { ResultType } from '../types/Result';



function MatchcardCarousel() {
  const {loading, error, data} = useQuery(GET_RESULTS, {
    variables: {amount: 10}
  })

  if(loading || error) {
    return null;
  }

  const slides = data.results.map((result: ResultType) => {
    return (
      <Carousel.Slide key={result._id}>
        <MatchCard
          _id={result._id}
          home_team={result.home_team}
          away_team={result.away_team}
          home_score={result.home_score}
          HometeamFlag={England}
          AwayteamFlag={Norge}
          away_score={result.away_score}
          tournament={result.tournament}
          city={result.city}
          country={result.country}
          neutral={result.neutral}
          date={result.date}
        />
      </Carousel.Slide>
    )
  })


  
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
      {slides}
    </Carousel>
  );
}

export default MatchcardCarousel;
