import {useQuery, UseQueryResult} from "react-query";
import {fetchLibraryStat} from "../../repository/library.repository";
import {LibraryStat} from "../../model/libraryStat.interface";

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
