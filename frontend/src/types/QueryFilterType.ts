type YearRangeType = {
    start: number;
    end: number;
}


export type QueryFilterType = {
    teams?: string[];
    tournaments?: string[];
    yearRange?: YearRangeType;
}