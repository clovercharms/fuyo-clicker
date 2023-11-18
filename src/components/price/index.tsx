import cx from "classix";
import { formatNumber } from "@/utils/numbers";

import { Currency } from "../shop/data";

import classes from "./index.module.css";

export interface PriceProps {
    amount: number;
    currency: Currency;
}

export function Price({ amount, currency }: PriceProps) {
    return (
        <span
            className={cx(
                classes.price,
                currency === Currency.COINS ? classes.coins : classes.clovers
            )}
        >
            {formatNumber(amount)}
        </span>
    );
}
