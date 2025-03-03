import {
    createCollectionOutputSchema,
} from "../collectionOutput.interface";
import {scoreCategorySchema} from "../../model/library/scoreCategory.interface";
import {z} from "zod";

const scoreCategoryCollectionOutputSchema = createCollectionOutputSchema(scoreCategorySchema)
export type ScoreCategoryCollectionOutput = z.infer<typeof scoreCategoryCollectionOutputSchema>

export async function fetchCategories(
    v: string = "",
): Promise<ScoreCategoryCollectionOutput> {
    const url = "/api/score_categories" + (v !== "" ? `?value=${v}` : "");

    let response = await fetch(url);
    let output: any = await response.json();
    return await scoreCategoryCollectionOutputSchema.parseAsync(output);
}
