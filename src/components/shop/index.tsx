import { useGameStore } from "../../store";
import classes from "./index.module.css";
import { HTMLProps, useMemo, useRef, useState } from "react";
import { Currency, calculatePrice, items } from "./item/data";
import Upgrades from "./upgrades";
import Tooltip from "./tooltip";
import useTooltip from "./tooltip/useTooltip";
import Item from "./item";
import { calcLanesRate, countUnlockedUpgrades } from "../clicker/calc";

/**
 * Shop for buying upgrades and advancements.
 */
export default function Shop(props: HTMLProps<HTMLDivElement>) {
    const shop = useGameStore(state => state.shop);
    const coins = useGameStore(state => state.coins);
    const clovers = useGameStore(state => state.repro.clovers.amount);
    const lanes = useGameStore(state => state.lanes.types);
    const unlockedUpgrades = useGameStore(state => state.upgrades.unlocked);

    const containerRef = useRef<HTMLDivElement>(null);
    const [activeId, setActiveId] = useState<number | null>(null);

    const {
        anchor: [anchor, setAnchor],
        coords: [coords, setCoords],
    } = useTooltip();

    const laneProduction = useMemo(() => {
        const upgrades = countUnlockedUpgrades(unlockedUpgrades);
        return calcLanesRate(lanes, upgrades);
    }, [unlockedUpgrades, lanes]);

    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
            ref={containerRef}
        >
            <div className={classes.header} />
            <Upgrades />
            <ul
                className={classes.items}
                onMouseLeave={() => setActiveId(null)}
                ref={setAnchor}
            >
                {Object.entries(shop.unlockedItems()).map(([id, item]) => {
                    const price = calculatePrice(
                        id as unknown as number,
                        item.purchased
                    );
                    const itemData = items[id as unknown as number];
                    const affordable =
                        (itemData.price.currency === Currency.COINS
                            ? coins.amount
                            : clovers) >= price;

                    return (
                        <Item
                            key={id}
                            item={items[id as unknown as number]}
                            price={price}
                            affordable={affordable}
                            purchased={item.purchased}
                            onClick={() =>
                                affordable && shop.buy(id as unknown as number)
                            }
                            onMouseEnter={e => {
                                setActiveId(id as unknown as number);
                                setCoords({ x: e.clientX, y: e.clientY });
                            }}
                        />
                    );
                })}
            </ul>
            {activeId !== null && (
                <Tooltip anchor={anchor!} initialCoords={coords!}>
                    <h1>{items[activeId].name}</h1>
                    {items[activeId].laneType !== undefined && (
                        <>
                            <h2>
                                Production{" "}
                                {laneProduction[items[activeId].laneType!] *
                                    1e3}{" "}
                                per second
                            </h2>
                            <h2>
                                Production{" "}
                                {(
                                    (laneProduction[items[activeId].laneType!] /
                                        coins.rateMs) *
                                    1e2
                                ).toFixed(1)}{" "}
                                % of total coins per second
                            </h2>
                        </>
                    )}
                </Tooltip>
            )}
        </div>
    );
}
