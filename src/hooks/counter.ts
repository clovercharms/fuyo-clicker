import { useCallback, useEffect, useRef } from "react";

/**
 * Formatting function used for numbers.
 * [FIXME] Only supports up to trillion notation, might need custom impl. later.
 */
export const formatNumber = (
    number: number | bigint,
    options?: Intl.NumberFormatOptions
) =>
    Intl.NumberFormat("en", {
        notation: "compact",
        compactDisplay: "long",
        ...options,
    }).format(number);

/**
 * Optimistic counter for a given value, which updates at a certain rate.
 * @param value The last known value.
 * @param rateMs The rate in which the value changes every millisecond.
 * @param fractionDigits The amount of decimal points to round to.
 */
export function useCounter(value: number, rateMs: number, fractionDigits = 0) {
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
        const elapsed = performance.now() - lastUpdate.current;

        const currentValue = value + elapsed * rateMs;
        elementRef.current.innerText =
            fractionDigits !== 0
                ? formatNumber(currentValue, {
                      minimumFractionDigits: fractionDigits,
                  })
                : formatNumber(Math.floor(currentValue)) + "";

        requestRef.current = requestAnimationFrame(updateValue);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [elementRef, value, rateMs, fractionDigits]);

    /**
     * Starts the main update loop which runs every animation frame.
     */
    useEffect(() => {
        requestRef.current = requestAnimationFrame(updateValue);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [updateValue]);

    return { counterRef: elementRef };
}
