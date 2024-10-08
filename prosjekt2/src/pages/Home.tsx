import '../styles/App.css';
import '@mantine/core/styles.css';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import MatchCardCarousel from '../components/Carousel';



function App() {
  return (
    <div className='layoutContainer'>
      <SideBar />
      <div className='rightContainer'>
        <Navbar />
        <h1>Prosjekt 2</h1>
        <p>Velkommen til prosjekt</p>
          <MatchCardCarousel />
        </div>
      </div>
  );
}

export default App;
