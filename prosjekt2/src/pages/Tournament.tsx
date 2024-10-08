import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import Navbar from "../components/Navbar/Navbar";


export default function Tournament() {
    const { tournamentName } = useParams<{ tournamentName: string }>();

    return (
        <div className='layoutContainer'>
          <SideBar />
          <div className='leftContainer'>
            <Navbar />
            <h1>{tournamentName}</h1>
            <p>Info om {tournamentName}</p> 
          </div>
        </div>
      );
}
