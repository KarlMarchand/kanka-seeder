export interface Meta {
    current_page: number,
    from: number,
    last_page: number,
    links: Link[];
    path: string,
    per_page: number,
    to: number,
    total: number
}

export interface Pagination {
    first: string,
    last: string,
    prev?: string,
    next?: string
}

export interface Link {
    url?: string,
    label: string,
    active: boolean
}

export interface KankaGetResponse<T> {
    data: T[];
    links: Pagination;
    meta: Meta;
    sync: Date;
}

export interface KankaPostResponse<T> {
    data: T;
}