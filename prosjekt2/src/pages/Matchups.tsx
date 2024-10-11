import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import Filters from '../components/Filters/Filters';

export default function Matchups() {
  return (
    <div className="layoutContainer">
      <SideBar />
      <div className="rightContainer">
        <div className="rightInnerContainer">
          <Navbar />
            <h2>Matchups</h2>
            <p>Here you can find all the matchups for the tournament.</p>
            <Filters />
        </div>
      </div>
    </div>
  );
}
