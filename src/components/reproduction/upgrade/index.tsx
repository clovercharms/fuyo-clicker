import { Button, Variant } from "@/components/button";
import Price from "@/components/price";
import { Currency } from "@/components/shop/data";
import { useAudio } from "@/context/audio";
import { Sound } from "@/context/audio/sounds";
import { useGameStore } from "@/store";
import { calculatePrice } from "../data";
import classes from "./index.module.css";
import { SMOOCHES } from "..";

export function Upgrade() {
    const audio = useAudio();
    const tier = useGameStore(state => state.repro.clovers.tier);
    const coins = useGameStore(state => state.coins.amount);
    const upgrade = useGameStore(state => state.repro.upgrade);

    const upgradeCost = calculatePrice(tier + 1);

    const handleUpgrade = () => {
        if (!upgrade()) return;
        void audio.play(Sound.Kaching);
        void audio.play(SMOOCHES[Math.floor(Math.random() * SMOOCHES.length)]);
    };

    return (
        <div className={classes.upgrade}>
            <Button
                variant={Variant.THIN}
                onClick={handleUpgrade}
                disabled={upgradeCost > coins}
            >
                <div>
                    Upgrade -{" "}
                    <Price amount={upgradeCost} currency={Currency.COINS} />
                </div>
            </Button>
        </div>
    );
}
