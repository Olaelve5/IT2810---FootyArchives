import CountryFilter from './CountryFilter';
import TournamentFilter from './TournamentFilter';
import YearFilter from './YearFilter';
import classes from '../../styles/Filters/Filters.module.css';
// import YearsInput from './YearsInput';
import { useState } from 'react';
import GoalFilter from './GoalFilter';

// No real logic implemented in these components so far, only some state management
export default function Filters() {
  const [rangeValue, setRangeValue] = useState<[number, number]>([1872, 2024]);
  const [endValue, setEndValue] = useState<[number, number]>([1872, 2024]);

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <CountryFilter />
        <YearFilter
          endValue={endValue}
          rangeValue={rangeValue}
          setRangeValue={setRangeValue}
          setEndValue={setEndValue}
        />
      </div>
      <div className={classes.innerContainer}>
        <TournamentFilter />
        <GoalFilter />
      </div>
    </div>
  );
}
