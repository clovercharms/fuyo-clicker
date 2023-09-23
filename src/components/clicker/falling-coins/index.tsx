import classes from "./index.module.css";
import coin from "../../../assets/images/fuyo-coin.png";
import clover from "../../../assets/images/clover/base.png";
import { useRef, useEffect, useCallback } from "react";
import { useGameStore } from "../../../store";

/** Interval between spawn checks in milliseconds. */
const SPAWN_INTERVAL = 100;
/** The divisor of the rate of coins to determine the rate of coins falling. */
const RATE_DIVISOR = 10;

/**
 * Background component that renders falling coins and clovers based on the
 * current rate of coin production.
 */
export default function FallingCoins() {
    const containerRef = useRef<HTMLDivElement>(null);
    const intervalId = useRef<number | undefined>();
    const coinRate = useGameStore(state => state.coins.rateMs);
    const progress = useRef(0);
    const lastUpdate = useRef(performance.now());

    const spawn = useCallback(() => {
        const elapsed = performance.now() - lastUpdate.current;
        lastUpdate.current = performance.now();

        progress.current += elapsed * Math.min(coinRate / RATE_DIVISOR, 0.01);
        if (progress.current < 1) return
        progress.current = Math.min(progress.current - 1, 1);

        const coinElement = document.createElement("img");
        // 90% coin, 10% clover
        coinElement.src = Math.random() < 0.9 ? coin : clover;
        coinElement.className = classes.coin;

        // Random parameters for variety
        const leftOffset = Math.random() * 100;
        const degreeOffset = Math.random() * 90;
        const swayOffset = Math.random() * (50 - -50) + -50;
        const duration = Math.max(2e3, Math.random() * 4e3);

        coinElement.style.left = `${leftOffset}%`;

        const animation = coinElement.animate(
            [
                {
                    top: '-6rem',
                    left: `${leftOffset}%`,
                    transform: `rotateZ(calc(${degreeOffset}deg + 0deg))`,
                },
                {
                    top: '100%',
                    left: `calc(${leftOffset}% + ${swayOffset}%)`,
                    transform: `rotateZ(calc(${degreeOffset}deg + 360deg))`,
                },
            ],
            {
                duration: duration,
                fill: 'forwards',
                easing: 'ease-in'
            }
        );
        animation.addEventListener("finish", () => coinElement.remove());

        containerRef.current?.append(coinElement);
    }, [coinRate]);

    useEffect(() => {
        intervalId.current = setInterval(spawn, SPAWN_INTERVAL);

        return () => {
            if (intervalId.current) clearInterval(intervalId.current);
        };
    }, [spawn]);

    return <div className={classes.container} ref={containerRef} />;
}
