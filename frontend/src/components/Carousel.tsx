import { Carousel } from '@mantine/carousel';
import { MatchCard } from './Cards/MatchCard';
import NationCard from './Cards/NationCard';
import classes from '../styles/Carousel.module.css';
import { useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { ResultType } from '../types/Result';
import { NationType } from '../types/Nation';
import { ApolloError } from '@apollo/client';
import { Loader } from '@mantine/core';

interface MatchcardCarouselProps {
  title: string;
  data: ResultType[] | NationType[];
  cardType: 'match' | 'team';
  loading?: boolean;
  error?: ApolloError;
}

function MatchcardCarousel({ data, cardType, loading, error, title }: MatchcardCarouselProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const slides = data?.map((item) => {
    return (
      <Carousel.Slide key={item._id}>
        {cardType === 'team' ? <NationCard {...(item as NationType)} /> : <MatchCard {...(item as ResultType)} />}
      </Carousel.Slide>
    );
  });

  if (error) {
    console.error(error);
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h2 className={classes.title}>{title}</h2>
      {loading && <Loader size={25} color={theme.colors.primary[5]}/>}
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
    </div>
  );
}

export default MatchcardCarousel;
