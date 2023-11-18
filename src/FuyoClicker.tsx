import { useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import { Lanes } from "@/components/lanes";
import { News } from "@/components/news";
import { Reproduction } from "@/components/reproduction";
import { Shop } from "@/components/shop";
import { State, useGameStore } from "@/stores/game";
import { Clicker } from "@/components/clicker";
import { Divider, Orientation } from "@/components/divider";
import { Species } from "@/components/species";
import { Popups } from "@/components/popups";
import { usePopupsRefs } from "@/components/popups/usePopupsRefs";

import classes from "./FuyoClicker.module.css";

/** Determines the frequency of updates of the game state. */
const TICK_MS = 1000;

/**
 * Contains all the game's components, and handles the main game loop.
 */
export function FuyoClicker() {
    const tick = useGameStore(state => state.tick);
    const state = useGameStore(state => state.state);
    const refs = usePopupsRefs();

    useEffect(() => {
        if (state === State.PAUSED) return;

        const intervalId = window.setInterval(tick, TICK_MS);

        return () => window.clearInterval(intervalId);
    }, [tick, state]);

    return (
        <div className={classes["fuyo-clicker"]}>
            <Clicker ref={refs.clicker} className={classes.left} />
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
                    <Reproduction ref={refs.repro} />
                    <Divider orientation={Orientation.HORIZONTAL} />
                    <Shop ref={refs.shop} />
                </div>
            </DndContext>
            <Species />
            <Popups className={classes.popups} refs={refs} />
        </div>
    );
}
