import { Link } from 'react-router-dom';
import classes from '../../styles/Nation/Rival.module.css';
import { useLanguageStore } from '../../stores/language-store';
import { getCountryCode } from '../../utils/imageUtils';

interface RivalProps {
  rivalEn: string;
  rivalNO: string;
}

function Rival({ rivalEn, rivalNO }: RivalProps) {
  const { language } = useLanguageStore();
  return (
    <div className={classes.container}>
      <p className={classes.title}>{language == 'no' ? 'Rivalnasjon' : 'Rival nation'}</p>
      <Link to={`/project2/nation/${rivalEn}`}>
        <div className={classes.flagNameContainer}>
          <div className="flagImageContainer">
            <span className={`fi fi-${getCountryCode([rivalEn])}`} id="flagImage"></span>
          </div>
          <h3>{language == 'no' ? rivalNO : rivalEn}</h3>
        </div>
      </Link>
    </div>
  );
}

export default Rival;
