import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useGameStore } from "../../store";
import classes from "./index.module.css";
import { HTMLProps, useState } from "react";
import { formatNumber, useCounter } from "../../hooks/counter";
import { calculatePrice } from "./data";
import HeroClover from "../clover/hero";

/**
 * Spawning area for Clovers, ready to be assigned.
 */
export default function Reproduction(props: HTMLProps<HTMLDivElement>) {
    const repro = useGameStore(state => state.repro);
    const coins = useGameStore(state => state.coins.amount);

    const { counterRef: cloverCounterRef } = useCounter(
        repro.clovers.amount,
        repro.clovers.rateMs,
        true
    );

    const { counterRef: heroCloverCounterRef } = useCounter(
        repro.clovers.heroes.progress,
        repro.clovers.heroes.rateMs,
        false,
        false,
        { minimumFractionDigits: 3 }
    );

    useDndMonitor({
        onDragStart: () => setDragging(true),
        onDragEnd: () => setDragging(false),
    });

    const [dragging, setDragging] = useState(false);

    const handleUpgrade = () => {
        const result = repro.upgrade();
        if (!result) alert("insufficient coins");
    };

    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
        >
            <h1>Reproduction</h1>
            <div>
                <h2>
                    Clovers: <span ref={cloverCounterRef} />
                </h2>
                <h2>
                    Clover per second:{" "}
                    {formatNumber(repro.clovers.rateMs * 1e3, false, {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                    })}
                </h2>
                <div className={classes.clover}>
                    <button onClick={repro.click} />
                </div>
            </div>
            <hr />
            <div>
                <h2>Upgrade tier: {repro.clovers.tier}</h2>
                {(() => {
                    const upgradeCost = calculatePrice(repro.clovers.tier + 1);

                    return (
                        <button
                            onClick={handleUpgrade}
                            disabled={upgradeCost > coins}
                        >
                            Upgrade - cost{" "}
                            {calculatePrice(repro.clovers.tier + 1)}
                        </button>
                    );
                })()}
            </div>
            <hr />
            <div>
                <h2>
                    Hero Clovers progress: <span ref={heroCloverCounterRef} />
                </h2>
                <button className={classes.spawn} onClick={repro.spawn}>
                    Spawn
                </button>
                <div>
                    {repro.clovers.heroes.spawned && (
                        <HeroClover
                            id={repro.clovers.heroes.spawned.id}
                            job={repro.clovers.heroes.spawned.job}
                        />
                    )}
                </div>
                <DragOverlay>
                    {!!dragging && repro.clovers.heroes.spawned && (
                        <HeroClover
                            id={repro.clovers.heroes.spawned.id}
                            job={repro.clovers.heroes.spawned.job}
                            style={{ zIndex: 1 }}
                        />
                    )}
                </DragOverlay>
            </div>
        </div>
    );
}
