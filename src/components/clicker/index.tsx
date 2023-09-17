import classes from "./index.module.css";
import ping from "../../assets/audio/ping-82822.mp3";
import { HTMLProps, useState, MouseEvent } from "react";

/**
 * The Clicker component contains the main coin, the current stats, and any
 * other additional effects that may be part of the coin.
 */
export default function Clicker(props: HTMLProps<HTMLDivElement>) {
    const [coins, setCoins] = useState(0);

    /**
     * Handles the main coin click, currently on updates a simple counter for
     * demonstration purposes.
     */
    const handleClick = (event: MouseEvent) => {
        if (event.button !== 0) return;
        
        setCoins(coins => coins + 1);

        void new Audio(ping).play();
    };

    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
        >
            <header>
                <h1>You have {coins} coins!</h1>
                <h2>Per second: 0</h2>
            </header>
            <button className={classes.button} onMouseUp={handleClick} />
        </div>
    );
}
