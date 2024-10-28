import MatchDetails from '../components/Matchup/MatchDetails';
import MatchScore from '../components/Matchup/MatchScore';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import MatchScorers from '../components/Matchup/MatchScorers';
import MatchComments from '../components/Matchup/MatchComments';
import { useNavigate } from 'react-router-dom';
import { Group } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { GET_RESULT } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useSidebarCollapseStore } from '../stores/sidebar-collapse-store';

export default function Result() {
  const navigate = useNavigate();
  const { resultId } = useParams<{ resultId: string }>();
  const { isCollapsed } = useSidebarCollapseStore();
  const { loading, error, data } = useQuery(GET_RESULT, {
    variables: { id: resultId },
  });
  
  const result = data?.result;

  if (loading) return <p>Loading...</p>;
  if (error) return navigate('/project2/not-found');

  return (
    <div className="layoutContainer">
      <SideBar />
      <div id='rightContainer' className={isCollapsed ? "rightContainerCollapsed" : "rightContainerExpanded"}>
        <div className="rightInnerContainer">
          <Navbar />
          <Group gap={10}>
            <MatchDetails {...result} />
            <MatchScore {...result} />
            <MatchScorers home_team={result.home_team} away_team={result.away_team} date={result.date} />
            <MatchComments result={result}/>
          </Group>
        </div>
      </div>
    </div>
  );
}
