export default class Data {
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = `http://localhost:5000/api${path}`;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if(body !== null){
            options.body = JSON.stringify(body)
        }

        if(requiresAuth === true){
            const userCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`)
            options.headers['Authorization'] = `Basic ${userCredentials}`
        }

        return fetch(url, options);
    }

    async createUser(user){
        console.log('Create user')
        const response = await this.api('/users', 'POST', user, false, null);
        if(response.status === 201){
            console.log('created User')
        }else if (response.status === 400){
            console.log(response)
        }else{
            throw new Error();
        }
        return response
    }
    async userLogin(emailAddress, password){
        console.log('****Login ****')
        const response = await this.api('/users', 'GET', null, true, {emailAddress, password})
        if(response.status){
            return response.json().then(data => data)
        }

    }
    //create course 
    //update course 
    //delete course

}