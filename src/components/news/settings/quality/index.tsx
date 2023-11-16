import { QualityOption } from "./quality-option";
import { Quality as QualityEnum } from "../slice";

export function Quality() {
    return (
        <section>
            <h2>Quality</h2>
            <QualityOption quality={QualityEnum.High} />
            <QualityOption quality={QualityEnum.Medium} />
            <QualityOption quality={QualityEnum.Low} />
        </section>
    );
}
