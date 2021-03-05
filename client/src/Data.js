export default class Data {
    api(path, method = 'GET', body = null, requireAuth = false, credentials = null){
        const baseUrl = 'http://localhost:5000/';
        const url = baseUrl + path;
        const options = {
            method,
            headers:{
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        return fetch(url, options)
    }
}