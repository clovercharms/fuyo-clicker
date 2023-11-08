import { all as merge } from "deepmerge";

export function mergePersisted<T>() {
    return (persisted: unknown, current: T) =>
        merge([current, persisted as Partial<T>], {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            arrayMerge: (_, src) => src,
        }) as T;
}
