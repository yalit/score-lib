export type Direction = 'asc' | 'desc'
export type NoDirection = ''

export interface OrderBy<T> {
    direction: Direction | NoDirection,
    by: T
}
