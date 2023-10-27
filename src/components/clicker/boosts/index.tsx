import cx from "classix";
import { useGameStore } from "@/store";
import classes from "./index.module.css";
import { BoostType } from "./data";

export default function Fuyonade() {
    const fuyonade = useGameStore(
        state => state.boosts.types[BoostType.FUYONADE]
    );
    const activate = useGameStore(state => state.boosts.activate);

    return (
        <div>
            <div
                className={classes.fuyonade}
                style={{
                    height: `${fuyonade.progress * 100}%`,
                }}
            />
            <div
                className={cx(
                    classes.overlay,
                    fuyonade.active && classes.active
                )}
            />
            <div className={classes.controls}>
                {!fuyonade.active && fuyonade.progress >= 1 && (
                    <button onClick={() => activate(BoostType.FUYONADE)}>
                        <h1>🌈 Spill 🌈</h1>
                    </button>
                )}
            </div>
        </div>
    );
}
