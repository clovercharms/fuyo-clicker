import classes from "./index.module.css";
import { HTMLProps, useEffect } from "react";
import { useCounter } from "@/hooks/useCounter";
import { useGameStore } from "@/store";
import cx from "classix";
import { formatNumber } from "@/utils/numbers";

const BASE_TITLE = import.meta.env.PROD ? "Peach Colored Hair" : "Fuyo Clicker";

export default function Header(props: HTMLProps<HTMLHeadingElement>) {
    const coins = useGameStore(state => state.coins);
    const { counterRef } = useCounter(coins.amount, coins.rateMs, true);

    /**
     * Updates the title to reflect the latest amount of coins accrued.
     */
    useEffect(() => {
        document.title = `${formatNumber(coins.amount)} coins - ${BASE_TITLE}`;
    }, [coins.amount]);

    const handleCheat = () => {
        let amount = 0;
        do amount = parseInt(prompt("Coins:") ?? "");
        while (Number.isNaN(amount));

        coins.cheat(amount);
    };

    return (
        <header {...props} className={cx(classes.header, props.className)}>
            <h1>
                <span ref={counterRef} /> coins
            </h1>
            <h2>Per second: {formatNumber(coins.rateMs * 1e3)}</h2>
            <button onClick={handleCheat}>Set coins</button>
        </header>
    );
}
