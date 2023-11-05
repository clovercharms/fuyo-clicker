import { useGameStore } from "@/store";
import HeroClover from "@/components/clover/hero";
import { useDndMonitor, DragOverlay } from "@dnd-kit/core";
import { useState } from "react";
import classes from "./index.module.css";

export function Hero() {
    const spawn = useGameStore(state => state.repro.spawn);
    const spawned = useGameStore(state => state.repro.clovers.heroes.spawned);
    const [dragging, setDragging] = useState(false);

    useDndMonitor({
        onDragStart: () => setDragging(true),
        onDragEnd: () => setDragging(false),
    });

    return (
        <div className={classes.hero}>
            <button className={classes.spawn} onClick={spawn}>
                Spawn
            </button>
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
