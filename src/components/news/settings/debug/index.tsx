import { Button } from "@/components/button";
import { State, useGameStore } from "@/stores/game";
import { useSettingsStore } from "@/stores/settings";

export function Debug() {
    const settings = useSettingsStore(state => state);
    const state = useGameStore(state => state.state);
    const setState = useGameStore(state => state.setState);

    /**
     * Handles enabling debug mode.
     */
    const handleDebug = () => {
        settings.setDebug(!settings.debug);
    };

    /**
     * Handles toggling game state.
     */
    const handleState = () => {
        setState(state === State.RUNNING ? State.PAUSED : State.RUNNING);
    };

    return (
        <section>
            <h2>Debug</h2>
            <Button onClick={handleDebug}>
                {settings.debug ? "✅" : "⬜"} Debug mode
            </Button>
            {settings.debug && (
                <Button onClick={handleState}>
                    {state === State.RUNNING ? "▶️" : "⏸️"} State
                </Button>
            )}
        </section>
    );
}
