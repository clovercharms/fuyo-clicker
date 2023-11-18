import { HTMLProps } from "react";
import { useDraggable } from "@dnd-kit/core";

import { Clover } from "..";
import { CloverType, Job } from "../data";

export interface CloverProps extends Omit<HTMLProps<HTMLDivElement>, "id"> {
    id: number;
    job: Job;
    assigned?: boolean;
}

/**
 * Represents a single Hero Clover as part of a lane.
 */
export function HeroClover({ id, job, assigned, ...props }: CloverProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id + 1,
        data: { id, job },
        disabled: assigned,
    });

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;

    return (
        <div
            {...props}
            style={{ ...props.style, ...style }}
            {...listeners}
            {...attributes}
            ref={setNodeRef}
        >
            <Clover id={id} job={job} type={CloverType.Hero} />
        </div>
    );
}
