import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useGameStore } from "../../store";
import Clover from "../clover";
import classes from "./index.module.css";
import { HTMLProps } from "react";
import { useCounter } from "../../hooks/counter";
import { Clover as IClover } from "../clover/slice";

/**
 * Spawning area for Clovers, ready to be assigned.
 */
export default function Reproduction(props: HTMLProps<HTMLDivElement>) {
    const repro = useGameStore(state => state.repro);
    const clover = useGameStore(state => state.clover);

    const { counterRef } = useCounter(
        repro.progress,
        repro.rateMs,
        false,
        false,
        { minimumFractionDigits: 3 }
    );

    /**
     * Handles state updates for dragging Clovers.
     * [FIXME] Separate this concern to elsewhere.
     */
    useDndMonitor({
        onDragStart: event =>
            clover.drag(event.active.data.current as IClover),
        onDragEnd: () => clover.drag(undefined),
    });

    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
        >
            <h1>Reproduction</h1>
            <h2>
                Progress: <span ref={counterRef} />
            </h2>
            <button onClick={repro.cheat}>Spawn</button>
            {Object.values(repro.clovers).map(clover => (
                <Clover key={clover.id} clover={clover} />
            ))}
            {/**
             * Clover drag visualization.
             * [FIXME] Separate this concern to elsewhere.
             */}
            <DragOverlay>
                {!!clover.dragged && (
                    <Clover clover={clover.dragged} style={{ zIndex: 1 }} />
                )}
            </DragOverlay>
        </div>
    );
}
