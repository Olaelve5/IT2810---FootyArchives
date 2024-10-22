import Searchbar from './Searchbar';
import ColorSchemeBtn from './ColorSchemeBtn';
import classes from '../../styles/Navbar/Navbar.module.css';
import LanguageButton from './LanguageButton';
import SideBarCollapse from './SideBarCollapse';

export default function Navbar() {
  return (
    <nav className={classes.container}>
      <div className={classes.searchbarContainer}>
        <SideBarCollapse />
        <Searchbar />
      </div>
      <div className={classes.buttonContainer}>
        <ColorSchemeBtn />
        <LanguageButton />
      </div>
    </nav>
  );
}
