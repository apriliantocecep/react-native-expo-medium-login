/**
 * Medium Library
 * 
 * Javascript client for Medium app
 * Documentation: https://github.com/Medium/medium-api-docs#1-overview
 * 
 * @version v1.0.0
 * @since July 2018
 * @author Cecep Aprilianto
 * 
 * Website: http://cecepaprilianto.com
 * Github Repository: https://github.com/apriliantocecep/react-native-expo-medium-login
 * 
 * Content of this library
 * @class Medium
 * 
 */
class Medium {
    
    /**
     * Core constructor
     * 
     * @param {{ client_id: string, client_secret: string }} credentials 
     * 
     * @constructor
     */
    constructor(credentials) {
        if (!this._isPlainObject(credentials)) {
            throw new Error('Credentials must be plain objects.');
        }

        this._enforce(credentials, ['client_id', 'client_secret']);

        this.client_id = credentials.client_id;
        this.client_secret = credentials.client_secret;
        this.access_token = "";
    }

    setAccessToken(access_token) {
        return this.access_token = access_token
    }

    /**
     * 
     * @param {String} state Arbitrary text of your choosing
     * @param {String} redirect_url The URL where medium will send the user after they have completed the login dialog.
     * @param {Array.<Scope>} scopes The access that your integration is requesting, comma separated. 
     */
    getAuthorizationUrl(state, redirect_url, scopes) {
        let params = {
            client_id: this.client_id,
            scope: scopes.join(','),
            response_type: 'code',
            state: state,
            redirect_uri: redirect_url
        }

        return this._urlAuth() + this._objectToQueryString(params);
    }

    /**
     * Valid scopes.
     * 
     * @returns {Array} Array of valid scopes.
     */
    scopes() {
        return ["basicProfile", "listPublications", "publishPost"];
    }
    
    /**
     * Set url authentication
     */
    _urlAuth() {
        return "https://medium.com/m/oauth/authorize";
    }

    /**
     * 
     * @param {Object} params An object to convert
     * @returns {String} A query string with key value pair
     */
    _objectToQueryString(params) {
        return '?' + Object.entries(params)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&');
    }

    /**
     * Enforces given credentials. Defines all keys.
     * Error if any is missing.
     * 
     * @param {Object} options 
     * @param {Array} requiredKeys 
     */
    _enforce(options, requiredKeys) {
        if (!options) {
          throw new Error('Parameters for this are undefined');
        }

        requiredKeys.forEach( (key) => {
          if (!options[key]) throw new Error(`Missing required parameter "${key}"`);
        })
    }

    /**
     * Validate if type of (first param) is an object
     * 
     * @param {Object} object 
     * @return {Bool}
     */
    _isPlainObject(object) {
        if (typeof object === "object") {
            return true;
        }

        return false;
    }
}

module.exports = {
    Medium: Medium
};