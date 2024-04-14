import axios from "axios";
axios.defaults.baseURL = `https://api.unsplash.com/`;
const ACCESS_KEY = `YaJJTeBQ6DHMEJ5Vo5r9CiLdVdupIp0mtFcd7X5uyDo`;

export const getImagesUnplash = async (searchImg, pageNumber) => {
    const params = {
        query: searchImg,
        page: pageNumber,
        per_page: 10,
        client_id: ACCESS_KEY,
    }
    try {
        const respons = await axios.get(`search/photos/?${new URLSearchParams(params).toString()}`);
        return respons.data;
    }
    catch (error) {
        console.log(error.message);
    }
}