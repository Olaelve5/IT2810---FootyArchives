import MatchDetails from '../components/Matchup/MatchDetails';
import MatchScore from '../components/Matchup/MatchScore';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import MatchScorers from '../components/Matchup/MatchScorers';
import MatchComments from '../components/Matchup/MatchComments';
import { Group } from '@mantine/core';

export default function Matchup() {
  return (
    <div className="layoutContainer">
      <SideBar />
      <div className="rightContainer">
        <div className='rightInnerContainer'>
          <Navbar />
          <Group gap={10}>
            <MatchDetails />
            <MatchScore />
            <MatchScorers />
            <MatchComments />
          </Group>
        </div>
      </div>
    </div>
  );
}
