import '../styles/App.css';
import '@mantine/core/styles.css';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import MatchCardCarousel from '../components/Carousel';
import Logo from '../components/BigLogo';

function Home() {
  return (
    <div className="layoutContainer">
      <SideBar />
      <div className="rightContainer">
        <div className="rightInnerContainer">
          <Navbar />
          <Logo />
          <MatchCardCarousel />
        </div>
      </div>
    </div>
  );
}

export default Home;
