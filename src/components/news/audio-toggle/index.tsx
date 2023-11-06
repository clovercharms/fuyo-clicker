import { Button } from "@/components/button";
import { useAudio } from "@/context/audio";
import { SoundType } from "@/context/audio/sounds";

export interface AudioToggleProps {
    type: SoundType;
    label: string;
}

export function AudioToggle({ type, label }: AudioToggleProps) {
    const audio = useAudio();

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
