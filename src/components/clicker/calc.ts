import { CloverType } from "../clover/data";
import { LaneType, calculateLaneRate } from "../lanes/lane/data";
import { Lane } from "../lanes/slice";
import { LaneTypeUpgradeType, UpgradeType } from "../shop/upgrades/data";

import { BoostType, determineBoost } from "./boosts/data";
import { Boost } from "./boosts/slice";

/** Rate of production per auto clicker in milliseconds */
export const CLICKER_RATE_MS = 0.0001;
export const DOUBLING_CLICKER_UPGRADES = 3;
export const COOKIES_RATE_PER_NON_CURSOR_BUILDING = 1 / 1e4;

export function countUnlockedUpgrades(
    unlockedUpgrades: Record<UpgradeType, Record<number, boolean>>
) {
    return Object.entries(unlockedUpgrades).reduce(
        (prev, [type, unlocked]) => ({
            ...prev,
            [type as unknown as UpgradeType]: Object.keys(unlocked).length,
        }),
        {} as Record<UpgradeType, number>
    );
}

export function countBuildings(lanes: Record<LaneType, Lane>) {
    let totalBuildings = 0;
    for (const type of Object.values(LaneType).filter(
        t => typeof t === "number"
    )) {
        totalBuildings += lanes[type as LaneType].buildings;
    }

    return totalBuildings;
}

export function calcLanesRate(
    lanes: Record<LaneType, Lane>,
    upgrades: Record<UpgradeType, number>
) {
    const ratesMs = {} as Record<LaneType, number>;

    for (const type of Object.values(LaneType).filter(
        t => typeof t === "number"
    )) {
        const lane = lanes[type as LaneType];
        ratesMs[type as LaneType] = calculateLaneRate(
            type as LaneType,
            lane.buildings,
            upgrades[LaneTypeUpgradeType[type as LaneType]!],
            lane.clovers[CloverType.Hero].length
        );
    }

    return ratesMs;
}

export function calcThousandFingerRate(
    upgrades: Record<UpgradeType, Record<number, boolean>>,
    totalBuildings: number
) {
    const thousandUpgrades = Object.entries(
        upgrades[UpgradeType.Clicker]
    ).filter(([id, unlocked]) => unlocked && parseInt(id) > 2).length;
    if (thousandUpgrades === 0) return 0;

    let thousandRateMs = 0;

    thousandRateMs = totalBuildings * COOKIES_RATE_PER_NON_CURSOR_BUILDING;

    // Multipliers
    switch (thousandUpgrades) {
        case 1:
            break;
        case 2:
            thousandRateMs *= 5;
            break;
        case 3:
            thousandRateMs *= 10;
            break;
        default:
            thousandRateMs *= 20 ** DOUBLING_CLICKER_UPGRADES - 2;
            break;
    }

    return thousandRateMs;
}

export function calcClickerRate(
    clickers: number,
    unlockedUpgrades: Record<UpgradeType, Record<number, boolean>>,
    totalBuildings: number
) {
    const doublingUpgrades = Object.entries(
        unlockedUpgrades[UpgradeType.Clicker]
    ).filter(([id, unlocked]) => unlocked && parseInt(id) < 3).length;

    let rateMs = clickers * CLICKER_RATE_MS * 2 ** doublingUpgrades;

    rateMs += calcThousandFingerRate(unlockedUpgrades, totalBuildings);

    return rateMs;
}

export function calcBoostFactor(boosts: Record<BoostType, Boost>) {
    let factor = 1;
    for (const type of Object.values(BoostType).filter(
        t => typeof t === "number"
    )) {
        const boost = boosts[type as BoostType];
        factor *= determineBoost(type as BoostType, boost);
    }
    return factor;
}

export function calcClickAmount(
    upgrades: Record<UpgradeType, Record<number, boolean>>,
    lanes: Record<LaneType, Lane>,
    clickers: number
) {
    const unlockedUpgrades = countUnlockedUpgrades(upgrades);
    const totalBuildings = countBuildings(lanes);

    // Clickers
    const doublingUpgrades = Object.entries(
        upgrades[UpgradeType.Clicker]
    ).filter(([id, unlocked]) => unlocked && parseInt(id) < 3).length;

    let amount = 1 * 2 ** doublingUpgrades;

    // Thousand fingers
    const thousandRateMs = calcThousandFingerRate(upgrades, totalBuildings);
    amount += thousandRateMs * 1e3;

    // Cursors
    if (unlockedUpgrades[UpgradeType.Cursor] > 0) {
        const rateSec = calcRateMs(upgrades, lanes, clickers) * 1e3;
        // Base rate 30%
        let percentage = 0.3;
        if (unlockedUpgrades[UpgradeType.Cursor] > 1) {
            // 10% After every upgrade
            percentage += (unlockedUpgrades[UpgradeType.Cursor] - 1) * 0.1;
        }
        const total = percentage * rateSec;
        amount += total;
    }

    return amount;
}

export function calcRateMs(
    unlockedUpgrades: Record<UpgradeType, Record<number, boolean>>,
    lanes: Record<LaneType, Lane>,
    clickers: number,
    boosts?: Record<BoostType, Boost>
) {
    // Start rate calculation
    let rateMs = 0;

    // Lanes
    const upgrades = countUnlockedUpgrades(unlockedUpgrades);
    const laneRateMs = calcLanesRate(lanes, upgrades);
    rateMs += Object.values(laneRateMs).reduce(
        (total, lane) => total + lane,
        0
    );

    // Clickers
    rateMs += calcClickerRate(
        clickers,
        unlockedUpgrades,
        countBuildings(lanes)
    );

    // Boosts
    if (boosts) {
        rateMs *= calcBoostFactor(boosts);
    }

    return rateMs;
}
