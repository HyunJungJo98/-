const API_ENDPOINT =
    'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

const request = async (url) => {
    try {
        const result = await fetch(url);
        if (result.status < 300) {
            return result.json();
        } else if (result.status < 400) {
            return console.warn(`Redirection Error Code ${result.status}`);
        } else if (result.status < 500) {
            return console.warn(`Client Error Code ${result.status}`);
        } else if (result.status < 600) {
            return console.warn(`Server Error Code ${result.status}`);
        }
    } catch (e) {
        throw new Error(e);
    }
};

export const api = {
    rootDir: () => {
        return request(`${API_ENDPOINT}`);
    },
    dir: (nodeId) => {
        return request(`${API_ENDPOINT}/${nodeId}`);
    },
};
