import { useGameStore, GameState, State } from "@/stores/game";
import { useState, useEffect } from "react";

export function useSaves() {
    const [state, setState] = useGameStore(state => [
        state.state,
        state.setState,
    ]);
    const load = useGameStore(state => state.load);
    const [save, setSave] = useState<GameState | null>(null);
    const game = useGameStore(state => state);

    const handleChange = async (file: File) => {
        let save: GameState;
        try {
            const content = await file.text();
            save = JSON.parse(atob(content)) as GameState;
        } catch {
            alert("Invalid save file.");
            return;
        }
        // Pause game and signal to load save.
        setState(State.PAUSED);
        setSave(save);
    };

    /**
     * Handles loading of save files.
     */
    const loadSave = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".txt";
        input.addEventListener("change", () => {
            if (!input.files?.length) return;
            void handleChange(input.files[0]);
        });

        input.click();
    };

    /**
     * Handles loading of a save file after game is paused.
     */
    useEffect(() => {
        if (!save || state !== State.PAUSED) return;
        load(save);
        setSave(null);
        setState(State.RUNNING);
    }, [load, save, setState, state]);

    /**
     * Handles export of game state in the form of a save file.
     */
    const exportSave = () => {
        const blob = new Blob([btoa(JSON.stringify(game))], {
            type: "text/plain;charset=utf-8",
        });
        const anchor = document.createElement("a");
        anchor.href = URL.createObjectURL(blob);
        anchor.download = `fuyo-clicker-save-${new Date().getTime()}.txt`;
        anchor.click();
    };

    return { exportSave, loadSave };
}
