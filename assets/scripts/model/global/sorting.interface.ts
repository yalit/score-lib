export type Direction = 'asc' | 'desc'
export type NoDirection = ''
export type AnyDirection = Direction | NoDirection;

export interface SortBy<T extends SortableItem> {
    direction: AnyDirection
    by: T
}

export type SortableItem = string;
