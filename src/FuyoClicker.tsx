import { useEffect } from "react";
import classes from "./FuyoClicker.module.css";
import Lanes from "./components/lanes";
import News from "./components/news";
import Reproduction from "./components/reproduction";
import Shop from "./components/shop";
import { State, useGameStore } from "./stores/game";
import { DndContext } from "@dnd-kit/core";
import Clicker from "./components/clicker";
import { Divider, Orientation } from "./components/divider";
import { Species } from "./components/species";

/** Determines the frequency of updates of the game state. */
const TICK_MS = 1000;

/**
 * Contains all the game's components, and handles the main game loop.
 */
export default function FuyoClicker() {
    const tick = useGameStore(state => state.tick);
    const state = useGameStore(state => state.state);

    useEffect(() => {
        if (state === State.PAUSED) return;

        const intervalId = window.setInterval(tick, TICK_MS);

        return () => window.clearInterval(intervalId);
    }, [tick, state]);

    return (
        <div className={classes["fuyo-clicker"]}>
            <Clicker className={classes.left} />
            <DndContext>
                <div className={classes.middle}>
                    <Divider />
                    <div>
                        <News />
                        <Divider orientation={Orientation.HORIZONTAL} />
                        <Lanes />
                    </div>
                    <Divider />
                </div>
                <div className={classes.right}>
                    <Reproduction />
                    <Divider orientation={Orientation.HORIZONTAL} />
                    <Shop />
                </div>
            </DndContext>
            <Species />
        </div>
    );
}
