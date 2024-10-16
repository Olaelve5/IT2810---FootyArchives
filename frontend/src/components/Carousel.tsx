import { Carousel } from '@mantine/carousel';
import { MatchCard } from './Cards/MatchCard';
import classes from '../styles/Carousel.module.css';
import { GET_RESULTS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { ResultType } from '../types/Result';
import { useCallback, useEffect, useRef, useState } from 'react';

function MatchcardCarousel() {
  const [showGradient, setShowGradient] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { loading, error, data } = useQuery(GET_RESULTS, {
    variables: { amount: 12 },
  });

  const handleScroll = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowGradient(scrollLeft + clientWidth < scrollWidth);
      console.log(showGradient);
    }
  }, [showGradient]);

  useEffect(() => {
    const carouselNode = carouselRef.current; // Copy the ref value to a local variable
    handleScroll(); // Initial check
    if (carouselNode) {
      carouselNode.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (carouselNode) {
        carouselNode.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

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
      ref={carouselRef}
      slideSize="1%"
      slideGap="lg"
      loop={false}
      align="start"
      slidesToScroll="auto"
      classNames={classes}
      onSlideChange={(index) => console.log(index)}
    >
      {slides}
    </Carousel>
  );
}

export default MatchcardCarousel;
