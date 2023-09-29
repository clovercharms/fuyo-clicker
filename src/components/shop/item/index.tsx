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
                classes.container,
                props.className,
                !affordable && classes.hidden
            )}
        >
            <div>
                <img src={thumbnail} />
                <div>
                    <div>{name}</div>
                    <div>
                        <span>Price: </span>
                        <Price amount={price} currency={currency} />
                    </div>
                </div>
            </div>
            <div className={classes.purchased}>{purchased}</div>
        </li>
    );
}