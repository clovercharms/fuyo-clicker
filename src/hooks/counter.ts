import { useCallback, useEffect, useRef } from "react";

/**
 * Determines the amount of fractional digits to display based on the `value`.
 * @param value The value to compare.
 * @returns The amount of fractional digits.
 */
function determineFractionDigits(value: number | bigint) {
    if (value >= 1e7) return 3;
    if (value >= 1e6) return 2;
    if (value >= 1e3) return 1;
    return 0;
}

/**
 * Formatting function used for numbers.
 * [FIXME] Only supports up to trillion notation, might need custom impl. later.
 */
export const formatNumber = (
    number: number | bigint,
    adaptive?: boolean,
    options?: Intl.NumberFormatOptions
) =>
    Intl.NumberFormat("en", {
        notation: "compact",
        compactDisplay: "long",
        maximumFractionDigits: adaptive ? determineFractionDigits(number) : 3,
        ...options,
    }).format(number);

/**
 * Optimistic counter for a given value, which updates at a certain rate.
 * @param value The last known value.
 * @param rateMs The rate in which the value changes every millisecond.
 * @param adaptive Use an adaptive amount of fractional digits for the value.
 * @param floor Whether or not to floor the computed value.
 * @param options Formatting options for the value (`undefined` means floored.)
 */
export function useCounter(
    value: number,
    rateMs: number,
    adaptive?: boolean,
    floor?: boolean,
    options?: Intl.NumberFormatOptions
) {
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
        elementRef.current.innerText = formatNumber(
            floor ? Math.floor(currentValue) : currentValue,
            adaptive,
            options
        );

        requestRef.current = requestAnimationFrame(updateValue);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [elementRef, value, rateMs, options, adaptive, floor]);

    /**
     * Starts the main update loop which runs every animation frame.
     */
    useEffect(() => {
        requestRef.current = requestAnimationFrame(updateValue);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [updateValue]);

    return { counterRef: elementRef };
}
