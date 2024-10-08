import MatchDetails from '../components/Matchup/MatchDetails';
import MatchScore from '../components/Matchup/MatchScore';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import MatchScorers from '../components/Matchup/MatchScorers';

export default function Matchup() {
  return (
    <div className="layoutContainer">
      <SideBar />
      <div className="rightContainer">
        <Navbar />
        <MatchDetails />
        <MatchScore />
        <MatchScorers />
      </div>
    </div>
  );
}
