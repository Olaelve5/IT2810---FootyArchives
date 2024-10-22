import { create } from 'zustand';

interface SideBarCollapseState {
    isCollapsed: boolean;
    setCollapsed: (isCollapsed: boolean) => void;
}

export const useSidebarCollapseStore = create<SideBarCollapseState>((set) => ({
    isCollapsed: false,
    setCollapsed: (isCollapsed: boolean) => set({ isCollapsed }),
}));