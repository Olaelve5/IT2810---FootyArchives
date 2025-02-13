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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const newSlides = data?.map((item) => (
      <Carousel.Slide key={item._id}>
        {cardType === 'team' ? <NationCard {...(item as NationType)} /> : <MatchCard {...(item as ResultType)} />}
      </Carousel.Slide>
    ));
    setSlides(newSlides);
  }, [data, cardType]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    setFilterCount(count);

    setLastQueriedFilters(filters ? filters : {});
    setPage(1);
    navigate('/project2/matchups');
  };

  return (
    <div className={classes.topContainer}>
      <div className={classes.headerContainer}>
        <h2 className={classes.title}>{language === 'en' ? titleEn : titleNo}</h2>
        {(filters || sort) && slides.length > 0 && (
          <Button
            radius="xl"
            variant="light"
            color="white"
            size="sm"
            aria-label={language === 'en' ? `See more matches in ${titleEn}` : `Se flere kamper i ${titleNo}`}
            onClick={handleSeeMoreClick}
            className={isDark ? classes.seeMoreButtonDark : classes.seeMoreButtonLight}
          >
            {language === 'en' ? 'See more' : 'Se mer'}
          </Button>
        )}
      </div>
      {loading && <Loader size={25} color={theme.colors.primary[5]} />}
      {slides.length === 0 && !loading && (
        <p className={classes.noDataText}>{language === 'en' ? 'No data found' : 'Ingen data funnet'}</p>
      )}
      <Carousel
        key={titleEn}
        slideSize={windowWidth < 480 ? '100%' : 'auto'}
        slideGap="1.5rem"
        slidesToScroll="auto"
        controlsOffset="0"
        align={windowWidth < 480 ? 'center' : 'start'}
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
