import { Button } from "@/components/button";
import { useSettingsStore } from "@/stores/settings";

import { Quality } from "../../slice";

export interface QualityButtonProps {
    quality: Quality;
}

const QUALITY_NAMES: Record<Quality, string> = {
    [Quality.High]: "High Quality",
    [Quality.Medium]: "Medium Quality",
    [Quality.Low]: "Low Quality",
};

export function QualityOption({ quality }: QualityButtonProps) {
    const current = useSettingsStore(settings => settings.quality);
    const setQuality = useSettingsStore(settings => settings.setQuality);

    return (
        <Button onClick={() => setQuality(quality)}>
            {current === quality ? "✅" : "⬜"} {QUALITY_NAMES[quality]}
        </Button>
    );
}
