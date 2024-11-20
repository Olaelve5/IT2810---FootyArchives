import Searchbar from './Searchbar';
import ColorSchemeBtn from './ColorSchemeBtn';
import classes from '../../styles/Navbar/Navbar.module.css';
import LanguageButton from './LanguageButton';
import Logo from '../SideBar/Logo';
import SideBarCollapse from './SideBarCollapse';

export default function Navbar() {
  return (
    <nav className={classes.container}>
      <div className={classes.logoSearchBarContainer}>
        <div className={classes.logoContainer}>
          <SideBarCollapse />
          <Logo />
        </div>
        <div className={classes.searchbarContainer}>
          <Searchbar />
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <ColorSchemeBtn />
        <LanguageButton />
      </div>
    </nav>
  );
}
