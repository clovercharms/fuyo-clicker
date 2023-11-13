import cx from "classix";
import { useGameStore } from "@/stores/game";
import classes from "./index.module.css";
import { HTMLProps, useEffect, useState } from "react";
import { SoundType } from "@/utils/audio/sounds";
import { Button } from "../button";
import { AudioToggle } from "./audio-toggle";
import { newsreel } from "./data";
import Marquee from "react-fast-marquee";
/**
 * Newsreel that displays news based on current or random events.
 */
export default function News(props: HTMLProps<HTMLDivElement>) {
    const reset = useGameStore(state => state.reset);
    const [indexNews, setIndexNews] = useState(0);
    const NEWS_INTERVAL_MS = 30000;
    useEffect(() => {
        const interval = setInterval(() => {
            setIndexNews(Math.floor(Math.random() * newsreel.length));
        }, NEWS_INTERVAL_MS);
        return () => clearInterval(interval);
    }, []);

    return (
        <div {...props} className={cx(classes.news, props.className)}>
            <div className={classes.reel}>
                <Marquee className={classes.marquee} autoFill={true}>
                    <div className={classes.quote}>
                        {newsreel[indexNews].content}
                    </div>
                </Marquee>
                <div className={classes.author}>
                    {newsreel[indexNews].author
                        ? `- ${newsreel[indexNews].author}`
                        : "\u00A0"}
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
