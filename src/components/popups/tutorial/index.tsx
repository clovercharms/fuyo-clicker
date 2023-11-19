import { useGameStore } from "@/stores/game";
import { Button } from "@/components/button";
import { Dialog } from "@/components/dialog";
import {
    Placement,
    autoUpdate,
    shift,
    useFloating,
} from "@floating-ui/react-dom";
import { useEffect, useState } from "react";
import cx from "classix";

import { PopupsRefs } from "..";

import { Step, meta } from "./steps";
import classes from "./index.module.css";

export interface TutorialProps {
    refs: PopupsRefs;
}

export function Tutorial({ refs }: TutorialProps) {
    const tutorial = useGameStore(state => state.popups.tutorial);
    const [placement, setPlacement] = useState<Placement>("left");

    const {
        refs: floatingRefs,
        floatingStyles,
        update,
    } = useFloating({
        placement: placement,
        middleware: [shift()],
        whileElementsMounted: autoUpdate,
    });

    useEffect(() => {
        if (!meta[tutorial.step]?.position) return;
        const position = meta[tutorial.step]!.position!;

        floatingRefs.setReference(refs[position.reference].current);
        setPlacement(position.placement);
        update();
    }, [tutorial.step, refs, floatingRefs, update]);

    if (tutorial.step === Step.END) return;

    const StepContent = meta[tutorial.step]?.component;

    return (
        <Dialog
            ref={floatingRefs.setFloating}
            className={cx(
                classes.tutorial,
                tutorial.step !== Step.START && classes.floating
            )}
            style={tutorial.step !== Step.START ? floatingStyles : undefined}
            open={true}
            closeable={false}
        >
            {StepContent && <StepContent />}
            <div className={classes.controls}>
                {tutorial.step !== Step.START ? (
                    <Button
                        onClick={() =>
                            tutorial.setStep(
                                Math.max(Step.START, tutorial.step - 1)
                            )
                        }
                    >
                        ◀ Prev
                    </Button>
                ) : (
                    <div></div>
                )}
                <Button onClick={() => tutorial.setStep(tutorial.step + 1)}>
                    {tutorial.step !== Step.SHOP ? "Next ▶" : "Finish ▶ 🏁"}
                </Button>
            </div>
        </Dialog>
    );
}
