import image from "@/assets/images/tutorial/repro.png";
import kiss from "@/assets/images/clover/base/regular/kiss.png";
import hero from "@/assets/images/clover/base/hero/hero.png";

import tutorialClasses from "../../index.module.css";

import classes from "./index.module.css";

export function Repro() {
    return (
        <article className={classes.repro}>
            <h1>Reproduction Room</h1>
            <div className={tutorialClasses.container}>
                <div>
                    <h2>Reproduction</h2>
                    <p>
                        In order to get clovers to work for free, clovers need
                        to get together and{" "}
                        <span className={tutorialClasses["crimson-text"]}>
                            smooch
                        </span>
                        <img src={kiss} className={classes["kiss-clover"]} />
                        together to produce offspring.
                    </p>
                    <p>
                        You can either{" "}
                        <span className={tutorialClasses["crimson-text"]}>
                            kiss
                        </span>{" "}
                        the clover or{" "}
                        <span className={classes["lime-text"]}>upgrade</span> to
                        produce more clovers.
                    </p>
                </div>
                <div className={tutorialClasses.border}>
                    <img src={image} className={classes.image}></img>
                </div>
            </div>
            <div className={tutorialClasses.container}>
                <div>
                    <h2>Hero Clovers</h2>
                    <p>
                        When clovers feel extra special, they produce something
                        called a{" "}
                        <span className={tutorialClasses["gold-text"]}>
                            Hero Clover
                        </span>{" "}
                        to boost production.
                    </p>
                    <p>
                        Drag this{" "}
                        <span className={tutorialClasses["gold-text"]}>
                            Hero Clover
                        </span>{" "}
                        to their specific job to make them start working hard!
                    </p>
                </div>
                <img src={hero} className={classes.hero}></img>
            </div>
        </article>
    );
}
