import {
    countUnlockedUpgrades,
    calcBoostFactor,
    calcClickerRate,
    countBuildings,
    calcLanesRate,
    CLICKER_RATE_MS,
} from "@/components/clicker/calc";
import { formatNumber } from "@/utils/numbers";
import { Currency, items } from "../../data";
import { lanes as lanesData } from "@/components/lanes/lane/data";
import Tooltip, { TooltipProps } from "..";
import { useGameStore } from "@/store";
import { memo } from "react";
import classes from "./index.module.css";
import Price from "@/components/price";

export interface ProductionProps extends TooltipProps {
    itemId: number;
}

export const ProductionTooltip = memo(
    function Production({ itemId, ...props }: ProductionProps) {
        const coins = useGameStore(state => state.coins);
        const lanes = useGameStore(state => state.lanes.types);
        const unlockedUpgrades = useGameStore(state => state.upgrades.unlocked);
        const boosts = useGameStore(state => state.boosts.types);
        const upgrades = countUnlockedUpgrades(unlockedUpgrades);
        const isClicker = items[itemId].laneType === undefined;

        // Calculate total production.
        let productionSec = 0;
        if (isClicker) {
            productionSec =
                calcClickerRate(
                    coins.clickers,
                    unlockedUpgrades,
                    countBuildings(lanes)
                ) * 1e3;
        } else {
            productionSec =
                calcLanesRate(lanes, upgrades)[items[itemId].laneType!] * 1e3;
        }

        // Calculate single unit production.
        let singleProductionSec = 0;
        if (isClicker) {
            if (coins.clickers === 0) {
                singleProductionSec = CLICKER_RATE_MS * 1e3;
            } else {
                singleProductionSec = productionSec / coins.clickers;
            }
        } else {
            const buildings = lanes[items[itemId].laneType!].buildings;
            if (buildings === 0) {
                singleProductionSec =
                    lanesData[items[itemId].laneType!].rateMs * 1e3;
            } else {
                singleProductionSec = productionSec / buildings;
            }
        }

        // Boosts
        const boostFactor = calcBoostFactor(boosts);

        const totalPercentage =
            productionSec === 0
                ? 0
                : formatNumber(
                      ((productionSec * boostFactor) / (coins.rateMs * 1e3)) *
                          1e2
                  );

        return (
            <Tooltip {...props}>
                <div>
                    <h1>{items[itemId].name}</h1>
                    <h2>
                        Produces{" "}
                        <Price
                            amount={singleProductionSec * boostFactor}
                            currency={Currency.COINS}
                        />{" "}
                        per second
                    </h2>
                </div>
                <hr />
                <div className={classes.stats}>
                    <h3>
                        Total production{" "}
                        <Price
                            amount={productionSec * boostFactor}
                            currency={Currency.COINS}
                        />{" "}
                        per second
                    </h3>
                    <h3>{totalPercentage}% of total coins per second</h3>
                </div>
            </Tooltip>
        );
    },
    (prev, next) => prev.itemId === next.itemId
);
