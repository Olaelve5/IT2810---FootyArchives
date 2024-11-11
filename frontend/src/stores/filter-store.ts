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
}));
