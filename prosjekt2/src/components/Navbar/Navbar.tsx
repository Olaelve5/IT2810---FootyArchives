import Searchbar from "./Searchbar";
import ColorSchemeBtn from "./ColorSchemeBtn";
import classes from "../../styles/Navbar.module.css";

export default function Navbar() {

  return (
    <nav
    className={classes.container}
    >
      <Searchbar />
      <ColorSchemeBtn />
    </nav>
  );
}