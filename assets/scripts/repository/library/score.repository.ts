import {FilterBy, SortBy} from "../../model/generics.interface";
import {
    createCollectionOutputSchema,
} from "../collectionOutput.interface";
import {buildUrl} from "../../libraries/general";
import {Score, scoreSchema} from "../../model/library/score.interface";
import {z} from "zod";
import { ScoreCategory, scoreCategorySchema } from "../../model/library/scoreCategory.interface";
import { Artist, artistSchema, scoreArtistSchema } from "../../model/library/scoreArtist.interface";
import {FormScore} from "../../pages/library/score/ScoreForm";
import {ScoreFile, scoreFileSchema} from "../../model/library/scoreFile";

export const DEFAULT_NB_SCORES_PER_QUERY = 20;

export type AllowedSortBy = "title" | "reference";
export const isAllowedToSort = (key: string): key is AllowedSortBy => {
    return ["title", "reference"].includes(key);
}

export type AllowedFilterBy = "categories"
export const isAllowedToFilter = (key: string): key is AllowedFilterBy => {
    return ["categories"].includes(key);
}

export interface FetchScoresParameters {
    page: number;
    nbPerPage?: number;
    search?: string;
    order?: SortBy<AllowedSortBy> | null,
    filter?: FilterBy<AllowedFilterBy> | null,
}

export const scoreCollectionOutputSchema = createCollectionOutputSchema(scoreSchema)
export type ScoreCollectionOutput = z.infer<typeof scoreCollectionOutputSchema>

export async function fetchLastScores(): Promise<ScoreCollectionOutput> {
    let response = await fetch("/api/scores/lasts");
    let output: any = await response.json();
    return await scoreCollectionOutputSchema.parseAsync(output);
}

export async function fetchScores(
    parameters: FetchScoresParameters,
): Promise<ScoreCollectionOutput> {
    let fetchParams: { [k: string]: string } = {page: String(parameters.page)};

    const mappedScoreOrderByParameters: { [k in AllowedSortBy]: string } = {
        title: "title",
        reference: "reference.value",
    };

    if (parameters.order) {
        const orderParamName = `order[${mappedScoreOrderByParameters[parameters.order.by]}]`;
        fetchParams = {
            ...fetchParams,
            [orderParamName]: parameters.order.direction,
        };
    }

    if (parameters.nbPerPage) {
        fetchParams = {...fetchParams, nb: String(parameters.nbPerPage)};
    }

    if (parameters.search) {
        fetchParams = {...fetchParams, search: parameters.search};
    }

    let response = await fetch(buildUrl("/api/scores", fetchParams));
    let output: any = await response.json();
    return await scoreCollectionOutputSchema.parseAsync(output);
}

export function deleteScore(score: Score): Promise<Response> {
    return fetch(`/api/scores/${score.id}`, {
        method: "DELETE",
    });
}

export async function fetchScore(scoreId: string): Promise<Score> {
    if (scoreId === "") throw new Error("ScoreId is not filled");

    let response = await fetch("/api/scores/" + scoreId);
    if (!response.ok) {
        throw new Error("Error fetching score");
    }
    let result1: any = await response.json();
    return await scoreSchema.parseAsync(result1);
}

const saveScoreCategorySchema = scoreCategorySchema.transform((scoreCategory: ScoreCategory) => {
    return scoreCategory['@id'] ?? scoreCategory
})

const saveArtistSchema = artistSchema.transform((artist: Artist) => artist['@id'] ?? artist)

const saveScoreArtistSchema = scoreArtistSchema.merge(z.object({
    artist: saveArtistSchema
}))

const saveFileSchema = scoreFileSchema.transform((file: ScoreFile) => file['@id'] ?? file);

const saveScoreSchema = scoreSchema.merge(z.object({
    id: z.string().optional(),
    categories: z.array(saveScoreCategorySchema),
    artists: z.array(saveScoreArtistSchema),
    files: z.array(saveFileSchema),
}))

export async function createScore(score: FormScore): Promise<Score> {
    const parameters = {
        method: "POST",
        headers: {
            "Content-Type": "application/ld+json"
        },
    }

    return saveScore(`/api/scores`, parameters, score)
}

export async function updateScore(score: FormScore): Promise<Score> {
    const parameters = {
        method: "PUT",
        headers: {
            "Content-Type": "application/ld+json"
        },
    }

    return saveScore(`/api/scores/${score.id}`, parameters, score)

}

async function saveScore(url: string, parameters, score: FormScore): Promise<Score> {
    let response = await fetch(url, {
        ...parameters,
        body:JSON.stringify(saveScoreSchema.parse(score)),
    })

    //TODO : handle error
    
    let output = await response.json()

    if (score.uploadedFiles && score.uploadedFiles.length > 0) {
        let formData = new FormData()

        for (let i = 0; i < score.uploadedFiles.length; i++) {
            formData.append(score.uploadedFiles[i].name, score.uploadedFiles[i]);
        }

        response = await fetch(`/api/scores/${output.id}/files`, {
            method: "POST",
            body: formData,
        })
        output = await response.json()
    }

    return await scoreSchema.parseAsync(output)
}


