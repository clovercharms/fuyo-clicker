import { useGameStore } from "@/stores/game";
import HeroClover from "@/components/clover/hero";
import { useDndMonitor, DragOverlay } from "@dnd-kit/core";
import { useState } from "react";
import classes from "./index.module.css";
import { Button } from "@/components/button";
import { useSettingsStore } from "@/stores/settings";

export function Hero() {
    const spawn = useGameStore(state => state.repro.spawn);
    const spawned = useGameStore(state => state.repro.clovers.heroes.spawned);
    const debug = useSettingsStore(state => state.debug);
    const [dragging, setDragging] = useState(false);

    useDndMonitor({
        onDragStart: () => setDragging(true),
        onDragEnd: () => setDragging(false),
    });

    return (
        <div className={classes.hero}>
            {debug && (
                <Button className={classes.spawn} onClick={spawn}>
                    Spawn
                </Button>
            )}
            {spawned && (
                <HeroClover
                    className={classes.clover}
                    style={{ opacity: dragging ? 0 : 1 }}
                    id={spawned.id}
                    job={spawned.job}
                />
            )}
            <DragOverlay>
                {!!dragging && spawned && (
                    <HeroClover
                        className={classes.clover}
                        id={spawned.id}
                        job={spawned.job}
                        style={{ zIndex: 1 }}
                    />
                )}
            </DragOverlay>
        </div>
    );
}
