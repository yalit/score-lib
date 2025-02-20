import {LibraryStat, libraryStatSchema} from "../model/libraryStat.interface";

export function fetchLibraryStat(): Promise<LibraryStat> {
    return fetch('/api/library_stats')
        .then(response => response.json())
        .then(libraryStatSchema.parseAsync)
}
