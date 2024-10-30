import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import Filters from '../components/Filters/Filters';
import { useLanguageStore } from '../stores/language-store';
import MatchupsGrid from '../components/MatchupGrid/MatchupsGrid';
import { useSidebarCollapseStore } from '../stores/sidebar-collapse-store';
import { useEffect } from 'react';

export default function Matchups() {
  const language = useLanguageStore((state) => state.language);
  const { isCollapsed } = useSidebarCollapseStore();

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="layoutContainer">
      <SideBar />
      <div id="rightContainer" className={isCollapsed ? 'rightContainerCollapsed' : 'rightContainerExpanded'}>
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
