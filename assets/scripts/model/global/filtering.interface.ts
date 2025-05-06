export type FilterBy<T extends FilterableItem> = {
    value: string,
    by: T
}

export type FilterableItem = string;
