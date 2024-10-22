import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import Navbar from "../components/Navbar/Navbar";
import MatchcardCarousel from "../components/Carousel";
import classes from "../styles/Tournament/Tournament.module.css";
import { useSidebarCollapseStore } from "../stores/sidebar-collapse-store";



export default function Tournament() {
    const { tournamentName } = useParams<{ tournamentName: string }>();
    const { isCollapsed } = useSidebarCollapseStore();

    return (
      <div className="layoutContainer">
        <SideBar />
        <div id='rightContainer' className={isCollapsed ? "rightContainerCollapsed" : "rightContainerExpanded"}>
          <div className="rightInnerContainer">
            <Navbar />
            <h1>{tournamentName}</h1>
            <p>Info om {tournamentName}</p>{' '}
            <div className={classes.carouselSection}>
              <h2>2022</h2>
              <MatchcardCarousel />
            </div>
            <div className={classes.carouselSection}>
              <h2>2018</h2>
              <MatchcardCarousel />
            </div>
            <div className={classes.carouselSection}>
              <h2>2014</h2>
              <MatchcardCarousel />
            </div>
            {/* <DiscoverButton /> */}
          </div>
        </div>
      </div>
    );
}
