export type Paginacao<T, U extends string> = {
    [key in U]: T[];
} & {
    limit: number;
    skip: number;
    total: number;
};