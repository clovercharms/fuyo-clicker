import { useCallback, useEffect, useRef } from "react";
import { formatNumber } from "../utils/numbers";

/**
 * Optimistic counter for a given value, which updates at a certain rate.
 * @param value The last known value.
 * @param rateMs The rate in which the value changes every millisecond.
 * @param floor Whether or not to floor the computed value.
 */
export function useCounter(value: number, rateMs: number, floor?: boolean) {
    /** Reference to the element to update the value in. */
    const elementRef = useRef<HTMLElement>(null);
    /** The last animation frame requested. */
    const requestRef = useRef<number | undefined>();
    const lastUpdate = useRef(performance.now());

    /**
     * Update progression timer upon change in value or rate (likely from tick.)
     */
    useEffect(() => {
        lastUpdate.current = performance.now();
    }, [value, rateMs]);

    /**
     * Updates the actual value inside of the element outside rendering loop.
     */
    const updateValue = useCallback(() => {
        if (!elementRef.current) return;
        const elapsed = Math.max(0, performance.now() - lastUpdate.current);

        const currentValue = value + elapsed * rateMs;
        elementRef.current.innerText = formatNumber(
            floor ? Math.floor(currentValue) : currentValue
        );

        requestRef.current = requestAnimationFrame(updateValue);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [elementRef, value, rateMs, floor]);

    /**
     * Starts the main update loop which runs every animation frame.
     */
    useEffect(() => {
        requestRef.current = requestAnimationFrame(updateValue);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [updateValue]);

    return { counterRef: elementRef };
}
