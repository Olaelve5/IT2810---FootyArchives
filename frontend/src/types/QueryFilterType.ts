type YearRangeType = {
    startYear: number;
    endYear: number;
}


export type QueryFilterType = {
    teams?: string[];
    tournaments?: string[];
    yearRange?: YearRangeType;
}