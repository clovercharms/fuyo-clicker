import { useGameStore } from "@/stores/game";
import classes from "./index.module.css";
import kiss from "@/assets/images/clover/base/regular/kiss.png";

export function Partners() {
    const tier = useGameStore(state => state.repro.clovers.tier);

    return (
        <div className={classes.partners}>
            <img src={kiss} style={{ opacity: tier > 0 ? 1 : 0 }} />
            <img src={kiss} style={{ opacity: tier > 5 ? 1 : 0 }} />
            <img src={kiss} style={{ opacity: tier > 10 ? 1 : 0 }} />
            <img src={kiss} style={{ opacity: tier > 15 ? 1 : 0 }} />
            <img src={kiss} style={{ opacity: tier > 20 ? 1 : 0 }} />
        </div>
    );
}
