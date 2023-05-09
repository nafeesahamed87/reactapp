/**
 * This module provides a set of utility functions for string manipulation.
 *
 * @module http-services
 * @version 1.2.0
 * @since 2021-01-22
 */

import axios from 'axios';
import { saveAs } from 'file-saver';

/**
 * Returns an object with an `Authorization` property,
 * whose value is a JWT constructed using the provided token.
 *
 * @param {string} token - The token to use in the JWT.
 * @returns {Object} An object with an `Authorization` property.
 */
export function getAuthHeader(token) {
    if (!token) {
        return {};
    }
    return {
        Authorization: `Bearer ${token}`,
    };
}

/**
 * Makes a GET request to the specified URL,
 * using the `store` object's `token` property as the `Authorization` header.
 *
 * @param {string} url - The URL to send the request to.
 * @param {Object} store - An object with a `token` property.
 * @returns {Promise} A promise that resolves to the server's response.
 */
export async function get(url, store) {
    const options = {
        headers: {
            ...getAuthHeader(store?.token),
        },
    };
    return axios.get(url, options);
}

/**
 * Makes a POST request to the specified URL,
 * using the provided data as the request body
 * and the `store` object's `token` property as the `Authorization` header.
 *
 * @param {string} url - The URL to send the request to.
 * @param {Object} data - The data to send in the request body.
 * @param {Object} store - An object with a `token` property.
 * @returns {Promise} A promise that resolves to the server's response.
 */
export async function post(url, data, store) {
    const options = {
        data,
        url,
        method: 'POST',
        headers: {
            ...getAuthHeader(store?.token),
            'Content-Type': 'application/json',
        },
    };
    return axios.post(url, JSON.stringify(data), options);
}

/**
 * Makes a PUT request to the specified URL,
 * using the provided data as the request body
 * and the `store` object's `token` property as the `Authorization` header.
 *
 * @param {string} url - The URL to send the request to.
 * @param {Object} data - The data to send in the request body.
 * @param {Object} store - An object with a `token` property.
 * @returns {Promise} A promise that resolves to the server's response.
 */
export async function put(url, data, store) {
    const options = {
        headers: {
            ...getAuthHeader(store?.token),
            'Content-Type': 'application/json',
        },
    };
    return axios.put(url, JSON.stringify(data), options);
}

/**
 * Makes a DELETE request to the specified URL,
 * using the 'token' property from the provided
 * store object as the 'Authorization' header
 *
 * @param {string} url - The URL to send the request to.
 * @param {Object} store - An object with a `token` property.
 * @returns {Promise} A promise that resolves to the server's response.
 */
export async function remove(url, data, store) {
    const options = {
        headers: {
            ...getAuthHeader(store?.token),
        },
    };
    return axios.delete(url, { data }, options);
}

/**
 * Makes a POST request with a 'multipart/form-data' content-type,
 * using the provided data as the request body,
 * an onUploadProgress function, and the 'token' property
 * from the provided store object as the 'Authorization' header.
 *
 * @param {string} url - The URL to send the request to.
 * @param {Object} data - The data to send in the request body.
 * @param {function} onUploadProgress - parameter is a callback function that takes in one argument, progressEvent, which is an object that represents the progress of the upload. The progressEvent object contains properties such as loaded and total, which can be used to determine the percentage of the file that has been uploaded.
 * @param {Object} store - An object with a `token` property.
 * @returns {Promise} A promise that resolves to the server's response.
 */
export async function upload(url, data, onUploadProgress, store) {
    const options = {
        onUploadProgress,
        headers: {
            ...getAuthHeader(store?.token),
            'Content-Type': 'multipart/form-data',
        },
    };
    return axios.post(url, JSON.stringify(data), options);
}

/**
 * Makes a GET request to the specified URL,
 * using the 'token' property from the provided store
 * object as the 'Authorization' header, and with an optional 'Accept' header.
 *
 * @param {string} url - The URL to send the request to.
 * @param {Object} store - An object with a `token` property.
 * @param {string} accept - The expected response format from the server. This will be sent as the 'Accept' header in the request.
 * @returns {Promise} A promise that resolves to the server's response.
 */
export async function download(url, store, accept) {
    const options = {
        headers: {
            ...getAuthHeader(store?.token),
            Accept: accept || false,
        },
        responseType: 'arraybuffer',
    };
    return axios.get(url, options);
}

/**
 * Makes a POST request to the specified URL with a specified data object,
 * using the 'token' property from the provided
 * store object as the 'Authorization' header, and with an optional 'Accept' header.
 * The response is saved as a file using the 'file-saver' library.
 *
 * @param {string} url - The URL to send the request to.
 * @param {Object} data - The data to send in the request body.
 * @param {Object} store - An object with a `token` property.
 * @param {string} accept - The expected response format from the server. This will be sent as the 'Accept' header in the request.
 * @returns {Promise} A promise that resolves to the server's response.
 */
export async function downloadPostData(url, data, store, accept) {
    const options = {
        headers: {
            ...getAuthHeader(store?.token),
            Accept: accept || false,
        },
        responseType: 'arraybuffer',
    };
    return axios.post(url, data, options);
}

/**
 * Saves the provided data as a file with the specified file name and type.
 * @param {ArrayBuffer} buffer - The data to save as a file.
 * @param {string} type - The MIME type of the file.
 * @param {string} fileName - The name of the file.
 */
export const saveDownloadedFile = (buffer, type, fileName) => {
    const data = new Blob([buffer], {
        type,
    });
    saveAs(data, fileName);
};
