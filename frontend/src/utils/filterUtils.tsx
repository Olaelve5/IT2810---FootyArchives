import { isEmpty } from "lodash";
import { QueryFilterType } from "../types/QueryFilterType";



// Function to calculate the filter count
export const calculateFilterCount = (filters: QueryFilterType) => {
    console.log(filters);
    if (filters === undefined || isEmpty(filters)) return 0;

    let count = 0;
    if (filters.teams) {
        if (filters.teams.length > 0) count++;
    }
    if (filters.tournaments) {
        if (filters.tournaments.length > 0) count++;
    }
    if (filters.yearRange?.startYear !== 1872 || filters.yearRange?.endYear !== 2024) count++;
    if (filters.exclusive) count++;
    return count;
  };