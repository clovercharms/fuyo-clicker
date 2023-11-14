import cx from "classix";
import { useGameStore } from "@/stores/game";
import classes from "./index.module.css";
import { HTMLProps, useEffect, useState } from "react";
import { SoundType } from "@/utils/audio/sounds";
import { Button } from "../button";
import { AudioToggle } from "./audio-toggle";
import { newsreel } from "./data";
import Marquee from "react-fast-marquee";
import { useTransition } from "react-transition-state";

const CHARS_PER_SECOND = 2.5;
const MIN_DURATION_MS = 1.5e4;
const TRANSITION_DURATION_MS = 500;

/**
 * Newsreel that displays news based on current or random events.
 */
export default function News(props: HTMLProps<HTMLDivElement>) {
    const reset = useGameStore(state => state.reset);
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
            <div className={cx(classes.reel, classes[transitionState.status])}>
                <Marquee>
                    <div className={classes.quote}>
                        {newsreel[newsIndex].content}
                    </div>
                </Marquee>
                <div className={classes.author}>
                    {newsreel[newsIndex].author &&
                        `- ${newsreel[newsIndex].author}`}
                </div>
            </div>
            <div className={classes.controls}>
                <Button
                    onClick={() => {
                        reset();
                        window.location.reload();
                    }}
                >
                    Reset all progress
                </Button>
                <AudioToggle type={SoundType.Music} label="Music" />
                <AudioToggle type={SoundType.SFX} label="SFX" />
            </div>
        </div>
    );
}
