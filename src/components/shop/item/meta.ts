import { clicker, clover } from "../../../assets/images/items";

/**
 * A type of item.
 */
export enum ItemType {
    Clicker,
    Clover,
}

/**
 * Mapping for items to image URLs.
 */
export const Items: { [itemType in ItemType]: string } = {
    [ItemType.Clicker]: clicker,
    [ItemType.Clover]: clover,
};
