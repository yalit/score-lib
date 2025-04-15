export type Direction = 'asc' | 'desc'
export type NoDirection = ''

export interface SortBy<T> {
    direction: Direction | NoDirection,
    by: T
}

export type FilterBy<T> = {
    value: number|string,
    by: T
}
