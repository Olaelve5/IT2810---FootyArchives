import '../styles/App.css';
import '@mantine/core/styles.css';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import { MatchCard } from '../components/MatchCard';
import England from '../assets/England.png';
import Norge from '../assets/Norge.png';


function App() {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <SideBar />
      <div style={{ width: '100%' }}>
        <Navbar />
        <h1>Prosjekt 2</h1>
        <p>Velkommen til prosjekt</p>
        <MatchCard
          homeTeam={'Norway'}
          awayTeam={'England'}
          HometeamFlag={Norge}
          AwayteamFlag={England}
          homeScore={0}
          awayScore={0}
          date={'2002'}
          tournament={'World Cup'}
        />
      </div>
    </div>
  );
}

export default App;
