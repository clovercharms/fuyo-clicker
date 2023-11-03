import { useElementSize } from "usehooks-ts";
import { PARTICLE_SIZE } from ".";

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
    started: number;
    recycled: boolean;
    type: ParticleType;
}

export class Particles {
    active = 0;
    array: Particle[] = [];
    recycleable: number[] = [];
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
            for (let i = this.active - 1; i >= size; i--) {
                this.recycle(i);
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
        this.recycleable.push(id);
        this.active -= 1;
    }

    generateParticle(id?: number) {
        let recycledId: number | undefined = undefined;
        if (id !== undefined) {
            recycledId = this.recycleable.shift();
        }

        return {
            id: id ?? recycledId ?? this._lastId++,
            from: {
                x:
                    -(PARTICLE_SIZE / 2) +
                    Math.random() *
                        (this.containerSize.width + PARTICLE_SIZE / 2),
                y:
                    -(PARTICLE_SIZE / 2) -
                    Math.random() *
                        (this.containerSize.height + PARTICLE_SIZE / 2),
                rotation: -Math.PI * 2 + Math.random() * (Math.PI * 4),
            },
            to: {
                x:
                    -(PARTICLE_SIZE / 2) +
                    Math.random() *
                        (this.containerSize.width + PARTICLE_SIZE / 2),
                y: this.containerSize.height + PARTICLE_SIZE / 2,
                rotation: -Math.PI * 2 + Math.random() * (Math.PI * 4),
            },
            duration:
                ANIM_DURATION_RANGE_MS[0] +
                Math.random() * ANIM_DURATION_RANGE_MS[1],
            started: performance.now(),
            type: Math.random() < 0.9 ? ParticleType.COIN : ParticleType.CLOVER,
            recycled:
                id !== undefined && recycledId !== undefined
                    ? this.array[id].recycled
                    : false,
        } as Particle;
    }
}
