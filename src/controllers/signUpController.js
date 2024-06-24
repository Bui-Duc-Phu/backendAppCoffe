const sequelize = require('../configs/db');
const { createToken } = require('../jwt/createToken');
const User = require('../models/User')





const createUser = async (req,res)=>{
    try {
        const { email, phoneNumber, fullName, password, typePassword } = req.body;
    
        const newUser = await User.create({
          email,
          phoneNumber,
          fullName,
          password,
          typePassword
        });
    
        const plainUser = newUser.get({ plain: true }); 

        res.status(201).json({
          message: 'User created successfully',
          data: {
            ...plainUser,
            accesstoken: await createToken(plainUser.email,plainUser.id)
          }
        });
    
        
      } catch (error) {
        if (error.name === 'SequelizeValidationError') {
          const validationErrors = error.errors.map(err => err.message);
          res.status(400).json({
            message: 'Validation errors',
            SQL_Error: validationErrors
          });
        } else if (error.name === 'SequelizeUniqueConstraintError') {
          res.status(400).json({
            message: 'Email already exists',
            SQL_Error: error.errors.map(err => err.message)
          });
        } else {
          res.status(500).json({
            message: 'Internal server error',
            error: error.message
          });
        }
      }

}

module.exports = {createUser}