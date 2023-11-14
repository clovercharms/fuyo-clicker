import { Button } from "@/components/button";
import { useSettingsStore } from "@/stores/settings";
import { SoundType } from "@/utils/audio/sounds";

export interface AudioToggleProps {
    type: SoundType;
    label: string;
}

export function AudioToggle({ type, label }: AudioToggleProps) {
    const audio = useSettingsStore(settings => settings.audio);

    return (
        <Button
            onClick={() => {
                void audio.mute(type, !audio.muted[type]);
            }}
        >
            {!audio.muted[type] ? "Mute" : "Unmute"} {label}
        </Button>
    );
}
