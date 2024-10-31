import { getCountryCode } from '../../utils/imageUtils';
import { Link } from 'react-router-dom';
import classes from '../../styles/Nation/Rival.module.css';

interface RivalProps {
  rivalNation: string;
}

function Rival({ rivalNation }: RivalProps) {
  return (
    <div className={classes.container}>
      <p className={classes.title}>Rival nation</p>
      <Link to={`/project2/nation/${rivalNation}`}>
        <div className={classes.flagNameContainer}>
          <div className="flagImageContainer">
            <span className={`fi fi-${getCountryCode([rivalNation])}`} id="flagImage"></span>
          </div>
          <h3>{rivalNation}</h3>
        </div>
      </Link>
    </div>
  );
}

export default Rival;
