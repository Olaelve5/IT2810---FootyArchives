import { Carousel } from '@mantine/carousel';
import { MatchCard } from './Cards/MatchCard';
import classes from '../styles/Carousel.module.css';
import { GET_RESULTS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { ResultType } from '../types/Result';
import { useMantineColorScheme } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';

function MatchcardCarousel() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const { loading, error, data } = useQuery(GET_RESULTS, {
    variables: {sort : {field: "date", order: -1}, limit: 10},
  });

  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p> Data not found</p>;
  }

  const slides = data.results.results.map((result: ResultType) => {
    return (
      <Carousel.Slide key={result._id}>
        <MatchCard {...result} />
      </Carousel.Slide>
    );
  });

  return (
    <Carousel
      slideSize="1%"
      slideGap="lg"
      loop={false}
      align="start"
      slidesToScroll="auto"
      classNames={classes}
      styles={{ control: {
        backgroundColor: isDark ? 'white' : theme.colors.darkmode[1],
        color: isDark ? '' : 'white',
      } }}
    >
      {slides}
    </Carousel>
  );
}

export default MatchcardCarousel;
