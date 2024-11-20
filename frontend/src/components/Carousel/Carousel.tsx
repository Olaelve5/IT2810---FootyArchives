import { Carousel } from '@mantine/carousel';
import { MatchCard } from '../Cards/MatchCard';
import NationCard from '../Cards/NationCard';
import classes from '../../styles/Carousel.module.css';
import { useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { ResultType } from '../../types/ResultType';
import { NationType } from '../../types/NationType';
import { ApolloError } from '@apollo/client';
import { Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useLanguageStore } from '../../stores/language-store';

interface MatchcardCarouselProps {
  titleEn: string;
  titleNo: string;
  data: ResultType[] | NationType[];
  cardType: 'match' | 'team';
  loading?: boolean;
  error?: ApolloError;
}

function MatchcardCarousel({ data, cardType, loading, error, titleEn, titleNo }: MatchcardCarouselProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [slides, setSlides] = useState<JSX.Element[]>([]);
  const { language } = useLanguageStore();

  useEffect(() => {
    const newSlides = data?.map((item) => (
      <Carousel.Slide key={item._id}>
        {cardType === 'team' ? <NationCard {...(item as NationType)} /> : <MatchCard {...(item as ResultType)} />}
      </Carousel.Slide>
    ));
    setSlides(newSlides);
  }, [data, cardType]);

  if (error) {
    console.error(error);
    return <div>Error fetching data</div>;
  }

  return (
    <div className={classes.topContainer}>
      <h2 className={classes.title}>{language === 'en' ? titleEn : titleNo}</h2>
      {loading && <Loader size={25} color={theme.colors.primary[5]} />}
      <Carousel
        key={titleEn} 
        slideSize="1%"
        slideGap="1.8rem"
        loop={false}
        align="start"
        slidesToScroll="auto"
        controlsOffset="0"
        classNames={classes}
        styles={{
          control: {
            backgroundColor: isDark ? 'white' : 'white',
            borderColor: isDark ? 'white' : 'black',
            borderWidth: '1px',
            borderStyle: 'solid',
            color: isDark ? '' : 'black',
            '&:hover': {
              backgroundColor: isDark ? theme.colors.gray[2] : theme.colors.darkmode[2],
            },
          },
        }}
      >
        {slides}
      </Carousel>
    </div>
  );
}

export default MatchcardCarousel;
