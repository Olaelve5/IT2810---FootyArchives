import React from 'react';
import Navbar from './Navbar/Navbar';
import SideBar from './SideBar/SideBar';
import { useSidebarCollapseStore } from './../stores/sidebar-collapse-store';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isCollapsed } = useSidebarCollapseStore();
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  // Update the window width state on resize
  React.useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  // Set or remove the no-scroll class on the body element
  React.useEffect(() => {
    if (!isCollapsed && windowWidth < 780) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isCollapsed, windowWidth]);

  return (
    <div className="layoutContainer">
      <SideBar />
      <div id="rightContainer" className={isCollapsed ? 'rightContainerCollapsed' : 'rightContainerExpanded'}>
        <div className="rightInnerContainer">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
