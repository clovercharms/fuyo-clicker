import { useRef } from "react";

import { PopupsRefs } from ".";

export function usePopupsRefs() {
    return useRef<PopupsRefs>({
        clicker: useRef<HTMLDivElement>(null),
        repro: useRef<HTMLDivElement>(null),
        shop: useRef<HTMLDivElement>(null),
    }).current;
}
