import '../styles/App.css';
import '@mantine/core/styles.css';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import MatchCardCarousel from '../components/Carousel';
import Logo from '../components/BigLogo';
import classes from '../styles/Home.module.css';

function Home() {
  return (
    <div className="layoutContainer">
      <SideBar />
      <div className="rightContainer">
        <div className="rightInnerContainer">
          <Navbar />
          <Logo />
          <div className={classes.carouselSection}>
            <h2>Recent results</h2>
            <MatchCardCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
