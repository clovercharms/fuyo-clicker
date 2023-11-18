import { Quality as QualityEnum } from "../slice";

import { QualityOption } from "./quality-option";

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
