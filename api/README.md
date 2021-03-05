REST API,\
This is restful api built with Express.js framework and the Sequelizejs ORM. This API provides a way to interact with a school database containing information 
about users and courses. Users can interact with the database to create new courses, retrieve information on existing courses, and update or delete existing courses.
Inorder for a user make changes to the database, they will be required to log in. If a user dosent have an account they can make one then login to access the full extent of this API.

Install dependencies => npm install

Usage => npm start\
Run 'npm run seed' to seed the database with a few initial entries.

This app will run on => localhost:5000/

Routes available 

GET /api/users - Retrieves the currently authenticated user.\
POST /api/users - Allowes the user to create a login account.\
GET /api/courses - Retrieves a list of courses from the database.\
GET /api/courses/:id - Retrieves a specific course and its information.\
POST /api/courses - Allows a user to create a course which only they will be able to update or delete.\
PUT /api/courses/:id - Allows the user to update any course they created.\
DELETE /api/courses/:id - User can delete any course they created.
