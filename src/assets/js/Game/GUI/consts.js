import Furgon from "./Unit/Furgon";

export const ROWS = 11;
export const COLS = 11;
export const TILE_WIDTH = 50;
export const TILE_DEPTH = 10;
export const TILE_LENGTH = 50;
export const TILE_SPACING = 2;
export const BOARD_WIDTH = ROWS * (TILE_WIDTH + TILE_SPACING);
export const BOARD_HEIGHT = COLS * (TILE_LENGTH + TILE_SPACING);
export const UNIT_CLASSES = {
    furgon: Furgon
};
