import { Sprite } from "@pixi/react-animated";
import coin from "../../../assets/images/fuyo-coin.png";
import { useSpring } from "react-spring";
import coinSound from "../../../assets/audio/Coin_Sound_3.mp3";
import coinSound2 from "../../../assets/audio/Coin_Sound_1-3.mp3";
import bgm from "../../../assets/audio/fuyonade_dreams_ver2.wav";
import { useGameStore } from "../../../store";
import { useRef } from 'react';

const COIN_SIZE = 300;

function playSfx(src: string, loop?: boolean) {
    const audio = new Audio(src);
    audio.volume = 0.2;
    audio.loop = loop ?? false;
    void audio.play();
}

export default function Coin() {
    const click = useGameStore(state => state.coins.click);
    const [spring, set] = useSpring(() => ({
        width: COIN_SIZE,
        height: COIN_SIZE,
    }));
    const bgmPlaying = useRef(false);

    return (
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
            onmousedown={() => {
                set({
                    to: [{ width: COIN_SIZE, height: COIN_SIZE }],
                    config: { duration: 1e2 },
                });
                click();
                playSfx(coinSound);
                if (Math.random() > 0.9) playSfx(coinSound2);
                if (!bgmPlaying.current) {
                    playSfx(bgm, true);
                    bgmPlaying.current = true;
                }
            }}
            onmouseup={() =>
                set({
                    to: [{ width: COIN_SIZE * 1.1, height: COIN_SIZE * 1.1 }],
                    config: { duration: 1e2 },
                })
            }
            {...spring}
        />
    );
}
