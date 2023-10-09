import classes from "./index.module.css";
import { HTMLProps, useMemo } from "react";
import Hands from "./hands";
import { Stage, Container } from "@pixi/react";
import { BlurFilter } from "pixi.js";
import Coin from "./coin";
import Backdrop from "./backdrop";
import Header from "./header";
import Fuyonade from "./boosts";
import cx from "classix";
import { useRect } from "../../hooks/useRect";

export default function Clicker(props: HTMLProps<HTMLDivElement>) {
    const { elementRef, rect } = useRect<HTMLDivElement>();

    // [FIXME] Workound https://github.com/pixijs/pixi-react/issues/456
    useMemo(() => new BlurFilter(0), []);

    return (
        <div
            {...props}
            className={cx(classes.clicker, props.className)}
            ref={elementRef}
        >
            <Fuyonade />
            <Header className={classes.header} />
            {rect !== null && (
                <Stage
                    width={rect.width}
                    height={rect.height}
                    options={{ backgroundAlpha: 0, autoDensity: true }}
                >
                    <Backdrop rect={rect} />
                    <Container x={rect.width / 2} y={rect.height / 2}>
                        <Hands />
                        <Coin />
                    </Container>
                </Stage>
            )}
        </div>
    );
}
