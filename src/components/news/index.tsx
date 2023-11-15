import cx from "classix";
import classes from "./index.module.css";
import { HTMLProps, useEffect, useState } from "react";
import { newsreel } from "./data";
import Marquee from "react-fast-marquee";
import { useTransition } from "react-transition-state";
import { Settings } from "./settings";

const CHARS_PER_SECOND = 2.5;
const MIN_DURATION_MS = 1.5e4;
const TRANSITION_DURATION_MS = 500;

/**
 * Newsreel that displays news based on current or random events.
 */
export default function News(props: HTMLProps<HTMLDivElement>) {
    const [newsIndex, setNewsIndex] = useState(
        Math.floor(Math.random() * newsreel.length)
    );
    const [transitionState, toggle] = useTransition({
        initialEntered: true,
        preEnter: true,
        timeout: TRANSITION_DURATION_MS,
    });

    useEffect(() => {
        const timeout =
            (newsreel[newsIndex].content.length / CHARS_PER_SECOND) * 1e3 -
            TRANSITION_DURATION_MS;

        const timeoutId = window.setTimeout(
            () => {
                toggle(false);
                setTimeout(() => {
                    setNewsIndex(Math.floor(Math.random() * newsreel.length));
                    toggle(true);
                }, TRANSITION_DURATION_MS);
            },
            Math.max(MIN_DURATION_MS, timeout)
        );

        return () => window.clearTimeout(timeoutId);
    }, [newsIndex]);

    return (
        <div {...props} className={cx(classes.news, props.className)}>
            <div className={classes.reel}>
                <Marquee className={classes.marquee}>
                    <div
                        className={cx(
                            classes.quote,
                            classes[transitionState.status]
                        )}
                    >
                        {newsreel[newsIndex].content}
                    </div>
                </Marquee>
                <div
                    className={cx(classes.row, classes[transitionState.status])}
                >
                    <div className={classes.author}>
                        {newsreel[newsIndex].author &&
                            `- ${newsreel[newsIndex].author}`}
                    </div>
                    <Settings />
                </div>
            </div>
        </div>
    );
}
