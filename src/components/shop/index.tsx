import { useGameStore } from "../../store";
import classes from "./index.module.css";
import { HTMLProps } from "react";
import { calculatePrice, data } from "./data";

/**
 * Shop for buying upgrades and advancements.
 */
export default function Shop(props: HTMLProps<HTMLDivElement>) {
    const shop = useGameStore(state => state.shop);

    /**
     * Handles shop specific behavior for purchasing items.
     * @param id The metadata id of the item to purchase.
     */
    const handleBuy = (id: number) => {
        const result = shop.buy(id);
        // [FIXME] Properly handle
        if (!result) alert("Insufficient coins");
    };

    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
        >
            <h1>Shop</h1>
            <ul className={classes.items}>
                {Object.entries(shop.items).map(([id, item]) => (
                    <li key={id} onClick={() => handleBuy(parseInt(id))}>
                        <div>
                            <div>{data[parseInt(id)].name}</div>
                            <div>
                                Price:{" "}
                                {calculatePrice(parseInt(id), item.purchased)}
                            </div>
                        </div>
                        <div className={classes.purchased}>
                            {item.purchased}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
