import { State, useGameStore } from "@/stores/game";
import { useState, useEffect } from "react";

export function useReset() {
    const _reset = useGameStore(state => state.reset);
    const state = useGameStore(state => state.state);
    const setState = useGameStore(state => state.setState);
    const [willReset, setWillReset] = useState(false);

    /**
     * Handles signalling for a reset.
     */
    const reset = () => {
        if (!confirm("Are you sure you want to reset all progress?")) return;

        setState(State.PAUSED);
        setWillReset(true);
    };

    /**
     * Handles resetting after game is paused.
     */
    useEffect(() => {
        if (!willReset || state !== State.PAUSED) return;

        _reset();
        setWillReset(false);
        setState(State.RUNNING);
    }, [_reset, setState, state, willReset]);

    return { reset };
}
