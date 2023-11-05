import cx from "classix";
import { useGameStore } from "@/store";
import classes from "./index.module.css";
import { HTMLProps } from "react";
import { useAudio } from "@/context/audio";
import { Sound } from "@/context/audio/sounds";
import { Button } from "../button";

/**
 * Newsreel that displays news based on current or random events.
 */
export default function News(props: HTMLProps<HTMLDivElement>) {
    const reset = useGameStore(state => state.reset);
    const audio = useAudio();

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
                <Button
                    onClick={() => {
                        audio.setMuted(
                            Sound.BGM,
                            !audio.states[Sound.BGM]?.muted
                        );
                    }}
                >
                    {!audio.states[Sound.BGM]?.muted ? "Mute" : "Unmute"} BGM
                </Button>
            </div>
        </div>
    );
}
