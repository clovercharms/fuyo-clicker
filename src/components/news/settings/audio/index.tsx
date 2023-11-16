import { AudioToggle } from "./audio-toggle";
import classes from "../index.module.css";
import { SoundType } from "@/utils/audio/sounds";

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
