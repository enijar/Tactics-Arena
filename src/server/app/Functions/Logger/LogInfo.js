import GetTime from "./GetTime";

/**
 * Simple console.info logger for dev-ops.
 *
 * TODO: If in production, save logs to file.
 *
 * @param {*} data
 */
export default data => {
    console.info(GetTime(), data);
}
