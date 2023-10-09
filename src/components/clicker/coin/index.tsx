import { Container, Sprite } from "@pixi/react-animated";
import coin from "../../../assets/images/fuyo-coin.png";
import { useSpring } from "react-spring";
import coinSound from "../../../assets/audio/Coin_Sound_3.mp3";
import coinSound2 from "../../../assets/audio/Coin_Sound_1-3.mp3";
import bgm from "../../../assets/audio/fuyonade_dreams_ver2.wav";
import { useGameStore } from "../../../store";
import { useRef, useState } from "react";
import { HINT_DURATION, Hint, HintProps } from "./hint";
import { FederatedPointerEvent } from "pixi.js";
import { useApp } from "@pixi/react";

const COIN_SIZE = 300;

function playSfx(src: string, volume = 0.2, loop = false) {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.loop = loop;
    void audio.play();
}

export default function Coin() {
    const click = useGameStore(state => state.coins.click);
    const [spring, set] = useSpring(() => ({
        width: COIN_SIZE,
        height: COIN_SIZE,
    }));
    const bgmPlaying = useRef(false);
    const [hints, setHints] = useState<HintProps[]>([]);
    const app = useApp();
    const hintCleanupId = useRef<number | null>(null);

    const handleClick = (e: FederatedPointerEvent) => {
        const amount = click();

        playSfx(coinSound);
        if (Math.random() > 0.9) playSfx(coinSound2);
        if (!bgmPlaying.current) {
            playSfx(bgm, 1.0, true);
            bgmPlaying.current = true;
        }

        setHints(hints => [
            ...hints,
            {
                x: -(app.screen.width / 2 - e.clientX),
                y: -(app.screen.height / 2 - e.clientY),
                amount,
            },
        ]);

        if (hintCleanupId.current) window.clearTimeout(hintCleanupId.current);
        hintCleanupId.current = window.setTimeout(
            () => setHints([]),
            HINT_DURATION
        );
    };

    return (
        <Container anchor={[0.5]}>
            <Sprite
                image={coin}
                anchor={0.5}
                interactive={true}
                cursor="pointer"
                onmouseenter={() =>
                    set({
                        width: COIN_SIZE * 1.1,
                        height: COIN_SIZE * 1.1,
                        config: { duration: 1e2 },
                    })
                }
                onmouseleave={() =>
                    set({
                        width: COIN_SIZE,
                        height: COIN_SIZE,
                        config: { duration: 1e2 },
                    })
                }
                onmousedown={e => {
                    set({
                        to: [{ width: COIN_SIZE, height: COIN_SIZE }],
                        config: { duration: 1e2 },
                    });
                    handleClick(e);
                }}
                onmouseup={() =>
                    set({
                        to: [
                            { width: COIN_SIZE * 1.1, height: COIN_SIZE * 1.1 },
                        ],
                        config: { duration: 1e2 },
                    })
                }
                {...spring}
            />
            <Container>
                {hints.map((hint, i) => (
                    <Hint.Coin key={i} {...hint} />
                ))}
                {hints.map((hint, i) => (
                    <Hint.Label key={i} {...hint} />
                ))}
            </Container>
        </Container>
    );
}
