import { HTMLProps } from "react";
import { useDraggable } from '@dnd-kit/core';
import { Clover as IClover } from '../../clover/slice';
import Clover from '..';

export interface CloverProps extends HTMLProps<HTMLDivElement> {
    clover: IClover;
}

/**
 * Represents a single Hero Clover as part of a lane.
 */
export default function HeroClover({ clover, ...props }: CloverProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: clover.id + 1,
        data: clover
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div
            {...props}
            style={{ ...props.style, ...style }}
            {...listeners}
            {...attributes}
            ref={setNodeRef}
        >
            <Clover clover={clover} />
        </div>
    );
}
