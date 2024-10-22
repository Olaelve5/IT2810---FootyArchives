import { Carousel } from '@mantine/carousel';
import { MatchCard } from './Cards/MatchCard';
import { CountryCard } from './Cards/CountryCard';
import classes from '../styles/Carousel.module.css';
import { GET_RESULTS } from '../graphql/queries';
import { GET_NATION_STATS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { ResultType } from '../types/Result';
import { useMantineColorScheme } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { QueryFilterType } from '../types/QueryFilterType';
import { QuerySortType } from '../types/QuerySortType';
import { NationType } from '../types/Nation';

interface MatchcardCarouselProps {
  filters?: QueryFilterType;
  sort?: QuerySortType;
  cardType: 'match' | 'team';
}

function MatchcardCarousel({ filters, sort, cardType }: MatchcardCarouselProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  let slides = [];

  // The limit for all carousels
  const LIMIT = 12;

  const query = cardType === 'team' ? GET_NATION_STATS : GET_RESULTS;

  const { loading, error, data } = useQuery(query, {
    variables: { filters, limit: LIMIT, sort },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p> Data not found</p>;
  }

  if (cardType === 'match') {
    slides = data?.results?.results?.map((result: ResultType) => {
      return (
        <Carousel.Slide key={result._id}>
          <MatchCard {...result} />
        </Carousel.Slide>
      );
    });
  } else {
    slides = data?.nationStats?.map((nation: NationType) => {
      return (
        <Carousel.Slide key={nation._id}>
          <CountryCard {...nation} />
        </Carousel.Slide>
      );
    });
  }

  return (
    <Carousel
      slideSize="1%"
      slideGap="lg"
      loop={false}
      align="start"
      slidesToScroll="auto"
      classNames={classes}
      styles={{
        control: {
          backgroundColor: isDark ? 'white' : theme.colors.darkmode[1],
          color: isDark ? '' : 'white',
        },
      }}
    >
      {slides}
    </Carousel>
  );
}

export default MatchcardCarousel;
