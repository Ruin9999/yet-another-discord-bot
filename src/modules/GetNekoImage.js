const axios = require("axios");

module.exports = {
    /**
     * Function to query Nekobot image endpoints
     * @param {params} params Parameters to send
     * @returns JSON object containing response
     */
    async GetImage(params) {
        const options = {
            method: "GET",
            url: "https://nekobot.xyz/api/image",
            params,
        }

        return await axios.request(options);
    },

    /**
     * Function to query Nekobot image generation endpoints
     * @param {params} params Parameters to send
     * @returns JSON object containing response
     */
    async GetImageGen(params) {
        const options = {
            method: "GET",
            url: "https://nekobot.xyz/api/imagegen",
            params,
        }

        return await axios.request(options);
    }
}