const { Model } = require('sequelize');
const bcrypt = require('bcrypt')
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class User extends Sequelize.Model{}
    User.init({
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate:{
                notNull: {
                    msg: "Must provide a first name."
                },
                notEmpty: {
                    msg: 'Must provide a first name.'
                }
            }
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate:{
                notNull: {
                    msg: "Must provide a last name."
                },
                notEmpty: {
                    msg: 'Must provide a last name.'
                }
            }
        },
        emailAddress: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail:{
                    msg: 'Must provide a valid email address...'
                },
                notNull: {
                    msg: "Must provide a email address."
                },
                notEmpty: {
                    msg: 'Must provide a email address.'
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: "Please provide a password",
              },
              notEmpty: {
                msg: "Please provide a password",
              },
            },
          },

    },{ sequelize });
    //this hook will run before the data is created to encrypt the password
    User.addHook("beforeCreate", user => {
        user.password = bcrypt.hashSync(user.password, 10)
    });
    //DB association to the course module  
    User.associate = (models) => {
        User.hasMany(models.Course, {
            as: "User",
            foreignKey: {
                fieldName: "userId",
            }
        })
    }
    
    return User;
}