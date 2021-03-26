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
        const response = await this.api('/users', 'POST', user, false, null);
        if(response.status === 201){
            console.log('created User')
            return response
        }else if (response.status === 400){
            console.log(response)
        }else{
            throw new Error();
        }
        return response
    }
    async userLogin(emailAddress, password){
        const response = await this.api('/users', 'GET', null, true, {emailAddress, password})
        if(response.status){
            return response.json().then(data => data)
        }

    }
    async createCourse(user, course){
        const {emailAddress , password } = user
        const response = await this.api('/courses', 'POST', course, true, {emailAddress, password})
        if(response.status){
            return response
        }
    }
    async courseInfo(courseId){
        const response = await this.api(`/courses/${courseId}`, 'GET', null, false, null)
        if(response.status === 200){
            return response.json().then(data => data)
        }else{
            return response.status
        }
    } 
    //update course 
    async updateCourse(courseId, courseInfo, user){
        const { emailAddress, password} = user
        const response = await this.api(`/courses/${courseId}`, 'PUT', courseInfo, true, { emailAddress, password })
        if(response.status === 204){
            return response
        }else{
            return response
        }
    }
    //delete course
    async removeCourse(courseId, authUser){
        const {emailAddress, password} = authUser 
        const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, {emailAddress, password})
        if(response.status === 403){
            return response.json()
        }else {
            return response
        }
    }
    

}