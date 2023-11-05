import { useElementSize } from "usehooks-ts";
import { PARTICLE_SIZE } from ".";
import {
    xoroshiro128plus,
    unsafeUniformIntDistribution as dist,
} from "pure-rand";

const RNG = xoroshiro128plus(42);

const ANIM_DURATION_RANGE_MS = [5e3, 10e3];

export interface AnimationProperties {
    x: number;
    y: number;
    rotation: number;
}

export enum ParticleType {
    COIN,
    CLOVER,
}

export interface Particle {
    id: number;
    from: AnimationProperties;
    to: AnimationProperties;
    duration: number;
    delay: number;
    initialized: number;
    started: number | null;
    type: ParticleType;
    recycled: boolean;
}

export class Particles {
    active = 0;
    array: Particle[] = [];
    activeMap: Map<number, boolean> = new Map<number, boolean>();
    recycledQueue: number[] = [];
    _containerSize: ReturnType<typeof useElementSize>[1];
    _lastId = 0;
    get containerSize() {
        return this._containerSize;
    }
    set containerSize(value: ReturnType<typeof useElementSize>[1]) {
        this._containerSize = value;
        this.resetAll();
    }

    constructor(
        size: number,
        containerSize: ReturnType<typeof useElementSize>[1]
    ) {
        this._containerSize = containerSize;
        this.resize(size);
    }

    resize(size: number) {
        let changed = false;
        if (this.active < size) {
            for (let i = this.active; i < size; i++) {
                const particle = this.generateParticle();
                this.array[particle.id] = particle;
            }
            changed = true;
        } else if (this.active > size) {
            let toRecycle = this.active - size;
            for (const id of this.activeMap.keys()) {
                if (toRecycle-- === 0) break;

                this.recycle(id);
            }
            changed = true;
        }
        this.active = size;
        return changed;
    }

    reset(id: number) {
        this.array[id] = this.generateParticle(id);
    }

    resetAll() {
        for (let i = 0; i < this.active; i++) {
            this.reset(i);
        }
    }

    recycle(id: number) {
        this.array[id].recycled = true;
        this.recycledQueue.push(id);
        this.activeMap.delete(id);
        this.active -= 1;
    }

    generateParticle(id?: number) {
        const generatedId = id ?? this.recycledQueue.shift() ?? this._lastId++;
        this.activeMap.set(generatedId, true);

        return {
            id: generatedId,
            from: {
                x: dist(
                    -PARTICLE_SIZE,
                    this.containerSize.width + PARTICLE_SIZE,
                    RNG
                ),
                y: -PARTICLE_SIZE,
                rotation: -Math.PI * 2 + dist(0, Math.PI * 4, RNG),
            },
            to: {
                x: dist(
                    -PARTICLE_SIZE,
                    this.containerSize.width + PARTICLE_SIZE,
                    RNG
                ),
                y:
                    this.containerSize.height * 3 +
                    dist(0, this.containerSize.height, RNG),
                rotation: -Math.PI * 2 + dist(0, Math.PI * 4, RNG),
            },
            duration:
                ANIM_DURATION_RANGE_MS[0] +
                dist(0, ANIM_DURATION_RANGE_MS[1], RNG),
            delay: dist(0, 1e3, RNG),
            initialized: performance.now(),
            started: null,
            type: dist(0, 9, RNG) < 9 ? ParticleType.COIN : ParticleType.CLOVER,
            recycled: false,
        } as Particle;
    }
}
