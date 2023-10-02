import { easings, useSpring } from 'react-spring';
import { HINT_DURATION, HintProps } from '..';
import { Sprite } from '@pixi/react-animated';
import coin from "../../../../../assets/images/fuyo-coin.png";

export default function Coin({ x, y }: HintProps) {
    const [spring] = useSpring(() => {
        const xOffset = -25 + Math.random() * 50;
        const rotation = -Math.PI + (Math.random() * (Math.PI * 2));
        return {
            from: {
                x,
                y,
                alpha: 1,
                rotation: 0,
            },
            to: [{
                x,
                y: y - 20,
                rotation: rotation * 0.5,
                config: {
                    duration: HINT_DURATION * 0.25,
                },
            },{
                x: x + xOffset,
                y: y + 20,
                alpha: 0,
                rotation: rotation,
                config: {
                    duration: HINT_DURATION * 0.75,
                },
            }],
            config: {
                duration: HINT_DURATION,
                easing: easings.easeOutQuad,
            },
        }
    });

    return (
        <Sprite
            anchor={[0.5]}
            image={coin}
            width={48}
            height={48}
            {...spring}
        />
    )
}