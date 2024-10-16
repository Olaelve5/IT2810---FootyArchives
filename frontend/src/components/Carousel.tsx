import { Carousel } from '@mantine/carousel';
import { MatchCard } from './Cards/MatchCard';
import classes from '../styles/Carousel.module.css';
import { GET_RESULTS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { ResultType } from '../types/Result';

function MatchcardCarousel() {
  const { loading, error, data } = useQuery(GET_RESULTS, {
    variables: { amount: 12 },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p> Data not found</p>;
  }

  const slides = data.results.map((result: ResultType) => {
    return (
      <Carousel.Slide key={result._id}>
        <MatchCard {...result} />
      </Carousel.Slide>
    );
  });

  return (
    <Carousel
      containScroll="keepSnaps"
      controlSize={30}
      slideSize="1%"
      slideGap="xl"
      loop={false}
      align="start"
      slidesToScroll="auto"
      classNames={classes}
    >
      {slides}
    </Carousel>
  );
}

export default MatchcardCarousel;
