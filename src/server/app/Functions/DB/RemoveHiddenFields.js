export default (object, hidden = []) => {
    // Delete hidden properties from object
    for (let i = 0; i < hidden.length; i++) {
        if (object.hasOwnProperty(hidden[i])) {
            delete object[hidden[i]];
        }
    }

    return object;
}
