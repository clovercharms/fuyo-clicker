import cx from "classix";
import { useGameStore } from "@/store";
import classes from "./index.module.css";
import { HTMLProps } from "react";
import { SoundType } from "@/context/audio/sounds";
import { Button } from "../button";
import { AudioToggle } from "./audio-toggle";

/**
 * Newsreel that displays news based on current or random events.
 */
export default function News(props: HTMLProps<HTMLDivElement>) {
    const reset = useGameStore(state => state.reset);

    return (
        <div {...props} className={cx(classes.news, props.className)}>
            <h1>News</h1>
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
