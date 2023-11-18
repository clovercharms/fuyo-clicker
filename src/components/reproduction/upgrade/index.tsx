import { Button, Variant } from "@/components/button";
import { Price } from "@/components/price";
import { Currency } from "@/components/shop/data";
import { Sound } from "@/utils/audio/sounds";
import { useGameStore } from "@/stores/game";
import { useSettingsStore } from "@/stores/settings";

import { calculatePrice } from "../data";
import { SMOOCHES } from "..";

import classes from "./index.module.css";

export function Upgrade() {
    const play = useSettingsStore(settings => settings.audio.play);
    const tier = useGameStore(state => state.repro.clovers.tier);
    const coins = useGameStore(state => state.coins.amount);
    const upgrade = useGameStore(state => state.repro.upgrade);

    const upgradeCost = calculatePrice(tier + 1);

    const handleUpgrade = () => {
        if (!upgrade()) return;
        void play(Sound.Kaching);
        void play(SMOOCHES[Math.floor(Math.random() * SMOOCHES.length)]);
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
