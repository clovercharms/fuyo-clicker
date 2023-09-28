import { useGameStore } from "../../store";
import classes from "./index.module.css";
import { HTMLProps, useRef, useState } from "react";
import { calculatePrice, items } from "./data";
import Upgrades from "./upgrades";
import Tooltip from "./tooltip";
import useTooltip from "./tooltip/useTooltip";
import { formatNumber } from "../../hooks/counter";

/**
 * Shop for buying upgrades and advancements.
 */
export default function Shop(props: HTMLProps<HTMLDivElement>) {
    const shop = useGameStore(state => state.shop);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeId, setActiveId] = useState<number | null>(null);
    const {
        anchor: [anchor, setAnchor],
        coords: [coords, setCoords],
    } = useTooltip();

    /**
     * Handles shop specific behavior for purchasing items.
     * @param id The metadata id of the item to purchase.
     */
    const handleBuy = (id: number) => {
        const result = shop.buy(id);
        // [FIXME] Properly handle
        if (!result) alert("Insufficient clovers");
    };

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
                {Object.entries(shop.items).map(([id, item]) => (
                    <li
                        key={id}
                        onClick={() => handleBuy(parseInt(id))}
                        onMouseEnter={e => {
                            setActiveId(parseInt(id));
                            setCoords({ x: e.clientX, y: e.clientY });
                        }}
                    >
                        <div>
                            <div>{items[parseInt(id)].name}</div>
                            <div>
                                Price:{" "}
                                {formatNumber(
                                    calculatePrice(
                                        parseInt(id),
                                        item.purchased
                                    ),
                                    true
                                )}
                            </div>
                        </div>
                        <div className={classes.purchased}>
                            {item.purchased}
                        </div>
                    </li>
                ))}
            </ul>
            {activeId !== null && (
                <Tooltip anchor={anchor!} initialCoords={coords!}>
                    <h1>{items[activeId].name}</h1>
                </Tooltip>
            )}
        </div>
    );
}
