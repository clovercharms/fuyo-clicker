import classes from "./index.module.css";
import { Currency } from "../shop/item/data";
import cx from "classix";
import { formatNumber } from "../../utils/numbers";

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
            {formatNumber(amount)}
        </span>
    );
}
