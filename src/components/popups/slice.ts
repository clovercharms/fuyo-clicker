import { StoreApi } from "zustand";
import { GameState } from "@/stores/game";
import { produce } from "immer";

import { resetters } from "../../stores/game/resetters";
import { LaneType } from "../lanes/lane/data";

import { Step } from "./tutorial";

/**
 * Slice of the state of popups in the game.
 */
export interface PopupsSlice {
    popups: {
        tutorial: {
            step: Step;
            setStep: (step: Step) => void;
        };
        ending: {
            reached: boolean;
        };
        tick: () => void;
    };
}

/**
 * Default ending state.
 */
const defaultTutorial = () => ({
    step: Step.START,
});

/**
 * Default ending state.
 */
const defaultEnding = () => ({
    reached: false,
});

export const createPopupsSlice = (
    set: StoreApi<GameState>["setState"],
    get: StoreApi<GameState>["getState"]
) => {
    resetters.push(() => ({
        popups: {
            ...get().popups,
            tutorial: {
                ...get().popups.tutorial,
                ...defaultTutorial(),
            },
            ending: {
                ...get().popups.ending,
                ...defaultEnding(),
            },
        },
    }));
    return {
        popups: {
            tutorial: {
                ...defaultTutorial(),
                setStep: (step: Step) => {
                    set(
                        produce<GameState>(state => {
                            state.popups.tutorial.step = step;
                        }),
                        false,
                        // @ts-expect-error typing
                        "Action - Tutorial - Set Step"
                    );
                },
            },
            ending: {
                ...defaultEnding(),
            },
            tick: () => {
                // Check if ending condition reached
                if (!get().popups.ending.reached && endingReached(get())) {
                    set(
                        produce<GameState>(state => {
                            state.popups.ending.reached = true;
                        }),
                        false,
                        // @ts-expect-error typing
                        "Tick - Popups - Ending Reached"
                    );
                }
            },
        },
    } as PopupsSlice;
};

function endingReached(state: GameState) {
    return state.lanes.types[LaneType.Peak].buildings > 0;
}
