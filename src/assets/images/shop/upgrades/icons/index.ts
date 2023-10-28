import { UpgradeType } from "@/components/shop/upgrades/data";
import cursor0 from "./cursor-0.webp";
import cursor1 from "./cursor-1.webp";
import cursor2 from "./cursor-2.webp";
import cursor3 from "./cursor-3.webp";
import cursor4 from "./cursor-4.webp";
import mine0 from "./mine-0.png";
import mine1 from "./mine-1.png";
import mine2 from "./mine-2.png";
import mine3 from "./mine-3.png";
import mine4 from "./mine-4.png";
import forge0 from "./forge-0.png";
import forge1 from "./forge-1.png";
import forge2 from "./forge-2.png";
import forge3 from "./forge-3.png";
import forge4 from "./forge-4.png";
import lab0 from "./lab-0.png";
import lab1 from "./lab-1.png";
import lab2 from "./lab-2.png";
import lab3 from "./lab-3.png";
import lab4 from "./lab-4.png";

/* [FIXME] Typing */
export default {
    0: [cursor0, cursor1, cursor2, cursor3, cursor4],
    2: [mine0, mine1, mine2, mine3, mine4],
    4: [forge0, forge1, forge2, forge3, forge4],
    7: [lab0, lab1, lab2, lab3, lab4],
} as Record<UpgradeType, string[]>;
