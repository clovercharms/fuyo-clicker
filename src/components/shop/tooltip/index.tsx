import classes from "./index.module.css";
import {
    useRef,
    useMemo,
    useCallback,
    useEffect,
    useState,
    PropsWithChildren,
} from "react";
import { useFloating } from "@floating-ui/react-dom";
import { Coords, autoUpdate, shift } from "@floating-ui/dom";

export interface TooltipProps extends PropsWithChildren {
    anchor: HTMLElement;
    initialCoords?: Coords;
}

/**
 * Specialized tooltip component that anchors around a given anchor on the `x`
 * axis and follows the cursor's `y` position.
 */
export default function Tooltip({
    anchor,
    initialCoords,
    children,
}: TooltipProps) {
    const mousePos = useRef({
        ...(initialCoords ?? { x: -1, y: -1 }),
    });
    // Controls visibilty of content, set when mouse position known.
    const [visible, setVisible] = useState(initialCoords !== undefined);

    /**
     * Virtual reference anchor used for positioning. The x coordinate of the
     * anchor is used, and the y coordinate of the mouse cursor.
     */
    const virtualReference = useMemo(
        () => ({
            getBoundingClientRect() {
                const anchorRect = anchor.getBoundingClientRect();
                return {
                    width: 0,
                    height: 0,
                    x: anchorRect?.x ?? 0,
                    y: mousePos.current.y,
                    left: anchorRect?.x ?? 0,
                    right: anchorRect?.x ?? 0,
                    top: mousePos.current.y,
                    bottom: mousePos.current.y,
                };
            },
        }),
        [anchor]
    );

    const { refs, floatingStyles, update } = useFloating({
        placement: "left",
        elements: {
            reference: virtualReference,
        },
        middleware: [shift()],
        whileElementsMounted: autoUpdate,
    });

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            /**
             * Visibility only set after first `mousemove` event if initial
             * coordinates not given.
             */
            if (!visible) setVisible(true);
            update();
        },
        [update, visible]
    );

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, [handleMouseMove]);

    return (
        visible && (
            <div
                ref={refs.setFloating}
                className={classes.tooltip}
                style={floatingStyles}
            >
                {children}
            </div>
        )
    );
}
