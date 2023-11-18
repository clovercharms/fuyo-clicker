import { HTMLProps, forwardRef, useImperativeHandle, useRef } from "react";
import cx from "classix";

import { Button } from "../button";

import classes from "./index.module.css";

export const Dialog = forwardRef<
    HTMLDialogElement,
    HTMLProps<HTMLDialogElement>
>(function Dialog(
    { children, ...props }: HTMLProps<HTMLDialogElement>,
    outerRef
) {
    const ref = useRef<HTMLDialogElement | null>(null);
    useImperativeHandle(outerRef, () => ref.current!);

    return (
        <dialog
            ref={ref}
            {...props}
            className={cx(classes.dialog, props.className)}
        >
            <Button
                className={classes.close}
                onClick={() => ref.current?.close()}
            >
                ✖
            </Button>
            {children}
        </dialog>
    );
});
