import image from "@/assets/images/tutorial/shop.png";
import pickaxe from "@/assets/images/shop/upgrades/icons/pickaxes/pickaxe-1.png";

import tutorialClasses from "../../index.module.css";

import classes from "./index.module.css";

export function Shop() {
    return (
        <article className={classes.shop}>
            <h1>Shop</h1>
            <div className={tutorialClasses.container}>
                <div>
                    <h2>Upgrades</h2>
                    <p>
                        For every kind of job, theres different{" "}
                        <span className={tutorialClasses["yellow-text"]}>
                            upgrades
                        </span>{" "}
                        that DOUBLE the production of that specific job.
                    </p>
                    <h2>Buildings</h2>
                    <p>
                        <span className={tutorialClasses["lime-text"]}>
                            Buildings
                        </span>{" "}
                        are what hold clovers to do their job. The more{" "}
                        <span className={tutorialClasses["lime-text"]}>
                            buildings
                        </span>
                        , more clovers working, more production!
                    </p>
                </div>
                <div className={tutorialClasses.border}>
                    <img src={image} className={classes.image}></img>
                </div>
            </div>
            <div className={tutorialClasses.container}>
                <div>
                    <h2>Unlocks</h2>
                    <p>
                        Based on the amount of buildings and production,{" "}
                        <span className={tutorialClasses["violet-text"]}>
                            new upgrades and buildings
                        </span>{" "}
                        might be unlocked. So keep at it, and good luck!
                    </p>
                </div>
                <img src={pickaxe} className={classes.pickaxe}></img>
            </div>
        </article>
    );
}
