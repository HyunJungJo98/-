const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/todos';

// const api = {
//     fetchUsers: (id) => {
//         return fetch(`${API_ENDPOINT}/${id}`).then((res) => res.json());
//     },
// };

const request = async (url) => {
    try {
        const result = await fetch(url);
        if (result.status < 300) {
            return result.json();
        } else if (result.status < 400) {
            return console.warn(`Redirection Error Code ${result.status}`);
        } else if (result.status < 500) {
            console.warn(`Client Error Code ${result.status}`);
            return null;
        } else if (result.status < 600) {
            return console.warn(`Server Error Code ${result.status}`);
        }
    } catch (e) {
        console.warn(e);
    }
};

const api = {
    fetchUsers: (id) => request(`${API_ENDPOINT}/${id}`),
};
