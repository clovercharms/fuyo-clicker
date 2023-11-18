/* eslint-disable react-refresh/only-export-components */
import { useGameStore } from "@/stores/game";
import { Button } from "@/components/button";
import { Dialog } from "@/components/dialog";
import { Placement, autoUpdate, useFloating } from "@floating-ui/react-dom";
import { useEffect, useState } from "react";
import cx from "classix";

import { PopupsRefs } from "..";

import classes from "./index.module.css";

export enum Step {
    START,
    CLICKER,
    REPRO,
    SHOP,
    END,
}

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
        whileElementsMounted: autoUpdate,
    });

    useEffect(() => {
        switch (tutorial.step) {
            case Step.CLICKER:
                floatingRefs.setReference(refs.clicker.current);
                setPlacement("right");
                update();
                break;
            case Step.REPRO:
                floatingRefs.setReference(refs.repro.current);
                setPlacement("left");
                break;
            case Step.SHOP:
                floatingRefs.setReference(refs.shop.current);
                setPlacement("left");
                break;
            default:
                floatingRefs.setReference(null);
                break;
        }
    }, [tutorial.step, refs, floatingRefs, update]);

    if (tutorial.step === Step.END) return;

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
            <h1>Welcome to Fuyo Clicker! {tutorial.step}</h1>
            <h3>Lorem ipsum</h3>
            <div className={classes.controls}>
                <Button
                    onClick={() =>
                        tutorial.setStep(
                            Math.max(Step.START, tutorial.step - 1)
                        )
                    }
                >
                    Prev
                </Button>
                <Button onClick={() => tutorial.setStep(tutorial.step + 1)}>
                    Next
                </Button>
            </div>
        </Dialog>
    );
}
