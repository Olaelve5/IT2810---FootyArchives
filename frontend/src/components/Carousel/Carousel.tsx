import { Carousel } from '@mantine/carousel';
import { MatchCard } from '../Cards/MatchCard';
import NationCard from '../Cards/NationCard';
import classes from '../../styles/Carousel.module.css';
import { Button, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { ResultType } from '../../types/ResultType';
import { NationType } from '../../types/NationType';
import { ApolloError } from '@apollo/client';
import { Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useLanguageStore } from '../../stores/language-store';
import { useNavigate } from 'react-router-dom';
import { QueryFilterType } from '../../types/QueryFilterType';
import { useFilterStore } from '../../stores/filter-store';
import { calculateFilterCount } from '../../utils/filterUtils';
import { QuerySortType } from '../../types/QuerySortType';

interface MatchcardCarouselProps {
  titleEn: string;
  titleNo: string;
  data: ResultType[] | NationType[];
  cardType: 'match' | 'team';
  loading?: boolean;
  error?: ApolloError;
  filters?: QueryFilterType;
  sort?: QuerySortType;
}

function MatchcardCarousel({
  data,
  cardType,
  loading,
  error,
  titleEn,
  titleNo,
  filters,
  sort,
}: MatchcardCarouselProps) {
  const { setPage, setLastQueriedFilters, setFilterCount } = useFilterStore();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [slides, setSlides] = useState<JSX.Element[]>([]);
  const { language } = useLanguageStore();
  const navigate = useNavigate();

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

  const handleSeeMoreClick = () => {
    // Set the filters in the store
    useFilterStore.setState({
      selectedTeams: filters?.teams || [],
      selectedTournaments: filters?.tournaments || [],
      yearRange: filters?.yearRange || { startYear: 1872, endYear: 2024 },
      exclusive: filters?.exclusive || false,
      sort: sort || undefined,
    });

    // Calculate the filter count
    const count = calculateFilterCount(filters ? filters : {});
    console.log(count, filters);
    setFilterCount(count);

    setLastQueriedFilters(filters ? filters : {});
    setPage(1);
    navigate('/project2/matchups');
  };

  return (
    <div className={classes.topContainer}>
      <div className={classes.headerContainer}>
        <h2 className={classes.title}>{language === 'en' ? titleEn : titleNo}</h2>
        {(filters || sort) && (
          <Button
            radius="xl"
            variant="light"
            color="white"
            size="sm"
            aria-label={`See more matches in ${titleEn}`}
            onClick={handleSeeMoreClick}
            className={classes.seeMoreButton}
          >
            {language === 'en' ? 'See more' : 'Se mer'}
          </Button>
        )}
      </div>
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
