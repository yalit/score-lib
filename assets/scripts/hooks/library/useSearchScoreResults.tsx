import {searchScoreResults} from "../../repository/library/search.repository";
import {SearchResult} from "../../model/library/searchResult.interface";

interface SearchScoreResults {
    search: (q: string) => Promise<SearchResult[]>
}

export const useSearchScoreResults = (): SearchScoreResults => {
    //TODO : update to a react query useQuery !!!
    const search = async (title: string): Promise<SearchResult[]> => {
        const output = await searchScoreResults(title);
        return output.data;
    }

    return {search};
}
