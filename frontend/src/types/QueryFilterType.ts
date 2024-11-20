type YearRangeType = {
    startYear: number;
    endYear: number;
}

type TeamType = {
    en: string;
    no: string;
}


export type QueryFilterType = {
    teams?: TeamType[];
    tournaments?: string[];
    yearRange?: YearRangeType;
    exclusive?: boolean;
}