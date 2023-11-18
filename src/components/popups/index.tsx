import { HTMLProps, RefObject } from "react";

import { Tutorial } from "./tutorial";
import { Ending } from "./ending";

export interface PopupsRefs {
    clicker: RefObject<HTMLDivElement>;
    repro: RefObject<HTMLDivElement>;
    shop: RefObject<HTMLDivElement>;
}

export interface PopupsProps extends HTMLProps<HTMLDivElement> {
    refs: PopupsRefs;
}

export function Popups({ refs, ...props }: PopupsProps) {
    return (
        <div {...props}>
            <Tutorial refs={refs} />
            <Ending />
        </div>
    );
}
