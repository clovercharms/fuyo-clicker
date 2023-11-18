import { Container, Sprite } from "@pixi/react-animated";
import { Sprite as ISprite } from "pixi.js";
import { easings, useSpring } from "react-spring";
import { useGameStore } from "@/stores/game";
import hand from "@/assets/images/hand.png";
import { useRef } from "react";
import { useTick } from "@pixi/react";

const HAND_SIZE = 40;
const ANGLE_DIFF = 9;
const RING_OFFSET = 20;
const COIN_SIZE = 300;
/** Determines nth hands to move with a poke animation. */
const LOOP_OFFSET = 14;
/** Duration of a poke animation. */
const POKE_DURATION_MS = 5e2;

export function Hands() {
    const clickers = useGameStore(state => state.coins.clickers);

    const rotationSpring = useSpring(() => ({
        from: { rotation: 0 },
        to: { rotation: Math.PI * 2 },
        loop: true,
        config: {
            duration: 60e3,
            easing: easings.linear,
        },
    }));

    const handRefs = useRef<Record<number, ISprite>>([]);
    /* The initial offset of the hand to move. */
    const offsetHand = useRef(-1);
    const loopCounter = useRef(2);

    const [pokeSpring] = useSpring(() => ({
        from: {
            y: 0,
        },
        to: [
            {
                y: HAND_SIZE / 2,
            },
            {
                y: 0,
            },
        ],
        onStart: () => {
            loopCounter.current++;
            if (loopCounter.current < 4) return;
            offsetHand.current++;
            loopCounter.current = 0;
        },
        loop: true,
        config: {
            duration: POKE_DURATION_MS,
            easing: easings.linear,
        },
    }));

    useTick(() => {
        if (!handRefs.current) return;

        const hands = Object.entries(handRefs.current);

        const loopOffset =
            hands.length < LOOP_OFFSET ? hands.length : LOOP_OFFSET;

        for (const [key, hand] of hands) {
            if (!hand) continue;

            if ((Number(key) - offsetHand.current) % loopOffset === 0) {
                hand.y = pokeSpring.y.get();
            } else {
                hand.y = 0;
            }
        }
    });

    return (
        <Container anchor={[0.5]} {...rotationSpring[0]}>
            {new Array(clickers).fill(undefined).map((_, i) => {
                const ring = Math.floor(i / (360 / ANGLE_DIFF));
                return (
                    <Container
                        key={i}
                        pivot={{
                            x: 0,
                            y:
                                COIN_SIZE / 2 +
                                HAND_SIZE / 2 +
                                ring * RING_OFFSET,
                        }}
                        rotation={
                            (i * ANGLE_DIFF + ring * (ANGLE_DIFF / 2)) *
                            (Math.PI / 180)
                        }
                    >
                        <Sprite
                            key={i}
                            anchor={[0.5]}
                            image={hand}
                            width={HAND_SIZE}
                            height={HAND_SIZE}
                            ref={e => (handRefs.current[i] = e!)}
                        />
                    </Container>
                );
            })}
        </Container>
    );
}
