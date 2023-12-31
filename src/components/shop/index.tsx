import { useGameStore } from "@/stores/game";
import { HTMLProps, forwardRef, useState } from "react";
import cx from "classix";
import { Sound } from "@/utils/audio/sounds";
import { useSettingsStore } from "@/stores/settings";

import { countBuildings } from "../clicker/calc";

import classes from "./index.module.css";
import { Currency, calculatePrice, items } from "./data";
import { Upgrades } from "./upgrades";
import { useTooltip } from "./tooltip/useTooltip";
import { Item } from "./item";
import { ProductionTooltip } from "./tooltip/production-tooltip";

const TOTAL_TIERS = 4;
const TIER_TOTAL_BUILDINGS = 16 * 10;

/**
 * Shop for buying upgrades and advancements.
 */
export const Shop = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
    function Shop(props, ref) {
        const shop = useGameStore(state => state.shop);
        const coins = useGameStore(state => state.coins);
        const clovers = useGameStore(state => state.repro.clovers.amount);
        const play = useSettingsStore(settings => settings.audio.play);
        const [activeId, setActiveId] = useState<number | null>(null);
        const {
            anchor: [anchor, setAnchor],
            coords: [coords, setCoords],
        } = useTooltip();
        const tier = useGameStore(state =>
            Math.round(
                (countBuildings(state.lanes.types) / TIER_TOTAL_BUILDINGS) *
                    TOTAL_TIERS
            )
        );

        const handleBuy = (id: number) => {
            if (!shop.buy(id)) return;

            void play(Sound.Kaching);

            if (!items[id].sounds?.length) return;

            const randomSound =
                items[id].sounds![
                    Math.floor(Math.random() * items[id].sounds!.length)
                ];
            void play(randomSound, { volume: 1 });
        };

        return (
            <div
                {...props}
                ref={ref}
                className={cx(classes.shop, props.className)}
            >
                <div className={classes.header}>
                    <div className={classes.background} />
                    <div
                        className={cx(
                            classes.boxes,
                            tier > 0 && classes[tier],
                            tier > TOTAL_TIERS && classes[TOTAL_TIERS]
                        )}
                    />
                    <div className={classes.clover} />
                </div>
                <Upgrades />
                <ul
                    className={classes.items}
                    onMouseLeave={() => setActiveId(null)}
                    ref={setAnchor}
                >
                    {Object.entries(shop.unlocked)
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
                                        affordable &&
                                        handleBuy(id as unknown as number)
                                    }
                                    onMouseEnter={e => {
                                        setActiveId(id as unknown as number);
                                        setCoords({
                                            x: e.clientX,
                                            y: e.clientY,
                                        });
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
);
