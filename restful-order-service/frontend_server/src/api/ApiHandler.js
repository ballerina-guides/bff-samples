import axios from 'axios';

export const getAPI = async ( url, config) => {
    try {
        const response = await axios.get(url, config);
        return response;
    } catch (error) {
        return error;
    }
}

export const postAPI = async ( url, data, config) => {
    try {
        const response = await axios.post(url, data, config);
        return response;
    } catch (error) {
        throw {error: true, data: error};
    }
}
