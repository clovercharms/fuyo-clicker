import { HTMLProps, useMemo } from "react";
import { Stage, Container } from "@pixi/react";
import { BlurFilter } from "pixi.js";
import cx from "classix";
import { useElementSize } from "usehooks-ts";
import { useSettingsStore } from "@/stores/settings";

import { Quality } from "../news/settings/slice";

import { Coin } from "./coin";
import { Backdrop } from "./backdrop";
import { Header } from "./header";
import { Fuyonade } from "./boosts";
import { Hands } from "./hands";
import classes from "./index.module.css";

export function Clicker(props: HTMLProps<HTMLDivElement>) {
    const [elementRef, size] = useElementSize();
    const quality = useSettingsStore(settings => settings.quality);

    // [FIXME] Workound https://github.com/pixijs/pixi-react/issues/456
    useMemo(() => new BlurFilter(0), []);

    return (
        <div
            {...props}
            className={cx(classes.clicker, props.className)}
            ref={elementRef}
        >
            <Fuyonade />
            <Header />
            {size.width + size.height !== 0 && (
                <Stage
                    width={size.width}
                    height={size.height}
                    options={{
                        backgroundAlpha: 0,
                        autoDensity: true,
                    }}
                    className={classes.stage}
                >
                    {quality <= Quality.Medium && <Backdrop size={size} />}
                    <Container x={size.width / 2} y={size.height / 2}>
                        <Hands />
                        <Coin />
                    </Container>
                </Stage>
            )}
        </div>
    );
}
