import { useGameStore } from "../../../store";
import classes from "./index.module.css";
import itemFrames from "../../../assets/images/shop/upgrades/item-frames";
import { HTMLProps, useMemo, useRef, useState } from "react";
import { Upgrade, UpgradeType, upgrades as data } from "./data";
import useTooltip from "../tooltip/useTooltip";
import Tooltip from "../tooltip";
import {
    xoroshiro128plus,
    unsafeUniformIntDistribution as dist,
} from "pure-rand";
import { formatNumber } from "../../../hooks/counter";

const RNG_SEED = 15;

/**
 * Upgrades panel that can be used to buy upgrades to further progress the game.
 */
export default function Upgrades(props: HTMLProps<HTMLDivElement>) {
    const game = useGameStore();
    const upgrades = useGameStore(state => state.upgrades);
    const containerRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<{
        id: number;
        type: UpgradeType;
    } | null>(null);
    const {
        anchor: [anchor, setAnchor],
        coords: [coords, setCoords],
    } = useTooltip();
    const rand = xoroshiro128plus(RNG_SEED);

    const activeUpgrades = useMemo(
        () =>
            Object.keys(data).reduce(
                (prev, type: unknown) => ({
                    ...prev,
                    [type as UpgradeType]: Object.entries(
                        data[type as UpgradeType]
                    ).reduce(
                        (prev, [id, upgrade]) => ({
                            ...prev,
                            ...(upgrade.condition(game) &&
                            !upgrades.unlocked[type as UpgradeType][
                                parseInt(id)
                            ]
                                ? {
                                      [id]: upgrade,
                                  }
                                : {}),
                        }),
                        {} as Record<number, Upgrade>
                    ),
                }),
                {} as Record<UpgradeType, Record<number, Upgrade>>
            ),
        [game, upgrades.unlocked]
    );

    /**
     * Handles shop specific behavior for purchasing items.
     * @param id The metadata id of the item to purchase.
     */
    const handleBuy = (type: UpgradeType, id: number) => {
        const result = upgrades.buy(type, id);
        // [FIXME] Properly handle
        if (!result) alert("Insufficient coins");
    };

    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
            ref={containerRef}
        >
            <div
                className={classes.upgrades}
                onMouseLeave={() => setActive(null)}
                ref={setAnchor}
            >
                {Object.values(activeUpgrades).reduce(
                    (prev, curr) => prev + Object.keys(curr).length,
                    0
                ) === 0 ? (
                    <span className={classes.placeholder} />
                ) : (
                    <></>
                )}
                {Object.entries(activeUpgrades).map(([type, upgrades]) =>
                    Object.entries(upgrades).map(([id, upgrade]) => (
                        <button
                            key={type + id}
                            onClick={() =>
                                handleBuy(
                                    type as unknown as UpgradeType,
                                    parseInt(id)
                                )
                            }
                            onMouseEnter={e => {
                                setActive({
                                    id: parseInt(id),
                                    type: type as unknown as UpgradeType,
                                });
                                setCoords({ x: e.clientX, y: e.clientY });
                            }}
                            className={classes.upgrade}
                            style={{
                                backgroundImage: `url(${upgrade.image}), url(${
                                    itemFrames[Math.round(dist(0, 4, rand))]
                                })`,
                                transform: `rotateZ(${dist(-12, 12, rand)}deg)`,
                            }}
                        />
                    ))
                )}
            </div>
            {active !== null && (
                <Tooltip anchor={anchor!} initialCoords={coords!}>
                    <h1>{data[active.type][active.id].name}</h1>
                    <h2>
                        {formatNumber(data[active.type][active.id].price, true)}
                    </h2>
                    <h2>{data[active.type][active.id].description}</h2>
                </Tooltip>
            )}
        </div>
    );
}
