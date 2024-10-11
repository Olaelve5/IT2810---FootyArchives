import CountryFilter from "./CountryFilter";
import TournamentFilter from "./TournamentFilter";


export default function Filters() {
    return (
        <div>
            <TournamentFilter />
            <CountryFilter />
        </div>
    );
}