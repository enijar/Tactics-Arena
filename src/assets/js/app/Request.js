import request from "superagent";

const DEFAULT_HEADERS = {};

const sendRequest = (method, endpoint, data = {}, headers = {}) => new Promise(resolve => {
    headers = Object.assign(DEFAULT_HEADERS, headers);

    request[method](endpoint)
        .set(headers)
        .send(data)
        .end((err, res) => {
            if (res.statusCode < 300) {
                resolve({success: true, body: res.body, code: res.statusCode});
                return;
            }

            let errors = ['Unknown error'];

            if (res.body && res.body.errors) {
                errors = res.body.errors;
            }

            resolve({success: false, errors, code: res.statusCode});
        });
});

export default class Api {
    static get(endpoint, data = {}) {
        return sendRequest('get', endpoint, data);
    }

    static post(endpoint, data = {}) {
        return sendRequest('post', endpoint, data);
    }
}
