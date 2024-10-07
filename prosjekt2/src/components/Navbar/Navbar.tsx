import Searchbar from "./Searchbar";
import ColorSchemeBtn from "./ColorSchemeBtn";
import Logo from "./Logo";
import classes from "../../styles/Navbar.module.css";

export default function Navbar() {

  return (
    <nav
    className={classes.container}
    >
        <Logo />
      <Searchbar />
      <ColorSchemeBtn />
    </nav>
  );
}