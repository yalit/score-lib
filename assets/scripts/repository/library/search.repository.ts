import {createCollectionOutputSchema} from "../collectionOutput.interface";
import {searchResultSchema} from "../../model/library/searchResult.interface";
import {z} from "zod";

const searchScoreCollectionOutputSchema = createCollectionOutputSchema(searchResultSchema)
export type SearchScoreCollectionOutput = z.infer<typeof searchScoreCollectionOutputSchema>

export const searchScoreByTitle = async (q: string): Promise<SearchScoreCollectionOutput> => {
    return fetch(`/api/scores/search?q=${q}`, {
        method: 'GET',
    })
        .then(output => output.json())
        .then(searchScoreCollectionOutputSchema.parseAsync)
}
