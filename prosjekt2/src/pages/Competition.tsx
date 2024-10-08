import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import Navbar from "../components/Navbar/Navbar";


export default function Competition() {
    const { competition } = useParams<{ competition: string }>();

    const getCleanName = () => {
        if (competition === undefined) {
            return '';
        }
        return competition.replace(/-/g, ' ');
    }

    return (
        <div className='layoutContainer'>
          <SideBar />
          <div className='leftContainer'>
            <Navbar />
            <h1>{getCleanName()}</h1>
            <p>Info om {getCleanName()}</p> 
          </div>
        </div>
      );
}
