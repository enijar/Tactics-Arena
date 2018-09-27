/**
 * Toggle on/off the socket events.
 *
 * @param {Object} socket
 * @param {Object} events
 * @param {String} state
 */
export default (socket, events, state) => {
    for (let event in events) {
        if (events.hasOwnProperty(event)) {
            socket[state](event, events[event]);
        }
    }
}
