const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const auth = require('basic-auth');
const {sequelize, User, Course} = require('../models')

asyncHandler = (cb) => {
    return async(req, res, next) => {
        try{
            await cb(req, res, next)
        }catch(error){
            next(error)
        }
    }
}

authenticateUser = () => {
    return async(req, res, next) =>{
        let err;
        const credentials = auth(req);
        if(credentials){
            const user = await User.findOne({where: {emailAddress: credentials.name}});
            if(user){
                const userSecret = bcrypt.compareSync(credentials.pass, user.dataValues.password);
                if(userSecret){
                    req.currentUser = user;
                }else{
                    err = `Password did not match.`
                }
            }else{
                err = `No user was found.`
            }
        }else {
            err = `Auth header was not found.`
        }
        if(err){
            res.status(401).json({err})
        }
        next();
    }
}
router.get('/users', authenticateUser(), asyncHandler(async(req, res, next) => {
    let parsedValues = {
        "id": req.currentUser.dataValues.id,
        "firstName": req.currentUser.dataValues.firstName,
        "lastName": req.currentUser.dataValues.lastName,
        "emailAddress": req.currentUser.dataValues.emailAddress 
    }
    res.status(200).json(parsedValues);
}))

router.post('/users', asyncHandler(async(req, res) => {
    let err;
    try{
        console.log(req.body)
        await User.create(req.body);
        res.location("/").status(201).end();
    }catch(error){
        if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
            let errors = [];
            error.errors.forEach(err =>  errors.push(err.message));
            res.status(400).json({errors});
        } else {
            throw error;
        }
    }
}));

router.get("/courses", async (req, res) => {
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          as: "User",
          attributes:['firstName','lastName','emailAddress'] //This will only return these attributes from the associated model 
        },
      ],
      attributes:['id','title','description','estimatedTime','materialsNeeded','userId',]
    });
    res.status(200).json(courses);
});

router.post('/courses', authenticateUser(),asyncHandler(async(req, res) => {
    try{
        const course =  await Course.create(req.body);  
        res.location(`/courses/${course.dataValues.id}`);
        res.status(201).end();
    }catch(error){
        if(error.name === 'SequelizeValidationError'){
            let errors = []
            error.errors.forEach(err => errors.push(err.message))
            res.status(400).json({errors});
        }
        
        throw error;
    }
}));

router.get('/courses/:id', asyncHandler(async(req, res) => {
    let course = await Course.findByPk(req.params.id);
    if(course){
        course = await Course.findByPk(req.params.id, {
            include: [
              {
                model: User,
                as: "User",
                attributes: ['firstName','lastName','emailAddress', 'password'] //This will only return these attributes from the associated model 
              },
            ],
            attributes:['id','title','description','estimatedTime','materialsNeeded','userId',]
          });
        res.status(200).json(course);
    }else{
        res.sendStatus(400);
        throw error = new Error('Query not found.');
    }
}));

router.put('/courses/:id', authenticateUser(),asyncHandler(async(req, res) => {
    let err;
    if(req.body.title && req.body.description){
        let course = await Course.findByPk(req.params.id);
        if(course){
            if(course.dataValues.userId == req.currentUser.dataValues.id){
                await course.update(req.body);
                res.sendStatus(204);
            }else{
                const err = `Must be the owner of the course to update.`;
                res.status(403).json({err});
            } 
        }else{
            throw error = new Error('Query not found.');
        }  
    }else{
        err = `No Title or Description was provided.`;
    }
    if(err){
        res.status(400).json({err});
    }
}));

router.delete('/courses/:id', authenticateUser(),asyncHandler(async(req, res) => {
    let course = await Course.findByPk(req.params.id);
    let err;
    if(course){
        if(course.dataValues.userId == req.currentUser.dataValues.id){
            await course.destroy();
            res.sendStatus(204);
        }else{
            err = `Must be the owner of this course to delete.`;
        }   
    }else{
        throw error = new Error('Query not found');
    }
    if(err){
        res.status(403).json({err});
    }
}));

module.exports = router;