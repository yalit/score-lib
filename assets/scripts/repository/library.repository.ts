import {LibraryStat, libraryStatSchema} from "../model/library/libraryStat.interface";
import {Score, scoreSchema} from "../model/library/score.interface";
import {z} from "zod";
import {ScoreCollectionOutput, scoreCollectionOutputSchema} from "./collectionOutput.interface";

export function fetchLibraryStat(): Promise<LibraryStat> {
    return fetch('/api/library_stats')
        .then(response => response.json())
        .then(libraryStatSchema.parseAsync)
}

const scoreListSchema = z.array(scoreSchema)

export function fetchLastScores(): Promise<ScoreCollectionOutput> {
    return fetch('/api/scores/lasts')
        .then(response => response.json())
        .then(output => scoreCollectionOutputSchema.parseAsync(output))
}
