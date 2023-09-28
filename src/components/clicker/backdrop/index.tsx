import { ParticleContainer, useTick } from "@pixi/react";
import { Sprite } from "@pixi/react";
import coinImage from "../../../assets/images/fuyo-coin.png";
import cloverImage from "../../../assets/images/clover/base.png";
import { useMemo, useRef, useState } from "react";
import { Sprite as ISprite } from "pixi.js";
import { easings } from "react-spring";
import { useGameStore } from "../../../store";
import { ParticleType, Particles } from "./particles";

export const PARTICLE_SIZE = 100;

const RATE_TIME_MS = 1e3;
const MAX_PARTICLES = 1e4;

function tween(start: number, end: number, time: number): number {
    return start + time * (end - start);
}

export interface BackdropProps {
    rect: DOMRect;
}

export default function Backdrop({ rect }: BackdropProps) {
    const rateMs = useGameStore(state => state.coins.rateMs);

    const count = useMemo(
        () => Math.min(Math.round(rateMs * RATE_TIME_MS), MAX_PARTICLES),
        [rateMs]
    );
    const particles = useRef<Particles>(null!);
    if (particles.current === null) {
        particles.current = new Particles(count, rect);
    } else if (
        particles.current.rect.width !== rect.width ||
        particles.current.rect.height !== rect.height
    ) {
        particles.current.rect = rect;
    }
    const sprites = useRef<Record<number, ISprite>>({});
    const [, setRenderCount] = useState(0);

    useTick(() => {
        // Update particles
        if (particles.current.resize(count)) setRenderCount(count + 1);

        // Update sprites
        for (const [id, sprite] of Object.entries(sprites.current)) {
            const particle = particles.current.map[id as unknown as number];
            if (!particle) return;

            const elapsed = performance.now() - particle.started;
            const progress = easings.easeInQuad(elapsed / particle.duration);

            sprite.x = tween(particle.from.x, particle.to.x, progress);
            sprite.y = tween(particle.from.y, particle.to.y, progress);
            sprite.rotation = tween(
                particle.from.rotation,
                particle.to.rotation,
                progress
            );

            if (progress < 1) continue;

            if (particle.remove) {
                particles.current.remove(particle.id);
                delete sprites.current[particle.id];
            } else {
                particles.current.reset(particle.id);
            }
        }
    });

    return (
        <>
            <ParticleContainer>
                {Object.values(particles.current.map)
                    .filter(particles => particles.type === ParticleType.COIN)
                    .map(particle => (
                        <Sprite
                            key={particle.id}
                            anchor={[0.5]}
                            image={coinImage}
                            width={PARTICLE_SIZE}
                            height={PARTICLE_SIZE}
                            ref={e => (sprites.current[particle.id] = e!)}
                        />
                    ))}
            </ParticleContainer>
            <ParticleContainer>
                {Object.values(particles.current.map)
                    .filter(particles => particles.type === ParticleType.CLOVER)
                    .map(particle => (
                        <Sprite
                            key={particle.id}
                            anchor={[0.5]}
                            image={cloverImage}
                            width={PARTICLE_SIZE}
                            height={PARTICLE_SIZE}
                            ref={e => (sprites.current[particle.id] = e!)}
                        />
                    ))}
            </ParticleContainer>
        </>
    );
}
