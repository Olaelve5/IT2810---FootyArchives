import { NavLink } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from '../../styles/SideBar/Sidebar.module.css';
import React, { useEffect, useState, cloneElement } from 'react';
import { useSidebarCollapseStore } from '../../stores/sidebar-collapse-store';

interface NavLinkItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: (value: string) => void;
  isDark: boolean;
  iconColor?: string;
  ariaLabel?: string;
}

// Component for the sidebar navigation links
export default function NavLinkItem({
  to,
  label,
  icon,
  selected,
  setSelected,
  isDark,
  iconColor,
  ariaLabel,
}: NavLinkItemProps) {
  // Clone the icon element and apply the color style
  const coloredIcon = cloneElement(icon as React.ReactElement, {
    style: { color: iconColor },
    className: classes.navLinkIcon,
  });

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { isCollapsed, setCollapsed } = useSidebarCollapseStore();

  // Update the window width state on resize
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  const handleClick = () => {
    setSelected(label);

    if (windowWidth < 900) {
      setCollapsed(true);
    }
  };

  return (
    <NavLink
      component={Link}
      to={to}
      label={label}
      leftSection={coloredIcon}
      color="primary"
      active={selected === label}
      variant="filled"
      onClick={handleClick}
      noWrap
      className={
        selected === label
          ? isDark
            ? classes.linkSelectedDark
            : classes.linkSelected
          : isDark
            ? classes.linkDark
            : classes.link
      }
      classNames={{
        label: isCollapsed ? classes.linkLabelCollapsed : classes.linkLabel,
        body: classes.linkLabelBody,
      }}
      id={selected === label ? classes.linkSelected : classes.link}
      aria-label={isCollapsed ? ariaLabel || label : undefined}
    />
  );
}
