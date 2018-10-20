export default {
    tiles: [],
    board: [
        // Rotate this board 90 degrees counter clockwise and
        // that's how it will render to the canvas. This means
        // left is close to the camera and right in the distance.
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        ['furgon', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ['furgon', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 'furgon'],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 'furgon'],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    ],
    selectedUnit: null,
}
