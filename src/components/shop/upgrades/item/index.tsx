import { UpgradeType, upgrades } from "../data";
import { ActiveUpgrade } from "..";
import { Coords } from "@floating-ui/dom";
import cx from "classix";
import itemFrames from "@/assets/images/shop/upgrades/item-frames";
import {
    xoroshiro128plus,
    unsafeUniformIntDistribution as dist,
} from "pure-rand";
import classes from "./index.module.css";

export interface ItemProps {
    type: UpgradeType;
    id: number;
    affordable: boolean;
    onBuy: (type: UpgradeType, id: number) => void;
    setActive: (upgrade: ActiveUpgrade | null) => void;
    setCoords: (coords: Coords | null) => void;
}

export function Item({
    type,
    id,
    affordable,
    setActive,
    onBuy,
    setCoords,
}: ItemProps) {
    const rand = xoroshiro128plus(type + id);

    return (
        <button
            onClick={() =>
                affordable && onBuy(type as unknown as UpgradeType, Number(id))
            }
            onMouseEnter={e => {
                setActive({
                    id: Number(id),
                    type: type as unknown as UpgradeType,
                });
                setCoords({
                    x: e.clientX,
                    y: e.clientY,
                });
            }}
            onMouseLeave={() => setActive(null)}
            className={cx(classes.upgrade, !affordable && classes.hidden)}
            style={{
                backgroundImage: `url(${upgrades[type][id].image}), url(${
                    itemFrames[Math.round(dist(0, itemFrames.length - 1, rand))]
                })`,
                transform: `rotateZ(${dist(-12, 12, rand)}deg)`,
            }}
        />
    );
}
