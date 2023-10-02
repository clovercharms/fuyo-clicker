import classes from "./index.module.css";
import { HTMLProps, useRef, useState, useLayoutEffect, useMemo } from "react";
import Hands from "./hands";
import { Stage, Container } from "@pixi/react";
import { BlurFilter } from "pixi.js";
import Coin from "./coin";
import Backdrop from "./backdrop";
import Header from "./header";
import Fuyonade from './boosts';

export default function Clicker(props: HTMLProps<HTMLDivElement>) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rect, setRect] = useState<DOMRect | null>(null);

    // [FIXME] Workound https://github.com/pixijs/pixi-react/issues/456
    useMemo(() => new BlurFilter(0), []);

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const handler = () =>
            setRect(containerRef.current!.getBoundingClientRect());
        const observer = new ResizeObserver(handler);
        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
            ref={containerRef}
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
