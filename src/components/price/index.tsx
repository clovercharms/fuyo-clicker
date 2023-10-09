import classes from "./index.module.css";
import { formatNumber } from "../../hooks/counter";
import { Currency } from "../shop/item/data";
import cx from "classix";

export interface PriceProps {
    amount: number;
    currency: Currency;
}

export default function Price({ amount, currency }: PriceProps) {
    return (
        <span
            className={cx(
                classes.price,
                currency === Currency.COINS ? classes.coins : classes.clovers
            )}
        >
            {formatNumber(amount, true)}
        </span>
    );
}
