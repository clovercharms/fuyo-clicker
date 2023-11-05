import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import classes from "./index.module.css";
import cx from "classix";

export type ButtonProps = PropsWithChildren &
    ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...props }: ButtonProps) {
    return (
        <button {...props} className={cx(classes.button, props.className)}>
            <div className={classes.content}>{children}</div>
        </button>
    );
}
