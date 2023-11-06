import { useAudio } from "@/context/audio";
import { Sound } from "@/context/audio/sounds";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    xoroshiro128plus,
    unsafeUniformIntDistribution as dist,
} from "pure-rand";

const RNG = xoroshiro128plus(42);

export interface SoundEmitterProps {
    sounds: Sound[];
    intervalRangeMs: number[];
    enabled: boolean;
}

export function useSoundEmitter({
    sounds,
    intervalRangeMs,
    enabled,
}: SoundEmitterProps) {
    const audio = useAudio();

    const timeoutId = useRef<number | undefined>();
    const [scheduled, setScheduled] = useState(false);

    const playSound = useCallback(() => {
        void audio.play(sounds[dist(0, sounds.length - 1, RNG)]).catch();
        setScheduled(false);
    }, [audio, sounds]);

    useEffect(() => {
        window.clearTimeout(timeoutId.current);
        timeoutId.current = undefined;
        if (!enabled) return;

        const timeout = dist(intervalRangeMs[0], intervalRangeMs[1], RNG);
        timeoutId.current = window.setTimeout(playSound, timeout);
        setScheduled(true);

        return () => window.clearTimeout(timeoutId.current);
    }, [enabled, intervalRangeMs, playSound, scheduled]);
}
