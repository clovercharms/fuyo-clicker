import { PARTICLE_SIZE } from ".";

const ANIM_DURATION_RANGE = [5e3, 10e3];

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
    recycle: boolean;
    type: ParticleType;
}

export class Particles {
    active = 0;
    array: Particle[] = [];
    recycleable: number[] = [];
    _rect: DOMRect;
    _lastId = 0;
    get rect() {
        return this._rect;
    }
    set rect(value: DOMRect) {
        this._rect = value;
        this.resetAll();
    }

    constructor(size: number, rect: DOMRect) {
        this._rect = rect;
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
        this.array[id].recycle = true;
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
                    Math.random() * (this.rect.width + PARTICLE_SIZE / 2),
                y:
                    -(PARTICLE_SIZE / 2) -
                    Math.random() * (this.rect.height + PARTICLE_SIZE / 2),
                rotation: -Math.PI * 2 + Math.random() * (Math.PI * 4),
            },
            to: {
                x:
                    -(PARTICLE_SIZE / 2) +
                    Math.random() * (this.rect.width + PARTICLE_SIZE / 2),
                y: this.rect.height + PARTICLE_SIZE / 2,
                rotation: -Math.PI * 2 + Math.random() * (Math.PI * 4),
            },
            duration:
                ANIM_DURATION_RANGE[0] + Math.random() * ANIM_DURATION_RANGE[1],
            started: performance.now(),
            type: Math.random() < 0.9 ? ParticleType.COIN : ParticleType.CLOVER,
            recycle:
                id !== undefined && recycledId !== undefined
                    ? this.array[id].recycle
                    : false,
        } as Particle;
    }
}
