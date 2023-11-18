import { Container } from "@pixi/react-animated";
import { TextStyle } from "pixi.js";
import { easings, useSpring } from "react-spring";
import { Text } from "@pixi/react";
import { formatNumber } from "@/utils/numbers";

import { HINT_DURATION, HintProps } from "..";

export function Label({ x, y, amount }: HintProps) {
    const [spring] = useSpring(() => ({
        from: {
            y,
            alpha: 1,
        },
        to: {
            y: y - 50,
            alpha: 0,
        },
        config: {
            duration: HINT_DURATION,
            easing: easings.easeOutQuad,
        },
    }));

    return (
        <Container anchor={[0.5]} x={x} {...spring}>
            <Text
                anchor={[0.5]}
                x={0}
                y={0}
                text={`+${formatNumber(Math.floor(amount))}`}
                style={
                    new TextStyle({
                        fontFamily: "Subscribe",
                        fill: "#fff",
                        stroke: "#000",
                        strokeThickness: 3,
                    })
                }
            />
        </Container>
    );
}
