import { ParticleContainer, useTick, Sprite } from "@pixi/react";
import coinImage from "@/assets/images/fuyo-coin.png";
import cloverImage from "@/assets/images/clover/base/regular/regular.png";
import { useMemo, useRef, useState } from "react";
import { Sprite as ISprite } from "pixi.js";
import { easings } from "react-spring";
import { useGameStore } from "@/stores/game";
import { ParticleType, Particles } from "./particles";
import { useElementSize } from "usehooks-ts";

export const PARTICLE_SIZE = 100;

/** The amount of time used to determine the generated coin amount. */
const RATE_TIME_MS = 100;

function tween(start: number, end: number, time: number): number {
    return start + time * (end - start);
}

export interface BackdropProps {
    size: ReturnType<typeof useElementSize>[1];
}

export default function Backdrop({ size }: BackdropProps) {
    const rateMs = useGameStore(state => state.coins.rateMs);
    const sprites = useRef<ISprite[]>([]);
    const [, setRenderCount] = useState(0);
    const count = useMemo(
        () =>
            Math.min(
                Math.round(rateMs * RATE_TIME_MS),
                Math.round(
                    (size.width / PARTICLE_SIZE) * (size.height / PARTICLE_SIZE)
                ) * 8
            ),
        [rateMs, size]
    );
    const particles = useRef<Particles>(new Particles(count, size));

    // Update container size
    if (
        particles.current.containerSize.width !== size.width ||
        particles.current.containerSize.height !== size.height
    ) {
        particles.current.containerSize = size;
    }

    useTick(() => {
        // Update particles.
        if (particles.current.resize(count)) setRenderCount(count => count + 1);

        // Update sprites.
        for (const [id, sprite] of Object.entries(sprites.current)) {
            const particle = particles.current.array[Number(id)];

            // Ignore recycled and off screen.
            if (particle.recycled && sprite.y >= size.height + PARTICLE_SIZE) {
                continue;
            }

            let elapsed = performance.now() - particle.initialized;
            // If not started keep on starting location.
            if (elapsed < particle.delay) {
                sprite.x = particle.from.x;
                sprite.y = particle.from.y;
                continue;
                // Else signal start of animation.
            } else if (particle.started === null) {
                particle.started = performance.now();
                elapsed = 0;
            } else {
                elapsed = performance.now() - particle.started;
            }

            const progress = easings.easeInQuad(elapsed / particle.duration);

            sprite.x = tween(particle.from.x, particle.to.x, progress);
            sprite.y = tween(particle.from.y, particle.to.y, progress);
            sprite.rotation = tween(
                particle.from.rotation,
                particle.to.rotation,
                progress
            );

            // If sprite reached bottom and not recycled, restart at top.
            if (sprite.y >= size.height + PARTICLE_SIZE && !particle.recycled) {
                particles.current.reset(particle.id);
            }
        }
    });

    return (
        <>
            <ParticleContainer autoResize={true}>
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
            <ParticleContainer autoResize={true}>
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
