export default class Data {
    api(path, method = 'GET', body = null, requireAuth = false, credentials = null){
        const baseUrl = 'http://localhost:5000/api';
        const url = baseUrl + path;
        const options = {
            method,
            headers:{
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        return fetch(url, options)
    }

    async createUser(user){
        const response = await this.api('/users', 'POST', user);
        if(response.status === 201){
            console.log('created User')
        }else if (response.status === 400){
            console.log(response)
        }else{
            throw new Error();
        }
    }

}