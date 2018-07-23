/**
 * Import Dependencies
 * 
 * We're use AuthSession
 * @see https://docs.expo.io/versions/v28.0.0/sdk/auth-session
 * 
 */
import { AuthSession } from "expo";
import isPlainObject from 'lodash/isPlainObject';

/**
 * BASE Constant
 * This is used for base setting
 * 
 */
export const AUTH_URL = 'https://medium.com/m/oauth/authorize';

/**
 * SCOPE Constant
 * This is for default constant scope used by medium
 * @see https://github.com/Medium/medium-api-docs#21-browser-based-authentication
 * 
 */
export const SCOPES = [
    "basicProfile", "listPublications", "publishPost"
];

/**
 * Get the redirect url, and copy given url to your medium application project `Callback URLs`
 * @see https://docs.expo.io/versions/v28.0.0/sdk/auth-session#authsessiongetredirecturl
 * 
 */
export function getRedirectUrl() {
    return AuthSession.getRedirectUrl();
}

/**
 * Get all scopes
 */
export function getScopes() {
    return SCOPES.join();
}

/**
 * Converts an object to a query string.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
 * 
 * @param {Object} params An object to convert
 * @returns {String} A query string with key value pair
 */
function objectToQueryString(params) {
    return '?' + Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
}

/**
 * Get code information from login with medium
 * @see https://github.com/Medium/medium-api-docs#2-authentication
 * 
 * @param {Object} credentials Object of credentials you need to access information
 */
export async function logInAsync(credentials) {
    if (!isPlainObject(credentials)) {
        throw new Error('Credentials must be plain objects.');
    }

    if (typeof credentials.client_id === 'undefined' 
        || typeof credentials.scope === 'undefined' 
        || typeof credentials.state === 'undefined'
    ) {
        throw new Error(
            'Credentials may not have an undefined "type" property. ' +
            'Have you missing a value?'
        );
    }

    // get the redirect uri
    let redirectUrl = getRedirectUrl();
    
    // append new object
    credentials.response_type = 'code'; // always be `code`
    credentials.redirect_uri = redirectUrl;

    // get the auth url
    let authUrl = `${AUTH_URL}` + objectToQueryString(credentials);

    // start async
    const result = await AuthSession.startAsync({
        authUrl: authUrl
    })

    // give the result of start async
    return result;
}
