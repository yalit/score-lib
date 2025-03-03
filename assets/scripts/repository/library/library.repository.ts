import {LibraryStat, libraryStatSchema} from "../../model/library/libraryStat.interface";

export async function fetchLibraryStat(): Promise<LibraryStat> {
    let response = await fetch("/api/library_stats");
    let result1: any = await response.json();
    return await libraryStatSchema.parseAsync(result1);
}
