import { useGameStore } from "@/stores/game";
import classes from "./index.module.css";
import { HTMLProps, useRef, useState } from "react";
import { UpgradeType, upgrades as data } from "./data";
import useTooltip from "../tooltip/useTooltip";
import Tooltip from "../tooltip";
import Price from "../../price";
import { Currency } from "../data";
import { Sound } from "@/utils/audio/sounds";
import { useSettingsStore } from "@/stores/settings";
import { Item } from "./item";
import cx from "classix";

const UPGRADES_PER_ROW = 5;

export interface ActiveUpgrade {
    id: number;
    type: UpgradeType;
}

/**
 * Upgrades panel that can be used to buy upgrades to further progress the game.
 */
export default function Upgrades(props: HTMLProps<HTMLDivElement>) {
    const upgrades = useGameStore(state => state.upgrades);
    const coins = useGameStore(state => state.coins.amount);
    const play = useSettingsStore(settings => settings.audio.play);
    const containerRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<ActiveUpgrade | null>(null);
    const {
        anchor: [anchor, setAnchor],
        coords: [coords, setCoords],
    } = useTooltip();
    const activeUpgrades = upgrades.active();
    const totalActiveUpgrades = Object.entries(activeUpgrades).reduce(
        (total, [, upgrade]) => total + Object.keys(upgrade).length,
        0
    );

    const handleBuy = (type: UpgradeType, id: number) => {
        if (!upgrades.buy(type, id)) return;
        void play(Sound.Kaching);
    };

    return (
        <>
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
                    <div
                        className={cx(
                            classes.items,
                            totalActiveUpgrades > UPGRADES_PER_ROW &&
                                classes.expandable
                        )}
                    >
                        {Object.entries(activeUpgrades).map(
                            ([type, upgrades]) =>
                                Object.entries(upgrades).map(
                                    ([id, upgrade]) => (
                                        <Item
                                            key={Number(type) + Number(id)}
                                            type={
                                                type as unknown as UpgradeType
                                            }
                                            id={Number(id)}
                                            affordable={coins >= upgrade.price}
                                            onBuy={handleBuy}
                                            setActive={setActive}
                                            setCoords={setCoords}
                                        />
                                    )
                                )
                        )}
                    </div>
                </div>
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
                    <h3>{data[active.type][active.id]?.description}</h3>
                </Tooltip>
            )}
        </>
    );
}
