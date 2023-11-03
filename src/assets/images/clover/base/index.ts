import * as regular from "./regular";
import * as hero from "./hero";

export default {
    regular: {
        0: regular.regular,
        1: hero.hero,
    },
    hazmat: {
        0: regular.hazmat,
        1: hero.hazmat,
    },
    alien: {
        0: regular.alien,
        1: hero.alien,
    },
    sketch: {
        0: regular.sketch,
        1: hero.sketch,
    },
    peak: {
        0: regular.peak,
        1: regular.peak,
    },
};
