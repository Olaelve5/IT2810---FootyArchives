import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import Filters from '../components/Filters/Filters';
import { useLanguageStore } from '../stores/language-store';
import MatchupsGrid from '../components/MatchupGrid/MatchupsGrid';

export default function Matchups() {
  const language = useLanguageStore((state) => state.language);
  return (
    <div className="layoutContainer">
      <SideBar />
      <div className="rightContainer">
        <div className="rightInnerContainer">
          <Navbar />
          <h2>Matchups</h2>
          <p>{language === 'en' ? 'Search and filter through all matchups' : 'Søk og filtrer gjennom alle kamper'}</p>
          <Filters />
          <MatchupsGrid />
        </div>
      </div>
    </div>
  );
}
