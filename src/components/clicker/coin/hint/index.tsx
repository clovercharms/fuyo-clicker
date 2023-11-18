import { Coin } from "./coin";
import { Label } from "./label";

export const HINT_DURATION = 1e3;

export interface HintProps {
    x: number;
    y: number;
    amount: number;
}

export const Hint = { Coin, Label };
