type Field = 'date' | 'goals' | 'goal_difference' | 'total_team_wins';


export type QuerySortType = {
    field: Field;
    order: 1 | -1;
}