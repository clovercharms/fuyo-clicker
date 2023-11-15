import { GameState } from "@/stores/game";
import icons from "@/assets/images/shop/upgrades/icons";
import { LaneType } from "../../lanes/lane/data";

/**
 * A type of upgrade.
 */
export enum UpgradeType {
    Clicker,
    Cursor,
    Miners,
    Lumberjacks,
    Blacksmiths,
    Mechanics,
    FactoryWorkers,
    Divers,
    Scientists,
    Investors,
    Hazmats,
    Knights,
    Cultists,
    Wizards,
    Astronauts,
    Aliens,
    Sketches,
    Peak,
}

export const LaneTypeUpgradeType: Partial<Record<LaneType, UpgradeType>> = {
    [LaneType.Miners]: UpgradeType.Miners,
    [LaneType.Lumberjacks]: UpgradeType.Lumberjacks,
    [LaneType.Blacksmiths]: UpgradeType.Blacksmiths,
    [LaneType.FactoryWorkers]: UpgradeType.FactoryWorkers,
    [LaneType.Mechanics]: UpgradeType.Mechanics,
    [LaneType.Scientists]: UpgradeType.Scientists,
    [LaneType.Divers]: UpgradeType.Divers,
    [LaneType.Astronauts]: UpgradeType.Astronauts,
    [LaneType.Cultists]: UpgradeType.Cultists,
    [LaneType.Investors]: UpgradeType.Investors,
    [LaneType.Aliens]: UpgradeType.Aliens,
    [LaneType.Hazmats]: UpgradeType.Hazmats,
    [LaneType.Wizards]: UpgradeType.Wizards,
    [LaneType.Knights]: UpgradeType.Knights,
    [LaneType.Sketches]: UpgradeType.Sketches,
    [LaneType.Peak]: UpgradeType.Peak,
};

/**
 * Metadata about an Upgrade.
 */
export interface Upgrade {
    name: string;
    description?: string;
    price: number;
    image: string;
    condition: (state: GameState) => boolean;
}

export type Upgrades = Record<UpgradeType, Record<number, Upgrade>>;

/**
 * Collection of metadata of all the upgrades available in the game.
 */
export const upgrades: Upgrades = {
    [UpgradeType.Clicker]: {
        0: {
            name: "Reinforced index finger",
            description: `The mouse and cursors are twice as efficient. "prod prod"`,
            price: 100,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.clickers > 0,
        },
        1: {
            name: "Carpal tunnel prevention cream",
            description: `The mouse and cursors are twice as efficient. "it... it hurts to click..."`,
            price: 500,
            image: icons[UpgradeType.Clicker][1],
            condition: (state: GameState) => state.coins.clickers > 0,
        },
        2: {
            name: "Ambidextrous",
            description: `The mouse and cursors are twice as efficient. "Look ma, both hands!"`,
            price: 1e4,
            image: icons[UpgradeType.Clicker][2],
            condition: (state: GameState) => state.coins.clickers >= 10,
        },
        3: {
            name: "Thousand fingers",
            description: `The mouse and cursors gain +0.1 cookies for each non-cursor object owned. "clickity"`,
            price: 1e5,
            image: icons[UpgradeType.Clicker][3],
            condition: (state: GameState) => state.coins.clickers >= 25,
        },
        4: {
            name: "Million fingers",
            description: `Multiplies the gain from Thousand fingers by 5. "clickityclickity"`,
            price: 1e7,
            image: icons[UpgradeType.Clicker][4],
            condition: (state: GameState) => state.coins.clickers >= 50,
        },
        5: {
            name: "Billion fingers",
            description: `Multiplies the gain from Thousand fingers by 10. "clickityclickityclickity"`,
            price: 1e8,
            image: icons[UpgradeType.Clicker][4],
            condition: (state: GameState) => state.coins.clickers >= 100,
        },
        6: {
            name: "Trillion fingers",
            description: `Multiplies the gain from Thousand fingers by 20. "clickityclickityclickityclickity"`,
            price: 1e9,
            image: icons[UpgradeType.Clicker][4],
            condition: (state: GameState) => state.coins.clickers >= 150,
        },
        7: {
            name: "Quadrillion fingers",
            description: `Multiplies the gain from Thousand fingers by 20. "clickityclickityclickityclickityclick"`,
            price: 1e10,
            image: icons[UpgradeType.Clicker][4],
            condition: (state: GameState) => state.coins.clickers >= 200,
        },
        8: {
            name: "Quintillion fingers",
            description: `Multiplies the gain from Thousand fingers by 20. "man, just go click click click click click, it's real easy, man."`,
            price: 1e13,
            image: icons[UpgradeType.Clicker][4],
            condition: (state: GameState) => state.coins.clickers >= 250,
        },
        9: {
            name: "Sextillion fingers",
            description: `Multiplies the gain from Thousand fingers by 20. "sometimes things just click"`,
            price: 1e16,
            image: icons[UpgradeType.Clicker][4],
            condition: (state: GameState) => state.coins.clickers >= 300,
        },
    },
    [UpgradeType.Cursor]: {
        0: {
            name: "Plastic mouse",
            description: `Clicking gains 30% of your CpS. "Slightly squeaky."`,
            price: 5e4,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.manualAmount >= 1e3,
        },
        1: {
            name: "Iron mouse",
            description: `Clicking gains +10% of your CpS. "Click like it's 1,349!"`,
            price: 5e6,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.manualAmount >= 1e5,
        },
        2: {
            name: "Titanium mouse",
            description: `Clicking gains +10% of your CpS. "Heavy, but powerful."`,
            price: 5e8,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.manualAmount >= 1e7,
        },
        3: {
            name: "Adamantium mouse",
            description: "Clicking gains +10% of your CpS.",
            price: 5e10,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.manualAmount >= 1e9,
        },
        4: {
            name: "Unobtainium mouse",
            description: `Clicking gains +10% of your CpS. "You could cut diamond with these."`,
            price: 5e12,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.manualAmount >= 1e11,
        },
        5: {
            name: "Eludium mouse",
            description: `Clicking gains +10% of your CpS. "These nice mice should suffice."`,
            price: 5e14,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.manualAmount >= 1e13,
        },
    },
    /* [CC] Grandma */
    [UpgradeType.Miners]: {
        0: {
            name: "Clover gas",
            description:
                "A green, volatile gas, found in the depths of some gold mines.",
            price: 1e3,
            image: icons[UpgradeType.Miners][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Miners].buildings >= 1,
        },
        1: {
            name: "Megadrill",
            description: "You're in deep.",
            price: 5e3,
            image: icons[UpgradeType.Miners][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Miners].buildings >= 5,
        },
        2: {
            name: "Ultradrill",
            description: "Finally caved in?",
            price: 2.5e4,
            image: icons[UpgradeType.Miners][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Miners].buildings >= 25,
        },
        3: {
            name: "Ultimadrill",
            description: "Pierce the heavens, etc.",
            price: 1.25e5,
            image: icons[UpgradeType.Miners][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Miners].buildings >= 50,
        },
        4: {
            name: "H-bomb mining",
            description:
                "Questionable efficiency, but spectacular nonetheless.",
            price: 6.25e5,
            image: icons[UpgradeType.Miners][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Miners].buildings >= 100,
        },
    },
    /* [CC] Farm */
    [UpgradeType.Lumberjacks]: {
        0: {
            name: "Red Flannel Shirt",
            description:
                "Can you even call yourself a lumberjack if you don't have one of these?",
            price: 1.1e4,
            image: icons[UpgradeType.Lumberjacks][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Lumberjacks].buildings >= 1,
        },
        1: {
            name: "Bigger Axes",
            description: "Size matters.",
            price: 5.5e4,
            image: icons[UpgradeType.Lumberjacks][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Lumberjacks].buildings >= 5,
        },
        2: {
            name: "Axe dual wielding",
            description: "Two is better than one.",
            price: 2.75e5,
            image: icons[UpgradeType.Lumberjacks][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Lumberjacks].buildings >= 25,
        },
        3: {
            name: "Suspenders",
            description: "For a complete look.",
            price: 1.375e6,
            image: icons[UpgradeType.Lumberjacks][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Lumberjacks].buildings >= 50,
        },
        4: {
            name: "Dad Bod",
            description: "This is what peak performance looks like",
            price: 6.875e6,
            image: icons[UpgradeType.Lumberjacks][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Lumberjacks].buildings >= 100,
        },
    },
    /* [CC] Mine */
    [UpgradeType.Blacksmiths]: {
        0: {
            name: "Bigger hammer",
            description: "Has to be larger than 3 inches.",
            price: 1.2e5,
            image: icons[UpgradeType.Blacksmiths][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Blacksmiths].buildings >= 1,
        },
        1: {
            name: "Titanium anvil",
            description: `Modeled after a leprechaun's "assets".`,
            price: 6e5,
            image: icons[UpgradeType.Blacksmiths][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Blacksmiths].buildings >= 5,
        },
        2: {
            name: "Electric forge",
            description: "Shocking, I know.",
            price: 3e6,
            image: icons[UpgradeType.Blacksmiths][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Blacksmiths].buildings >= 25,
        },
        3: {
            name: "Majestic braided beard",
            description:
                "It gets in the way but improves morale. It's also very attractive.",
            price: 1.5e7,
            image: icons[UpgradeType.Blacksmiths][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Blacksmiths].buildings >= 50,
        },
        4: {
            name: "Mjolnir",
            description: "Step aside Thor, I need it to make this suword",
            price: 7.5e7,
            image: icons[UpgradeType.Blacksmiths][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Blacksmiths].buildings >= 100,
        },
    },
    /* [CC] Factory */
    [UpgradeType.Mechanics]: {
        0: {
            name: "Repair Shop - Upgrade 1",
            price: 1.3e6,
            image: icons[UpgradeType.Mechanics][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Mechanics].buildings >= 1,
        },
        1: {
            name: "Repair Shop - Upgrade 2",
            price: 6.6e6,
            image: icons[UpgradeType.Mechanics][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Mechanics].buildings >= 5,
        },
        2: {
            name: "Repair Shop - Upgrade 3",
            price: 3.3e7,
            image: icons[UpgradeType.Mechanics][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Mechanics].buildings >= 25,
        },
        3: {
            name: "Repair Shop - Upgrade 4",
            price: 1.65e8,
            image: icons[UpgradeType.Mechanics][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Mechanics].buildings >= 50,
        },
        4: {
            name: "Repair Shop - Upgrade 5",
            price: 8.25e8,
            image: icons[UpgradeType.Mechanics][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Mechanics].buildings >= 100,
        },
    },
    /* [CC] Bank */
    [UpgradeType.FactoryWorkers]: {
        0: {
            name: "Eye-ron farm",
            description: "Eye-ron for suwords",
            price: 1.43e7,
            image: icons[UpgradeType.FactoryWorkers][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.FactoryWorkers].buildings >= 1,
        },
        1: {
            name: "Pablo Puebes' confinement space",
            description: "I-it's not like I l-like him or anything!",
            price: 7.15e7,
            image: icons[UpgradeType.FactoryWorkers][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.FactoryWorkers].buildings >= 5,
        },
        2: {
            name: "Automatic gold farm",
            description: "It would suck if it suddenly stopped working",
            price: 3.575e8,
            image: icons[UpgradeType.FactoryWorkers][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.FactoryWorkers].buildings >= 25,
        },
        3: {
            name: "Reproduction farm",
            description: "Chu chu chu",
            price: 1.7875e9,
            image: icons[UpgradeType.FactoryWorkers][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.FactoryWorkers].buildings >= 50,
        },
        4: {
            name: "Fuyo's tentacle statue",
            description: "I want to wake up and see myself...",
            price: 8.9375e9,
            image: icons[UpgradeType.FactoryWorkers][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.FactoryWorkers].buildings >= 100,
        },
    },
    /* [CC] Temple */
    [UpgradeType.Divers]: {
        0: {
            name: "Fresh air",
            description: "You don't get to taste this often, huh?",
            price: 1.54e8,
            image: icons[UpgradeType.Divers][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Divers].buildings >= 1,
        },
        1: {
            name: "Clover fumes",
            description: "Why do I feel so groggy?",
            price: 7.7e8,
            image: icons[UpgradeType.Divers][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Divers].buildings >= 5,
        },
        2: {
            name: "Brap tank",
            description: "I wouldn't want to breathe it",
            price: 3.85e9,
            image: icons[UpgradeType.Divers][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Divers].buildings >= 25,
        },
        3: {
            name: "Fuyo musk",
            description: `Can be smelled from a 100 km radius. "Take a bath, stinky!"`,
            price: 1.925e10,
            image: icons[UpgradeType.Divers][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Divers].buildings >= 50,
        },
        4: {
            name: "Leprecopium",
            description: "Ingest a maximum of 217 ml a day",
            price: 9.625e10,
            image: icons[UpgradeType.Divers][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Divers].buildings >= 100,
        },
    },
    // [CC] Wizard Tower
    [UpgradeType.Scientists]: {
        0: {
            name: "Stem extract",
            description: "W-where did you get that?",
            price: 2.2e9,
            image: icons[UpgradeType.Scientists][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Scientists].buildings >= 1,
        },
        1: {
            name: "Clover solvent",
            description: "Do NOT put your stem in this!",
            price: 1.1e10,
            image: icons[UpgradeType.Scientists][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Scientists].buildings >= 5,
        },
        2: {
            name: "Lucky Charm tears solution",
            description: "Easy to gather when Fuyoless",
            price: 5.5e10,
            image: icons[UpgradeType.Scientists][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Scientists].buildings >= 25,
        },
        3: {
            name: "Fuyonade essence",
            description: "Used to scent bus seats",
            price: 2.75e11,
            image: icons[UpgradeType.Scientists][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Scientists].buildings >= 50,
        },
        4: {
            name: "Reproduction catalyst",
            description: "It makes the clovers go wild",
            price: 1.375e12,
            image: icons[UpgradeType.Scientists][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Scientists].buildings >= 100,
        },
    },
    /* [CC] Shipment */
    [UpgradeType.Investors]: {
        0: {
            name: "Tip bag",
            description: "Leave a funny message! Wait-",
            price: 3.63e10,
            image: icons[UpgradeType.Investors][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Investors].buildings >= 1,
        },
        1: {
            name: "Wallet bag",
            description: "Legally stol- obtained through donations!",
            price: 1.815e11,
            image: icons[UpgradeType.Investors][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Investors].buildings >= 5,
        },
        2: {
            name: "Edible paper money bag",
            description:
                "Delicious delicacy. Hide from the nearest leprechaun.",
            price: 9.075e11,
            image: icons[UpgradeType.Investors][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Investors].buildings >= 25,
        },
        3: {
            name: "Fuyocoin bag",
            description: "Found at the end of a rainbow! Not a scam!",
            price: 4.5375e12,
            image: icons[UpgradeType.Investors][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Investors].buildings >= 50,
        },
        4: {
            name: "Akasupa Bag",
            description: "Are you okay?",
            price: 2.26875e13,
            image: icons[UpgradeType.Investors][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Investors].buildings >= 100,
        },
    },
    /* [CC] Alchemy Lab */
    [UpgradeType.Hazmats]: {
        0: {
            name: "Hazmats - Upgrade 1",
            price: 5.61e11,
            image: icons[UpgradeType.Hazmats][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Hazmats].buildings >= 1,
        },
        1: {
            name: "Hazmats - Upgrade 2",
            price: 2.805e12,
            image: icons[UpgradeType.Hazmats][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Hazmats].buildings >= 5,
        },
        2: {
            name: "Hazmats - Upgrade 3",
            price: 1.4025e13,
            image: icons[UpgradeType.Hazmats][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Hazmats].buildings >= 25,
        },
        3: {
            name: "Hazmats - Upgrade 4",
            price: 7.0125e13,
            image: icons[UpgradeType.Hazmats][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Hazmats].buildings >= 50,
        },
        4: {
            name: "Radioactive leprechaun waste",
            price: 3.50625e14,
            image: icons[UpgradeType.Hazmats][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Hazmats].buildings >= 100,
        },
    },
    /* [CC] Portal */
    [UpgradeType.Knights]: {
        0: {
            name: "Stem suword",
            description: "Always up, heh",
            price: 8.25e12,
            image: icons[UpgradeType.Knights][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Knights].buildings >= 1,
        },
        1: {
            name: "El punhetero",
            description: "Truly a BLASPHEMOUS name",
            price: 4.125e13,
            image: icons[UpgradeType.Knights][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Knights].buildings >= 5,
        },
        2: {
            name: "Diamond suword",
            description:
                "Let's hope it doesn't suffer the same fate as the pickaxe...",
            price: 2.0625e14,
            image: icons[UpgradeType.Knights][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Knights].buildings >= 25,
        },
        3: {
            name: "3 inch destroyer",
            description: "Take a look at my enormous suword",
            price: 1.03125e15,
            image: icons[UpgradeType.Knights][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Knights].buildings >= 50,
        },
        4: {
            name: "Suword",
            description: "Suword.",
            price: 5.15625e15,
            image: icons[UpgradeType.Knights][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Knights].buildings >= 100,
        },
    },
    /* [CC] Time Machine */
    [UpgradeType.Cultists]: {
        0: {
            name: "Join the tummy cult as a new recruit",
            description: "We have cute, cultured and breedable tummies",
            price: 1.1e14,
            image: icons[UpgradeType.Cultists][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Cultists].buildings >= 1,
        },
        1: {
            name: "Become a stummy enjoyer",
            price: 5.5e14,
            image: icons[UpgradeType.Cultists][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Cultists].buildings >= 5,
        },
        2: {
            name: "Become a Womb tattoo enjoyer",
            price: 2.75e15,
            image: icons[UpgradeType.Cultists][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Cultists].buildings >= 25,
        },
        3: {
            name: "Become a Tummy 'Bulge' enjoyer",
            price: 1.375e16,
            image: icons[UpgradeType.Cultists][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Cultists].buildings >= 50,
        },
        4: {
            name: "Tummy for the tummy god",
            price: 6.875e16,
            image: icons[UpgradeType.Cultists][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Cultists].buildings >= 100,
        },
    },
    /* [CC] Antimatter Condenser */
    [UpgradeType.Wizards]: {
        0: {
            name: "Stem wand",
            description: "Powers up when there's a leprechaun nearby.",
            price: 1.54e15,
            image: icons[UpgradeType.Wizards][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Wizards].buildings >= 1,
        },
        1: {
            name: "Leprechaun magic",
            description: "Works 30% of the time.",
            price: 7.7e15,
            image: icons[UpgradeType.Wizards][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Wizards].buildings >= 5,
        },
        2: {
            name: "Witch outfit",
            description: "For the most fun time of the year!",
            price: 3.85e16,
            image: icons[UpgradeType.Wizards][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Wizards].buildings >= 25,
        },
        3: {
            name: "ASMR magic spell",
            description: "Infatuates Lucky charms better than a love potion.",
            price: 1.925e17,
            image: icons[UpgradeType.Wizards][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Wizards].buildings >= 50,
        },
        4: {
            name: "Wish!",
            description: "Will be granted (almost) every stream!",
            price: 9.625e17,
            image: icons[UpgradeType.Wizards][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Wizards].buildings >= 100,
        },
    },
    /* [CC] Prism */
    [UpgradeType.Astronauts]: {
        0: {
            name: "Astronauts - Upgrade 1",
            price: 1.87e16,
            image: icons[UpgradeType.Astronauts][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Astronauts].buildings >= 1,
        },
        1: {
            name: "Astronauts - Upgrade 2",
            price: 9.35e16,
            image: icons[UpgradeType.Astronauts][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Astronauts].buildings >= 5,
        },
        2: {
            name: "Astronauts - Upgrade 3",
            price: 4.675e17,
            image: icons[UpgradeType.Astronauts][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Astronauts].buildings >= 25,
        },
        3: {
            name: "Astronauts - Upgrade 4",
            price: 2.3375e18,
            image: icons[UpgradeType.Astronauts][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Astronauts].buildings >= 50,
        },
        4: {
            name: "Astronauts - Upgrade 5",
            price: 1.16875e19,
            image: icons[UpgradeType.Astronauts][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Astronauts].buildings >= 100,
        },
    },
    /* [CC] Chancemaker */
    [UpgradeType.Aliens]: {
        0: {
            name: "Stem laser gun",
            description: "Stems shoot pretty hard after all.",
            price: 2.3e17,
            image: icons[UpgradeType.Aliens][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Aliens].buildings >= 1,
        },
        1: {
            name: "Poptart leprecat",
            description:
                "It has been haunting me for 10 hours, please make it stop.",
            price: 1.155e18,
            image: icons[UpgradeType.Aliens][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Aliens].buildings >= 5,
        },
        2: {
            name: "Great-grandpa leprechaun's flying hand",
            description: "Postumous pettiness",
            price: 5.775e18,
            image: icons[UpgradeType.Aliens][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Aliens].buildings >= 25,
        },
        3: {
            name: "Clover Instrumentality Project",
            description: `Return to sap. "Tumbling down, tumbling down, tumbling down~"`,
            price: 2.8875e19,
            image: icons[UpgradeType.Aliens][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Aliens].buildings >= 50,
        },
        4: {
            name: "FUYO BEAM!!!",
            price: 1.44375e20,
            image: icons[UpgradeType.Aliens][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Aliens].buildings >= 100,
        },
    },
    /* [CC] Fractal Engine */
    [UpgradeType.Sketches]: {
        0: {
            name: "Pencil",
            description: "Simple is best for beginners!",
            price: 2.86e18,
            image: icons[UpgradeType.Sketches][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Sketches].buildings >= 1,
        },
        1: {
            name: "Phone pen",
            description: "Why is it ringing so often?",
            price: 1.43e19,
            image: icons[UpgradeType.Sketches][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Sketches].buildings >= 5,
        },
        2: {
            name: "Spoon",
            description:
                "You're supposed to be drawing, not trying to break out of jail!",
            price: 7.15e19,
            image: icons[UpgradeType.Sketches][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Sketches].buildings >= 25,
        },
        3: {
            name: "Make-up brush",
            description:
                "I guess this will do. Should've bought better supplies...",
            price: 3.575e20,
            image: icons[UpgradeType.Sketches][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Sketches].buildings >= 50,
        },
        4: {
            name: "Digital pen",
            description: "Remember to save! Oh sh-",
            price: 1.7875e21,
            image: icons[UpgradeType.Sketches][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Sketches].buildings >= 100,
        },
    },
    /* [CC] Javascript Console */
    [UpgradeType.Peak]: {
        0: {
            name: "Standard tentacle",
            description:
                "Comes in a wide variety of sizes and colors, and can be used for a variety of tasks.",
            price: 3.41e19,
            image: icons[UpgradeType.Peak][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Peak].buildings >= 1,
        },
        1: {
            name: "Suction tip",
            description:
                "This variety has developed a bulb capable of producing strong suction.",
            price: 1.705e20,
            image: icons[UpgradeType.Peak][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Peak].buildings >= 5,
        },
        2: {
            name: "Splitter",
            description:
                "This variety can split off into additional tentacles at will.",
            price: 8.525e20,
            image: icons[UpgradeType.Peak][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Peak].buildings >= 25,
        },
        3: {
            name: "Milker",
            description:
                "Strong suction holds it in place as it carries out its purpose.",
            price: 4.2625e21,
            image: icons[UpgradeType.Peak][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Peak].buildings >= 50,
        },
        4: {
            name: "Slime",
            description:
                "Can enter through even the smallest opening, and then expand to fill the entire space.",
            price: 2.13125e22,
            image: icons[UpgradeType.Peak][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Peak].buildings >= 100,
        },
    },
};
