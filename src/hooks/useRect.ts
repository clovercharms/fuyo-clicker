import { useState, useLayoutEffect, useRef } from "react";

export function useRect<TElement extends HTMLElement>() {
    const elementRef = useRef<TElement>(null);
    const [rect, setRect] = useState<DOMRect | null>(null);

    useLayoutEffect(() => {
        if (!elementRef.current) return;

        const handler = () =>
            setRect(elementRef.current!.getBoundingClientRect());
        const observer = new ResizeObserver(handler);
        observer.observe(elementRef.current);

        return () => observer.disconnect();
    }, []);

    return { elementRef, rect };
}
