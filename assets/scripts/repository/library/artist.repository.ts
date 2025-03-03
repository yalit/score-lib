import {artistSchema} from "../../model/library/scoreArtist.interface";
import {z} from "zod";
import {createCollectionOutputSchema} from "../collectionOutput.interface";

const artistCollectionOutputSchema = createCollectionOutputSchema(artistSchema)
export type ArtistCollectionOutput = z.infer<typeof artistCollectionOutputSchema>

const artistTypeCollectionOutputSchema = createCollectionOutputSchema(z.object({type: z.string()}))
export type ArtistTypeCollectionOutput = z.infer<typeof artistTypeCollectionOutputSchema>
export async function fetchArtists(
    v: string = "",
): Promise<ArtistCollectionOutput> {
    const url = "/api/artists" + (v !== "" ? `?value=${v}` : "");

    let response = await fetch(url);
    let output: any = await response.json();
    return await artistCollectionOutputSchema.parseAsync(output);
}

export async function fetchArtistTypes(): Promise<ArtistTypeCollectionOutput> {
    const url = "/api/artist_types"

    let response = await fetch(url);
    let output: any = await response.json();
    return await artistTypeCollectionOutputSchema.parseAsync(output);
}
