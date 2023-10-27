import {
    countUnlockedUpgrades,
    calcBoostFactor,
    calcClickerRate,
    countBuildings,
    calcLanesRate,
} from "@/components/clicker/calc";
import { formatNumber } from "@/utils/numbers";
import { items } from "../../item/data";
import Tooltip, { TooltipProps } from "..";
import { useGameStore } from "@/store";
import { memo } from "react";

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
        const boostFactor = calcBoostFactor(boosts);
        const production =
            (items[itemId].laneType === undefined
                ? calcClickerRate(
                      coins.clickers,
                      unlockedUpgrades,
                      countBuildings(lanes)
                  )
                : calcLanesRate(lanes, upgrades)[items[itemId].laneType!]) *
            boostFactor *
            1e3;

        return (
            <Tooltip {...props}>
                <h1>{items[itemId].name}</h1>
                <h2>Production {formatNumber(production)} per second</h2>
                <h2>
                    Production{" "}
                    {production === 0
                        ? 0
                        : formatNumber(
                              (production / (coins.rateMs * 1e3)) * 1e2
                          )}{" "}
                    % of total coins per second
                </h2>
            </Tooltip>
        );
    },
    (prev, next) => prev.itemId === next.itemId
);
