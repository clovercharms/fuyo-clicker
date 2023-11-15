import { Quality } from "@/components/news/settings/slice";
import { useSettingsStore } from "@/stores/settings";

const QUALITY_CLASSES: Record<Quality, string> = {
    [Quality.High]: "hq",
    [Quality.Medium]: "mq",
    [Quality.Low]: "lq",
};

export function useQuality() {
    const quality = useSettingsStore(settings => settings.quality);

    return {
        classes: Object.entries(QUALITY_CLASSES)
            .filter(([e]) => Number(e) >= Number(quality))
            .map(([, c]) => c),
    };
}
