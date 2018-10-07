/**
 * Resolve and return the URL to a given pathname for a link.
 *
 * @param {String} pathname
 * @returns {String}
 */
const url = pathname => pathname.replace(/^\/+/, '');

/**
 * Resolve and return the URL to a given pathname for an asset.
 *
 * @param {String} pathname
 * @returns {String}
 */
const asset = pathname => url(pathname);

export {url, asset};
