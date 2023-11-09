import { Sound } from "@/utils/audio/sounds";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    xoroshiro128plus,
    unsafeUniformIntDistribution as dist,
} from "pure-rand";
import { useSettingsStore } from "@/stores/settings";

const RNG = xoroshiro128plus(42);

export interface SoundEmitterProps {
    sounds: Sound[];
    intervalRangeMs: number[];
    enabled: boolean;
}

interface Scheduled {
    started: number;
    duration: number;
}

export function useSoundEmitter({
    sounds,
    intervalRangeMs,
    enabled,
}: SoundEmitterProps) {
    const play = useSettingsStore(settings => settings.audio.play);

    const timeoutId = useRef<number | undefined>();
    const [scheduled, setScheduled] = useState<Scheduled | null>(null);

    const playSound = useCallback(() => {
        void play(sounds[dist(0, sounds.length - 1, RNG)]).catch();
        setScheduled(null);
    }, [play, sounds]);

    useEffect(() => {
        window.clearTimeout(timeoutId.current);
        timeoutId.current = undefined;
        if (!enabled || sounds.length === 0) return;

        // Schedule new
        let current = scheduled;
        const time = performance.now();
        if (!current) {
            current = {
                started: time,
                duration: dist(intervalRangeMs[0], intervalRangeMs[1], RNG),
            };
            setScheduled(current);
        }

        const elapsed = time - current.started;
        const timeout = current.duration - elapsed;
        timeoutId.current = window.setTimeout(playSound, timeout);

        return () => window.clearTimeout(timeoutId.current);
    }, [sounds, enabled, intervalRangeMs, playSound, scheduled]);
}
