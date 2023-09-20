import { useCallback, useEffect, useRef } from "react";
import { GameState } from "../../store";

/** Duration of a poke animation. */
const POKE_DURATION_MS = 1000;
/** Duration of the rotation of the clicker around the coin. */
const ROTATE_DURATION_MS = 60e3;
/** Determines nth hands to move with a poke animation. */
const LOOP_OFFSET = 16;

/**
 * Hook for handling (poke) animations regarding hands inside clickers.
 * @param coins The current coins state.
 */
export function useHands(coins: GameState["coins"]) {
    const handRefs = useRef<Record<number, HTMLImageElement>>([]);
    /* The initial offset of the hand to move. */
    const offsetHand = useRef(-1);
    const intervalId = useRef<number | undefined>(undefined);

    /**
     * Main poke interval, for any hands existing, determines which hands to
     * run the poke animation on based on `offsetHand.current`.
     */
    const poke = useCallback(() => {
        if (coins.clickers === 0) return;

        offsetHand.current = (offsetHand.current + 1) % coins.clickers;
        let loopOffset = 0;
        Object.keys(handRefs.current)
            .filter(k => {
                const iteration =
                    parseInt(k) === offsetHand.current + loopOffset;
                if (iteration) loopOffset += LOOP_OFFSET;
                return iteration;
            })
            .forEach(k => {
                handRefs.current[parseInt(k)].animate(
                    [
                        { transform: "translateY(0rem)" },
                        { transform: "translateY(1rem)" },
                        { transform: "translateY(0rem)" },
                    ],
                    {
                        duration: POKE_DURATION_MS,
                    }
                );
            });
    }, [coins.clickers, handRefs]);

    useEffect(() => {
        intervalId.current = setInterval(poke, POKE_DURATION_MS);

        return () => {
            if (intervalId.current) clearInterval(intervalId.current);
        };
    }, [poke]);

    return { handRefs };
}

/**
 * Hook for handling (rotate) animations for clickers around the main coin.
 * @param coins The current coins state.
 */
export function useClickers(coins: GameState["coins"]) {
    const clickerRefs = useRef<Record<number, HTMLDivElement>>([]);
    const startTime = useRef(0);

    /**
     * Main rotation function, responsible for rotating a clicker around the
     * coin. Based on `--index`, `--angle-diff` it calculates the correct angle
     * for the clicker based on its position in the series.
     */
    useEffect(() => {
        Object.values(clickerRefs.current).forEach(clicker => {
            // Only affect clickers without animations.
            if (!clicker || clicker.getAnimations().length > 0) return;

            const animation = clicker.animate(
                [
                    {
                        transform: `rotateZ(
                            calc(
                                var(--index) * var(--angle-diff) +
                                var(--ring) * (var(--angle-diff) / 2) + 0deg
                            )
                        )`,
                    },
                    {
                        transform: `rotateZ(
                            calc(
                                var(--index) * var(--angle-diff) +
                                var(--ring) * (var(--angle-diff) / 2) + 360deg
                            )
                        )`,
                    },
                ],
                {
                    duration: ROTATE_DURATION_MS,
                    iterations: Infinity,
                }
            );
            // Synchronize animation time with the last.
            animation.startTime = startTime.current;
            startTime.current = animation.startTime;
        });
    }, [coins.clickers, clickerRefs]);

    return { clickerRefs };
}

/**
 * Hook for handling (poke, rotate) animations for clickers and hands around
 * the main coin.
 * @param coins The current coins state.
 */
export function useClickerHands(coins: GameState["coins"]) {
    return {
        ...useClickers(coins),
        ...useHands(coins),
    };
}
