/**
 * A type of item.
 */
export enum ItemType {
    Clicker,
    Clover,
}

/**
 * Mapping for items to images.
 */
export const Images: { [itemType in ItemType]: string } = {
    [ItemType.Clicker]: "../../../assets/images/items/clicker.png",
    [ItemType.Clover]: "../../../assets/images/items/clover.png",
};
