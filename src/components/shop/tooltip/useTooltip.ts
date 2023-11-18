import { Coords } from "@floating-ui/dom";
import { useState } from "react";

/**
 * Hook for usage with specialized `Tooltip` component for holding state about
 * the anchor reference, and the last known cursor coordinates.
 */
export function useTooltip() {
    const anchor = useState<HTMLElement | null>(null);
    const coords = useState<Coords | null>(null);

    return {
        anchor,
        coords,
    };
}
