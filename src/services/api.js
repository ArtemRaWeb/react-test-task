/* eslint-disable no-useless-catch */
const API_URL = 'http://data.orghunter.com/v1/';

export const INIT_REQUEST_PARAMS = {
    mode: 'no-cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
};

export const getData = async (url = '') => {
    try {
        const response = await fetch(`${API_URL}${url}`, {
            method: 'GET',
            ...INIT_REQUEST_PARAMS,
        });

        return response.json();
    } catch (err) {
        throw err;
    }
};
