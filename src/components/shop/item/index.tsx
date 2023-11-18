import { HTMLProps } from "react";
import { Button, Variant } from "@/components/button";

import { Item as ItemData } from "../data";
import { Price } from "../../price";

import classes from "./index.module.css";

export interface ItemProps extends HTMLProps<HTMLLIElement> {
    item: ItemData;
    price: number;
    affordable: boolean;
    purchased: number;
}

export function Item({
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
        <li {...props}>
            <Button
                variant={Variant.REGULAR}
                disabled={!affordable}
                className={classes.button}
            >
                <div className={classes.row}>
                    <div className={classes.details}>
                        <img className={classes.thumbnail} src={thumbnail} />
                        <div>
                            <div>{name}</div>
                            <div>
                                <Price amount={price} currency={currency} />
                            </div>
                        </div>
                    </div>
                    <div className={classes.purchased}>{purchased}</div>
                </div>
            </Button>
        </li>
    );
}
