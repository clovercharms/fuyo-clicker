/* eslint-disable react-refresh/only-export-components */
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import classes from "./index.module.css";
import cx from "classix";

export enum Variant {
    REGULAR,
    THIN,
}

export interface ButtonProps
    extends PropsWithChildren,
        ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
}

const VARIANT_CLASSES = {
    [Variant.REGULAR]: classes.regular,
    [Variant.THIN]: classes.thin,
};

export function Button({
    variant = Variant.THIN,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            className={cx(
                classes.button,
                VARIANT_CLASSES[variant],
                props.className
            )}
        >
            <div className={classes.content}>{children}</div>
        </button>
    );
}
