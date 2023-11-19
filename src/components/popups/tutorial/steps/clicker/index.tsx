import coin from "@/assets/images/tutorial/clicker.png";
import spill from "@/assets/images/spill.png";

import tutorialClasses from "../../index.module.css";

import classes from "./index.module.css";

export function Clicker() {
    return (
        <article className={classes.clicker}>
            <h1>Fuyo Coin</h1>
            <div className={tutorialClasses.container}>
                <div className={tutorialClasses.border}>
                    <img src={coin} className={classes.coin}></img>
                </div>
                <div>
                    <h2>Collecting Coins</h2>
                    <p>
                        Click on the{" "}
                        <span className={tutorialClasses["gold-text"]}>
                            Fuyo Coin
                        </span>{" "}
                        repeatedly to steal coins. Depending on upgrades, this
                        can be quite powerful!
                    </p>
                    <h2>Fuyonade</h2>
                    <p>
                        A{" "}
                        <span className={tutorialClasses["rainbow-text"]}>
                            certain liquid
                        </span>{" "}
                        will fill up over time, granting a short bonus to
                        production. Whenever it fills up, be sure to spill it!
                    </p>
                    <img src={spill} className={classes.spill} />
                </div>
            </div>
        </article>
    );
}
