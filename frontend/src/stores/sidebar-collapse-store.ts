import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

// Define the type for the sidebar collapse state
interface SideBarCollapseState {
  isCollapsed: boolean;
  setCollapsed: (isCollapsed: boolean) => void;
}

// Define the type for the persist configuration
type SidebarPersist = (
  config: (set: (partial: Partial<SideBarCollapseState>) => void) => SideBarCollapseState,
  options: PersistOptions<SideBarCollapseState>
) => (set: (partial: Partial<SideBarCollapseState>) => void) => SideBarCollapseState;


// Create a store for the sidebar collapse state
export const useSidebarCollapseStore = create<SideBarCollapseState>(
  (persist as unknown as SidebarPersist)(
    (set) => ({
      isCollapsed: false,
      setCollapsed: (isCollapsed: boolean) => set({ isCollapsed }),
    }),
    {
      name: 'sidebar-collapse-storage',
    }
  )
);
