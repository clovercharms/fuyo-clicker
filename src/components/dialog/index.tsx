import {
    DialogHTMLAttributes,
    MutableRefObject,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import cx from "classix";

import { Button } from "../button";

import classes from "./index.module.css";

export interface DialogProps extends DialogHTMLAttributes<HTMLDialogElement> {
    closeable?: boolean;
}

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
    function Dialog({ closeable = true, children, ...props }, outerRef) {
        const ref = useRef<HTMLDialogElement | null>(null);
        useImperativeHandle(outerRef, () => ref.current!);

        const mutRef = ref as MutableRefObject<HTMLDialogElement>;
        const [open, setOpen] = useState(false);

        /**
         * Control open state by using `showModal` and `close` methods due to
         * preferred behavior versus manipulating the `open` attribute directly.
         */
        useEffect(() => {
            if (props.open && !open) {
                mutRef.current.showModal();
                setOpen(true);
            } else if (!props.open && open) {
                mutRef.current.close();
                setOpen(false);
            }
        }, [mutRef, props.open, open]);

        return (
            <dialog
                ref={ref}
                {...props}
                open={open}
                className={cx(classes.dialog, props.className)}
                onCancel={e => {
                    if (!closeable) e.preventDefault();
                    props.onCancel?.(e);
                }}
            >
                {closeable && (
                    <Button
                        className={classes.close}
                        onClick={() => {
                            mutRef.current.close();
                        }}
                    >
                        ✖
                    </Button>
                )}
                {children}
            </dialog>
        );
    }
);
