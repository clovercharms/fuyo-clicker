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
import { useAudio } from "@/context/audio";
import { useElementSize } from "usehooks-ts";

export default function Clicker(props: HTMLProps<HTMLDivElement>) {
    const [elementRef, size] = useElementSize();
    const audio = useAudio();

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
            {size.width && size.height !== 0 && (
                <Stage
                    width={size.width}
                    height={size.height}
                    options={{ backgroundAlpha: 0, autoDensity: true }}
                >
                    <Backdrop size={size} />
                    <Container x={size.width / 2} y={size.height / 2}>
                        <Hands />
                        <Coin audio={audio} />
                    </Container>
                </Stage>
            )}
        </div>
    );
}
