import classes from "./index.module.css";
import { HTMLProps } from "react";
import { ItemType, Images } from "./meta";

export interface IItem extends Omit<HTMLProps<HTMLDivElement>, "itemType"> {
    /** The type of item. */
    itemType: ItemType;
    /** Number owned */
    owned: number;
}

/**
 * An item sold in the shop.
 */
export default function Item({itemType, owned, ...props} : IItem) {
    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
        >
            <img src={new URL(Images[itemType], import.meta.url).href} />
            <span>{owned}</span>
        </div>
    );
}
