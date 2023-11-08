import { Container, Sprite } from "@pixi/react-animated";
import coin from "@/assets/images/fuyo-coin.png";
import { useSpring } from "react-spring";
import { useGameStore } from "@/stores/game";
import { useRef, useState } from "react";
import { HINT_DURATION, Hint, HintProps } from "./hint";
import { FederatedPointerEvent } from "pixi.js";
import { useApp } from "@pixi/react";
import { Sound } from "@/utils/audio/sounds";
import { elements } from "@/utils/audio";
import { useSettingsStore } from "@/stores/settings";

const COIN_SIZE = 300;

export interface CoinProps {
    audio: AudioContext;
}

export default function Coin() {
    const play = useSettingsStore(settings => settings.audio.play);
    const click = useGameStore(state => state.coins.click);
    const [spring, set] = useSpring(() => ({
        width: COIN_SIZE,
        height: COIN_SIZE,
    }));
    const [hints, setHints] = useState<HintProps[]>([]);
    const app = useApp();
    const hintCleanupId = useRef<number | null>(null);

    const handleClick = (e: FederatedPointerEvent) => {
        const amount = click();

        void play(Sound.Coin1);
        if (Math.random() > 0.9) void play(Sound.Coin2);

        // Start BGM if not playing already
        if (!elements[Sound.BGM] || elements[Sound.BGM]?.[0]?.paused) {
            void play(Sound.BGM);
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
