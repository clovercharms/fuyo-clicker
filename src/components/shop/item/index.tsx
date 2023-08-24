import classes from "./index.module.css";
import { HTMLProps } from "react";
import { ItemType, Items } from "./meta";

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
            <img src={Items[itemType]} />
            <span>{owned}</span>
        </div>
    );
}
