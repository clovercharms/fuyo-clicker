import { DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { useGameStore } from '../../store';
import Clover from '../clover';
import classes from "./index.module.css";
import { HTMLProps, useState } from "react";
import { useCounter } from '../../hooks/counter';

/**
 * Spawning area for Clovers, ready to be assigned.
 */
export default function Reproduction(props: HTMLProps<HTMLDivElement>) {
    const repro = useGameStore(state => state.repro);
    const { counterRef } = useCounter(repro.progress, repro.rateMs, 1);

    const [activeId, setActiveId] = useState<number | undefined>(undefined);
    useDndMonitor({
        onDragStart: event => setActiveId(event.active.id as number),
        onDragEnd: () => setActiveId(undefined)
    });

    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
        >
            <h1>Reproduction</h1>
            <h2>Production: <span ref={counterRef}/></h2>
            {Object.values(repro.clovers).map(clover => (
                <Clover key={clover.id} clover={clover} />
            ))}
            <DragOverlay>
                {!!activeId && <Clover clover={repro.clovers[activeId]} style={{ zIndex: 1 }}/>}
            </DragOverlay>
        </div>
    );
}
