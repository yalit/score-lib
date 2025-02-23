import {LibraryStat, libraryStatSchema} from "../model/library/libraryStat.interface";
import {Score } from "../model/library/score.interface";
import {ScoreCollectionOutput, scoreCollectionOutputSchema} from "./collectionOutput.interface";
import {OrderBy} from "../model/generics.interface";
import {buildUrl} from "../libraries/general";

export const DEFAULT_NB_SCORES_PER_QUERY = 20

export function fetchLibraryStat(): Promise<LibraryStat> {
    return fetch('/api/library_stats')
        .then(response => response.json())
        .then(libraryStatSchema.parseAsync)
}

export function fetchLastScores(): Promise<ScoreCollectionOutput> {
    return fetch('/api/scores/lasts')
        .then(response => response.json())
        .then(output => scoreCollectionOutputSchema.parseAsync(output))
}

export type AllowedScoreOrderBy = 'title' | 'reference' | ''

export interface FetchScoresParameters {
    page: number,
    order: OrderBy<AllowedScoreOrderBy>
    nbPerPage?: number,
}

export function fetchScores(parameters: FetchScoresParameters): Promise<ScoreCollectionOutput> {
    let fetchParams: { [k: string]: string } = {page: String(parameters.page)}

    const mappedScoreOrderByParameters: { [k in AllowedScoreOrderBy]: string } = {
        title: 'title',
        reference: 'reference.value',
        '': ''
    }

    if (parameters.order.direction !== '' && parameters.order.by !== '') {
        const orderParamName = `order[${mappedScoreOrderByParameters[parameters.order.by]}]`
        fetchParams = {...fetchParams, [orderParamName]: parameters.order.direction};
    }

    if (parameters.nbPerPage) {
        fetchParams = {...fetchParams, nb: String(parameters.nbPerPage)}
    }

    return fetch(buildUrl('/api/scores', fetchParams))
        .then(response => response.json())
        .then(output => scoreCollectionOutputSchema.parseAsync(output))
}

export function deleteScore(score: Score): Promise<Response> {
    return fetch(`/api/scores/${score.id}`, {
        method: "DELETE"
    })
}
