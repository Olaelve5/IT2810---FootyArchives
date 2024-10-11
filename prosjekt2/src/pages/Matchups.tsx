import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';

export default function Matchups() {
  return (
    <div className="layoutContainer">
      <SideBar />
      <div className="rightContainer">
        <div className="rightInnerContainer">
          <Navbar />
            <h2>Matchups</h2>
            <p>Here you can find all the matchups for the tournament.</p>
        </div>
      </div>
    </div>
  );
}
