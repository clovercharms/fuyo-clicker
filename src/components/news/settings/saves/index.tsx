import { Button } from "@/components/button";
import classes from "../index.module.css";
import { useSaves } from "./useSaves";
import { useReset } from "./useReset";

export function Saves() {
    const { exportSave, loadSave } = useSaves();
    const { reset } = useReset();

    return (
        <section>
            <h2>Saves</h2>
            <div className={classes.row}>
                <Button onClick={exportSave}>📤 Export Save</Button>
                <Button onClick={loadSave}>📩 Load Save</Button>
            </div>
            <Button onClick={reset}>🛑 Reset Progress</Button>
        </section>
    );
}
