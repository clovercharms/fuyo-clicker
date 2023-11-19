import { Placement } from "@floating-ui/dom";
import { ComponentType } from "react";

import { PopupsRefs } from "../..";

import { Start } from "./start";
import { Clicker } from "./clicker";
import { Repro } from "./repro";
import { Shop } from "./shop";

export enum Step {
    START,
    CLICKER,
    REPRO,
    SHOP,
    END,
}

export interface StepMeta {
    component: ComponentType;
    position?: {
        reference: keyof PopupsRefs;
        placement: Placement;
    };
}

export const meta: Partial<Record<Step, StepMeta>> = {
    [Step.START]: {
        component: Start,
    },
    [Step.CLICKER]: {
        component: Clicker,
        position: {
            reference: "clicker",
            placement: "right",
        },
    },
    [Step.REPRO]: {
        component: Repro,
        position: {
            reference: "repro",
            placement: "left",
        },
    },
    [Step.SHOP]: {
        component: Shop,
        position: {
            reference: "shop",
            placement: "left",
        },
    },
};
