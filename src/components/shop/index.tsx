import classes from "./index.module.css";
import { HTMLProps } from "react";
import Item from "./item";
import { ItemType } from "./item/meta";

/**
 * Shop for buying upgrades and advancements.
 */
export default function Shop(props: HTMLProps<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
        >
            <h1>Shop</h1>
            <Item itemType={ItemType.Clicker} owned={0}/>
            <Item itemType={ItemType.Clover} owned={0}/>
        </div>
    );
}
