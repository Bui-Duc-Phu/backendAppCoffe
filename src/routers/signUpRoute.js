
const express = require('express')
const bodyParser = require("body-parser");
const router_SignUp = express.Router()

router_SignUp.use(bodyParser.json());
router_SignUp.use(bodyParser.urlencoded({ extended: true }));


const {
    createUser
}= require('../controllers/signUpController')



const {
    checkData
} = require('../middleware/signUpMiddleware')
router_SignUp.post('/create-user',checkData,createUser);


module.exports = {router_SignUp}