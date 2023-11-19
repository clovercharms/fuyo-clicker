import image from "@/assets/images/fuyo.jpg";
import pablo from "@/assets/images/species/pablo.png";

import tutorialClasses from "../../index.module.css";

export function Start() {
    return (
        <article>
            <h1>Welcome to Fuyo Clicker!</h1>
            <div className={tutorialClasses.container}>
                <div className={tutorialClasses.border}>
                    <img
                        src={image}
                        style={{
                            width: 128,
                            height: 128,
                        }}
                    />
                </div>
                <div>
                    <h2>Objective</h2>
                    <p>
                        Your{" "}
                        <span className={tutorialClasses["lime-text"]}>
                            goal
                        </span>{" "}
                        is to mischievously get (steal) as many wallets and
                        coins as you can!
                    </p>
                </div>
            </div>
            <div className={tutorialClasses.container}>
                <img
                    src={pablo}
                    style={{
                        width: 80,
                    }}
                />
                <div>
                    <h2>Reward</h2>
                    <p>
                        Upon reaching the end, theres a little{" "}
                        <span className={tutorialClasses["violet-text"]}>
                            special suprise
                        </span>
                        , So keep stealing!
                    </p>
                </div>
            </div>
        </article>
    );
}
