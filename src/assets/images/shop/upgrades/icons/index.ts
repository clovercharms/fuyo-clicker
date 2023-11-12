import { UpgradeType } from "@/components/shop/upgrades/data";
import axes from "./axes";
import barrels from "./barrels";
import bibles from "./bibles";
import cursors from "./cursors";
import drills from "./drills";
import hammers from "./hammers";
import flags from "./flags";
import potions from "./potions";
import pickaxes from "./pickaxes";
import moneybags from "./moneybags";
import oxytanks from "./oxytanks";
import pencils from "./pencils";
import spaceguns from "./spaceguns";
import suwords from "./suwords";
import tentacles from "./tentacles";
import wands from "./wands";
import wrenches from "./wrenches";

export default {
    0: cursors,
    1: cursors,
    2: pickaxes,
    3: axes,
    4: hammers,
    5: wrenches,
    6: drills,
    7: oxytanks,
    8: potions,
    9: moneybags,
    10: barrels,
    11: suwords,
    12: bibles,
    13: wands,
    14: flags,
    15: spaceguns,
    16: pencils,
    17: tentacles,
} as Record<UpgradeType, string[]>;
