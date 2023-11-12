import cx from "classix";
import { useGameStore } from "@/stores/game";
import classes from "./index.module.css";
import { HTMLProps, useEffect, useState } from "react";
import { SoundType } from "@/utils/audio/sounds";
import { Button } from "../button";
import { AudioToggle } from "./audio-toggle";
import { newsreel } from "@/assets/json_data/data";
/**
 * Newsreel that displays news based on current or random events.
 */
export default function News(props: HTMLProps<HTMLDivElement>) {
    const reset = useGameStore(state => state.reset);
    const [indexNews, setIndexNews] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
          setIndexNews(indexNews => indexNews + 1)
        }, 10000);
        return () => clearInterval(interval);
      }, []);

    return (
        <div {...props} className={cx(classes.news, props.className)}>
            <div>{newsreel[indexNews].content}</div>
            <div> - {newsreel[indexNews].author}</div>
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
