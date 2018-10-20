export const ROWS = 11;
export const COLS = 11;
export const TILE_WIDTH = 50;
export const TILE_DEPTH = 10;
export const TILE_LENGTH = 50;
export const TILE_SPACING = 2;
export const TILES = [
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
];
export const BOARD_WIDTH = ROWS * (TILE_WIDTH + TILE_SPACING);
export const BOARD_HEIGHT = COLS * (TILE_LENGTH + TILE_SPACING);
export const CAMERA = {
    position: {
        x: -397.2,
        y: 546.2,
        z: 318.7,
    },
    rotation: {
        x: -1.047,
        y: -0.470,
        z: -0.666,
    }
};
