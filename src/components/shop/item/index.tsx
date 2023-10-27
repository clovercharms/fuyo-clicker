import classes from "./index.module.css";
import { HTMLProps } from "react";
import cx from "classix";
import { Item as ItemData } from "./data";
import Price from "../../price";

export interface ItemProps extends HTMLProps<HTMLLIElement> {
    item: ItemData;
    price: number;
    affordable: boolean;
    purchased: number;
}

export default function Item({
    item: {
        name,
        price: { currency },
        thumbnail,
    },
    price,
    affordable,
    purchased,
    ...props
}: ItemProps) {
    return (
        <li
            {...props}
            className={cx(
                classes.item,
                !affordable && classes.hidden,
                props.className
            )}
        >
            <div>
                <img className={classes.thumbnail} src={thumbnail} />
                <div className={classes.details}>
                    <div>{name}</div>
                    <Price amount={price} currency={currency} />
                </div>
            </div>
            <div className={classes.purchased}>{purchased}</div>
        </li>
    );
}
