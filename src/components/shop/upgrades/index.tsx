import { useGameStore } from "@/store";
import classes from "./index.module.css";
import itemFrames from "@/assets/images/shop/upgrades/item-frames";
import { HTMLProps, useMemo, useRef, useState } from "react";
import { Upgrade, UpgradeType, upgrades as data } from "./data";
import useTooltip from "../tooltip/useTooltip";
import Tooltip from "../tooltip";
import {
    xoroshiro128plus,
    unsafeUniformIntDistribution as dist,
} from "pure-rand";
import Price from "../../price";
import { Currency } from "../item/data";
import { useAudio } from "@/context/audio";
import { Sound } from "@/context/audio/sounds";

const RNG_SEED = 15;

/**
 * Upgrades panel that can be used to buy upgrades to further progress the game.
 */
export default function Upgrades(props: HTMLProps<HTMLDivElement>) {
    const game = useGameStore();
    const upgrades = useGameStore(state => state.upgrades);
    const { play } = useAudio();
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

    const handleBuy = (type: UpgradeType, id: number) => {
        const success = upgrades.buy(type, id);
        if (success) play(Sound.Kaching);
    };

    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
            ref={containerRef}
        >
            <div
                className={classes.upgrades}
                ref={setAnchor}
                onMouseLeave={() => setActive(null)}
            >
                {Object.entries(activeUpgrades).map(([type, upgrades2]) =>
                    Object.entries(upgrades2).map(([id, upgrade]) => (
                        <button
                            key={type + id}
                            onClick={() =>
                                handleBuy(
                                    type as unknown as UpgradeType,
                                    Number(id)
                                )
                            }
                            onMouseEnter={e => {
                                setActive({
                                    id: parseInt(id),
                                    type: type as unknown as UpgradeType,
                                });
                                setCoords({ x: e.clientX, y: e.clientY });
                            }}
                            onMouseLeave={() => setActive(null)}
                            className={classes.upgrade}
                            style={{
                                backgroundImage: `url(${upgrade.image}), url(${
                                    itemFrames[
                                        Math.round(
                                            dist(0, itemFrames.length - 1, rand)
                                        )
                                    ]
                                })`,
                                transform: `rotateZ(${dist(-12, 12, rand)}deg)`,
                            }}
                        />
                    ))
                )}
                <span className={classes.placeholder} />
            </div>
            {active !== null && (
                <Tooltip anchor={anchor!} initialCoords={coords!}>
                    <h1>{data[active.type][active.id].name}</h1>
                    <h2>
                        <Price
                            amount={data[active.type][active.id].price}
                            currency={Currency.COINS}
                        />
                    </h2>
                    <h2>{data[active.type][active.id].description}</h2>
                </Tooltip>
            )}
        </div>
    );
}
