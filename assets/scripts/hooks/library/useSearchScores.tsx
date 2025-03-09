import {searchScoreByTitle} from "../../repository/library/search.repository";
import {SearchResult} from "../../model/library/searchResult.interface";

interface SearchScores {
    search: (title: string) => Promise<SearchResult[]>
}

export const useSearchScores = () => {
    const search = async (title: string): Promise<SearchResult[]> => {
        const output = await searchScoreByTitle(title);
        return output.data;
    }

    return {search};
}
