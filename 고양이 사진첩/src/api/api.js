const END_POINT =
    'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

export const request = async (nodeId) => {
    try {
        const result = await fetch(`${END_POINT}/${nodeId ? nodeId : ''}`);
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
        console.warn(e);
    }
};
