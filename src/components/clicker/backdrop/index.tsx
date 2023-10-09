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

function tween(start: number, end: number, time: number): number {
    return start + time * (end - start);
}

export interface BackdropProps {
    rect: DOMRect;
}

export default function Backdrop({ rect }: BackdropProps) {
    const rateMs = useGameStore(state => state.coins.rateMs);

    const count = useMemo(
        () =>
            Math.min(
                Math.round(rateMs * RATE_TIME_MS),
                Math.round(
                    (rect.width / PARTICLE_SIZE) *
                        (rect.height / PARTICLE_SIZE) *
                        16
                )
            ),
        [rateMs, rect]
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
    const sprites = useRef<ISprite[]>([]);
    const [, setRenderCount] = useState(0);

    useTick(() => {
        // Update particles
        if (particles.current.resize(count)) setRenderCount(count => count + 1);

        // Update sprites
        for (const [id, sprite] of Object.entries(sprites.current)) {
            const particle = particles.current.array[parseInt(id)];

            const elapsed = performance.now() - particle.started;
            const progress = easings.easeInQuad(elapsed / particle.duration);

            sprite.x = tween(particle.from.x, particle.to.x, progress);
            sprite.y = tween(particle.from.y, particle.to.y, progress);
            sprite.rotation = tween(
                particle.from.rotation,
                particle.to.rotation,
                progress
            );

            if (particle.recycle || progress < 1) continue;

            particles.current.reset(particle.id);
        }
    });

    return (
        <>
            <ParticleContainer>
                {particles.current.array
                    .filter(particle => particle.type === ParticleType.COIN)
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
                {particles.current.array
                    .filter(particle => particle.type === ParticleType.CLOVER)
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
