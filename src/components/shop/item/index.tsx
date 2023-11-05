import classes from "./index.module.css";
import { HTMLProps } from "react";
import { Item as ItemData } from "./data";
import Price from "../../price";
import { Button } from "@/components/button";

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
        <li {...props}>
            <Button disabled={!affordable} className={classes.button}>
                <div className={classes.row}>
                    <div className={classes.details}>
                        <img className={classes.thumbnail} src={thumbnail} />
                        <div>
                            <h3>{name}</h3>
                            <h3>
                                <Price amount={price} currency={currency} />
                            </h3>
                        </div>
                    </div>
                    <h2 className={classes.purchased}>{purchased}</h2>
                </div>
            </Button>
        </li>
    );
}
