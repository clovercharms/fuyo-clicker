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
    remove: boolean;
    type: ParticleType;
}

export class Particles {
    active = 0;
    total = 0;
    map = {} as Record<number, Particle>;
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
            const diff = size - this.active;
            for (let i = 0; i < diff; i++) {
                const particle = this.generateParticle();
                this.map[particle.id] = particle;
            }
            this.active += diff;
            this.total += diff;
            changed = true;
        } else if (this.active > size) {
            const diff = this.active - size;
            const particleKeys = Object.keys(this.map);
            for (const key of particleKeys.slice(particleKeys.length - diff)) {
                this.map[key as unknown as number].remove = true;
            }
            this.active -= diff;
            changed = true;
        }

        return changed;
    }

    reset(id: number) {
        this.map[id] = {
            ...this.generateParticle(id),
        };
    }

    resetAll() {
        for (const id of Object.keys(this.map))
            this.reset(id as unknown as number);
    }

    remove(id: number) {
        delete this.map[id];
        this.total -= 1;
    }

    generateParticle(id?: number) {
        return {
            id: id ?? this._lastId++,
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
        } as Particle;
    }
}
