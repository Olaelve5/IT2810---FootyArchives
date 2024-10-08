import '../styles/App.css';
import '@mantine/core/styles.css';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';


function App() {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <SideBar />
      <div style={{ width: '100%' }}>
        <Navbar />
        <h1>Prosjekt 2</h1>
        <p>Velkommen til prosjekt</p>
      </div>
    </div>
  );
}

export default App;
