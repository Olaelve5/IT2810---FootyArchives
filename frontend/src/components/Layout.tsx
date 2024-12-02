import React from 'react';
import Navbar from './Navbar/Navbar';
import SideBar from './SideBar/SideBar';
import { useSidebarCollapseStore } from './../stores/sidebar-collapse-store';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isCollapsed } = useSidebarCollapseStore();

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