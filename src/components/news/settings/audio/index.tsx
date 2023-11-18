import { SoundType } from "@/utils/audio/sounds";

import classes from "../index.module.css";

import { AudioToggle } from "./audio-toggle";

export function Audio() {
    return (
        <section>
            <h2>Audio</h2>
            <div className={classes.row}>
                <AudioToggle type={SoundType.Music} label="Music" />
                <AudioToggle type={SoundType.SFX} label="Effects" />
            </div>
        </section>
    );
}
