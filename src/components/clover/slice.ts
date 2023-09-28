import { StoreApi } from "zustand";
import { GameState, resetters } from "../../store";
import { Job } from "./data";

/**
 * State about a Clover.
 */
export interface Clover {
    id: number;
    name: string;
    job: Job;
    assigned: number;
}

/**
 * Slice about Clovers, contains global state such as which one is currently
 * being dragged.
 */
export interface CloverSlice {
    clover: {
        /**
         * State about the clover that is currently being dragged.
         */
        dragged?: Clover;
        /**
         * Store a clover as being dragged.
         * @param clover The clover to store.
         */
        drag: (clover?: Clover) => void;
    };
}

const initialCloverState = {
    dragged: undefined,
};

export const createCloverSlice = (
    set: StoreApi<GameState>["setState"],
    get: StoreApi<GameState>["getState"]
) => {
    resetters.push(() => ({
        clover: { ...get().clover, ...initialCloverState },
    }));
    return {
        clover: {
            ...initialCloverState,
            drag: (clover?: Clover) => {
                set(
                    state => ({
                        clover: {
                            ...state.clover,
                            dragged: clover,
                        },
                    }),
                    false,
                    // @ts-expect-error typing
                    "Action - Clover - Drag"
                );
            },
        },
    };
};
