import { useGameStore } from "@/store";
import classes from "./index.module.css";
import { HTMLProps, useRef, useState } from "react";
import { Currency, calculatePrice, items } from "./item/data";
import Upgrades from "./upgrades";
import useTooltip from "./tooltip/useTooltip";
import Item from "./item";
import cx from "classix";
import { useAudio } from "@/context/audio";
import { Sound } from "@/context/audio/sounds";
import { ProductionTooltip } from "./tooltip/production-tooltip";

/**
 * Shop for buying upgrades and advancements.
 */
export default function Shop(props: HTMLProps<HTMLDivElement>) {
    const shop = useGameStore(state => state.shop);
    const coins = useGameStore(state => state.coins);
    const clovers = useGameStore(state => state.repro.clovers.amount);
    const { play } = useAudio();

    const containerRef = useRef<HTMLDivElement>(null);
    const [activeId, setActiveId] = useState<number | null>(null);

    const {
        anchor: [anchor, setAnchor],
        coords: [coords, setCoords],
    } = useTooltip();

    const handleBuy = (affordable: boolean, id: number) => {
        if (!affordable) return;

        shop.buy(id);
        play(Sound.Kaching);
    };

    return (
        <div
            {...props}
            className={cx(classes.shop, props.className)}
            ref={containerRef}
        >
            <div className={classes.header} />
            <Upgrades />
            <ul
                className={classes.items}
                onMouseLeave={() => setActiveId(null)}
                ref={setAnchor}
            >
                {Object.entries(shop.unlockedItems())
                    .filter(([, unlocked]) => !!unlocked)
                    .map(([id]) => {
                        const item = shop.items[id as unknown as number];
                        const price = calculatePrice(
                            id as unknown as number,
                            item.purchased
                        );
                        const data = items[id as unknown as number];
                        const affordable =
                            (data.price.currency === Currency.COINS
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
                                    handleBuy(
                                        affordable,
                                        id as unknown as number
                                    )
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
                <ProductionTooltip
                    anchor={anchor!}
                    initialCoords={coords!}
                    itemId={activeId}
                />
            )}
        </div>
    );
}
