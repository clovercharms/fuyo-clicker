import { Dialog } from "@/components/dialog";
import { useRef } from "react";
import { Button } from "@/components/button";
import { useGameStore } from "@/stores/game";
import { useSettingsStore } from "@/stores/settings";
import { SoundType } from "@/utils/audio/sounds";
import { AudioToggle } from "./audio-toggle";
import { Quality } from "./slice";
import { QualityOption } from "./quality-option";

export function Settings() {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const reset = useGameStore(state => state.reset);
    const settings = useSettingsStore(state => state);

    const handleReset = () => {
        reset();
        window.location.reload();
    };

    const handleDebug = () => {
        settings.setDebug(!settings.debug);
    };

    return (
        <>
            <Button onClick={() => dialogRef.current?.showModal()}>
                Settings
            </Button>
            <Dialog ref={dialogRef}>
                <h1>Settings</h1>
                <h2>Quality</h2>
                <QualityOption quality={Quality.High} />
                <QualityOption quality={Quality.Medium} />
                <QualityOption quality={Quality.Low} />
                <h2>Audio</h2>
                <AudioToggle type={SoundType.Music} label="Music" />
                <AudioToggle type={SoundType.SFX} label="SFX" />
                <hr />
                <h2>Debug</h2>
                <Button onClick={handleDebug}>
                    {settings.debug ? "✅" : "⬜"} Debug mode
                </Button>
                {settings.debug && (
                    <Button onClick={handleReset}>Reset all progress</Button>
                )}
            </Dialog>
        </>
    );
}
