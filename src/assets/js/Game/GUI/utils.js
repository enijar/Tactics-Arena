import {BOARD_WIDTH, TILE_WIDTH, TILE_SPACING, BOARD_HEIGHT, TILE_LENGTH} from "./consts";

export function getTilePosition(row, col, y = 0) {
    // x, y, z
    return [
        (BOARD_WIDTH / 2) - ((TILE_WIDTH + TILE_SPACING) * (row - 0.5)),
        y,
        (BOARD_HEIGHT / 2) - ((TILE_LENGTH + TILE_SPACING) * (col - 0.5)),
    ];
}
