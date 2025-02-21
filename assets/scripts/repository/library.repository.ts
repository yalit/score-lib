import {LibraryStat, libraryStatSchema} from "../model/library/libraryStat.interface";
import {Score, scoreSchema} from "../model/library/score.interface";
import {z} from "zod";

export function fetchLibraryStat(): Promise<LibraryStat> {
    return fetch('/api/library_stats')
        .then(response => response.json())
        .then(libraryStatSchema.parseAsync)
}

const scoreListSchema = z.array(scoreSchema)

export function fetchLastScores(): Promise<Score[]> {
    return fetch('/api/scores/lasts')
        .then(response => response.json())
        .then(answer => {
            return scoreListSchema.parseAsync(answer.member);
        })
}
