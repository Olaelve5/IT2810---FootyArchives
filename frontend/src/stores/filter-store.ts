import { QueryFilterType } from '../types/QueryFilterType';
import { YearRange } from './../../../backend/src/types/FiltersType';
import { create } from 'zustand';

export interface FilterState {
  selectedTeams: string[];
  setSelectedTeams: (selectedTeams: string[]) => void;

  yearRange: YearRange;
  setYearRange: (yearRange: YearRange) => void;

  selectedTournaments: string[];
  setSelectedTournaments: (selectedTournaments: string[]) => void;

  exclusive: boolean;
  setExclusive: (exclusive: boolean) => void;

  filterCount: number;
  setFilterCount: (filterCount: number) => void;

  lastQueriedFilters: QueryFilterType | null;
  setLastQueriedFilters: (filters: QueryFilterType) => void;

  // Function to reset all filters
  resetFilters: () => void;
}

// Create a store for the filters
export const useFilterStore = create<FilterState>((set) => ({
  selectedTeams: [],
  setSelectedTeams: (selectedTeams: string[]) => set({ selectedTeams }),

  yearRange: { startYear: 1872, endYear: 2024 },
  setYearRange: (yearRange: YearRange) => set({ yearRange }),

  selectedTournaments: [],
  setSelectedTournaments: (selectedTournaments: string[]) => set({ selectedTournaments }),

  exclusive: false,
  setExclusive: (exclusive: boolean) => set({ exclusive }),

  filterCount: 0,
  setFilterCount: (filterCount: number) => set({ filterCount }),

  lastQueriedFilters: null,
  setLastQueriedFilters: (filters: QueryFilterType) => set({ lastQueriedFilters: filters }),

  resetFilters: () =>
    set({
      selectedTeams: [],
      yearRange: { startYear: 1872, endYear: 2024 },
      selectedTournaments: [],
      exclusive: false,
    }),
}));
