import {useQuery, UseQueryResult} from "react-query";
import {LibraryStat} from "../../model/library/libraryStat.interface";
import {fetchLibraryStat} from "../../repository/library/library.repository";

export function useLibraryStat(): LibraryStat {
    const lbStatQuery: UseQueryResult<LibraryStat> = useQuery({
        queryKey: "libraryStats",
        queryFn: fetchLibraryStat
    })

    if (!lbStatQuery.data) {
        return {
            nbScores: 0,
            nbLists: 0,
            nbCreatedInLastWeek: 0
        }
    }
    return lbStatQuery.data
}
