import '../styles/App.css';
import '@mantine/core/styles.css';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import MatchCardCarousel from '../components/Carousel';
import Logo from '../components/BigLogo';
import classes from '../styles/Home/Home.module.css';
import  CountryCard  from '../components/Cards/CountryCard';


function Country() {
  return (
    <div className="layoutContainer">
      <SideBar />
      <div className="rightContainer">
        <div className="rightInnerContainer">
          <Navbar />
          <CountryCard />
          <div className={classes.carouselSection}>
            <h2>Recent matchups</h2>
            <MatchCardCarousel />
          </div>
          <div className={classes.carouselSection}>
            <h2>Biggest wins</h2>
            <MatchCardCarousel />
          </div>
          <div className={classes.carouselSection}>
            <h2>Worst defeats</h2>
            <MatchCardCarousel />
          </div>
          {/* <DiscoverButton /> */}
        </div>
      </div>
    </div>
  );
}

export default Country;
