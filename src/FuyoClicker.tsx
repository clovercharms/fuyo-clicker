import { useEffect, useRef } from 'react';
import classes from "./FuyoClicker.module.css";
//import Clicker from './components/clicker';
import Lanes from './components/lanes';
import News from './components/news';
import Reproduction from './components/reproduction';
import Shop from './components/shop';
import { useGameStore } from './store';
import { DndContext } from '@dnd-kit/core';
import Clicker from './components/clicker';

/** Determines the frequency of updates of the game state. */
const TICK_MS = 1000;

/**
 * Contains all the game's components, and handles the main game loop.
 */
export default function FuyoClicker() {
    const intervalId = useRef<number | undefined>();
    const tick = useGameStore(state => state.tick);

    useEffect(() => {
        if (intervalId.current) return;

        tick();
        intervalId.current = window.setInterval(tick, TICK_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.container}>
            <Clicker className={classes.left} />
            <DndContext>
                <div className={classes.middle}>
                    <News />
                    <Lanes />
                </div>
                <div className={classes.right}>
                    <Reproduction />
                    <Shop />
                </div>
            </DndContext>
        </div>
    );
}
