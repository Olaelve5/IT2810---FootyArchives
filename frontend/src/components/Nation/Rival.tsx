import { getCountryCode } from '../../utils/imageUtils';
import { Link } from 'react-router-dom';
import classes from '../../styles/Nation/Rival.module.css';
import { useLanguageStore } from '../../stores/language-store';
import { getNorwegianName } from '../../utils/translationUtils';

interface RivalProps {
  rivalNation: string;
}

function Rival({ rivalNation }: RivalProps) {
  const { language } = useLanguageStore();
  return (
    <div className={classes.container}>
      <p className={classes.title}>{language == 'no' ? 'Rivalnasjon' : 'Rival nation'}</p>
      <Link to={`/project2/nation/${rivalNation}`}>
        <div className={classes.flagNameContainer}>
          <div className="flagImageContainer">
            <span className={`fi fi-${getCountryCode([rivalNation])}`} id="flagImage"></span>
          </div>
          <h3>{language == 'no' ? getNorwegianName(rivalNation) : rivalNation}</h3>
        </div>
      </Link>
    </div>
  );
}

export default Rival;
