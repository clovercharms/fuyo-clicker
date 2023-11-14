import { Button } from "@/components/button";
import { SoundType } from "@/utils/audio/sounds";
import { AudioToggle } from "./audio-toggle";
import { useGameStore } from "@/stores/game";
import classes from "./index.module.css";
import { useSettingsStore } from "@/stores/settings";

export function Controls() {
    const reset = useGameStore(state => state.reset);
    const debug = useSettingsStore(state => state.debug);

    const handleReset = () => {
        reset();
        window.location.reload();
    };

    return (
        <div className={classes.controls}>
            {debug && <Button onClick={handleReset}>Reset all progress</Button>}
            <AudioToggle type={SoundType.Music} label="Music" />
            <AudioToggle type={SoundType.SFX} label="SFX" />
        </div>
    );
}
