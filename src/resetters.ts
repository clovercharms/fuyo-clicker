import { GameState } from "./store";

export const resetters: (() => Partial<GameState>)[] = [];
