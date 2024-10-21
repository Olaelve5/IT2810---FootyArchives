import '../styles/App.css';
import '@mantine/core/styles.css';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import MatchCardCarousel from '../components/Carousel';
import Logo from '../components/BigLogo';
import classes from '../styles/Home/Home.module.css';
import DiscoverButton from '../components/DiscoverButton';

function Home() {
  return (
    <div className="layoutContainer">
      <SideBar />
      <div className="rightContainer">
        <div className="rightInnerContainer">
          <Navbar />
          <Logo />
          <DiscoverButton />
          <div className={classes.carouselSection}>
            <h2>Top teams</h2>
            <MatchCardCarousel />
          </div>
          <div className={classes.carouselSection}>
            <h2>Recent matchups</h2>
            <MatchCardCarousel />
          </div>
          <div className={classes.carouselSection} style={{border: 'none'}}>
            <h2>Biggest wins</h2>
            <MatchCardCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
