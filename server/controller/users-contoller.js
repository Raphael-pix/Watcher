
const Users = require('../model/users')
const bcrypt = require('bcrypt')

const passwordReq = [
    'at least one uppercase letter',
    'at least one lowercase letter',
    'at least one digit',
    'at least one special character(@,*,#,%,-,$,+,!)',
    'at least 8 characters'
]


const addUser = async (req,res)=>{
    const {name,email,password,confirmPassword} = req.body
    const currentDate = new Date()

    if(!isValidEmail(email)){
        return res.status(404).json({message:['email is not valid.Please try again']})
    }
    if(password !== confirmPassword){
        return res.status(404).json({message:['passwords do not match']})
    }
    if(!isValidPassword(password)){
        return res.status(404).json({message:passwordReq})
    }

    const existsingUser = await Users.findOne({email:email})
    if(existsingUser){
        return res.status(404).json({message:['email already taken']})
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = new Users({
        name,email,password:hashedPassword,date:currentDate
    })

    try{
       await newUser.save()
       
    }catch(e){
        console.log(e)
       return res.status(404).json({message:['unable to create user']})
    }
    return res.status(200).json({newUser})
}

const signinUser = async(req,res)=>{
    const {email,password}=req.body
    
    const user = await Users.findOne({email:email})
    if(!user){
        return res.status(404).json({message:['user does  not exist']})
    }
  try{      
        if(await bcrypt.compare(password, user.password)){
            return res.status(200).json({user})
        }else{
            return res.status(404).json({message:['incorrect password or email.Please try again']})
        }
    }catch{
        return res.status(404).json({message:['user not found']})
    }
}

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to validate password format
function isValidPassword(password) {
    // const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*#%-$+!])[a-zA-Z\d@*#%-$+!]{8,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])/;
    return passwordRegex.test(password);
}

module.exports = {addUser,signinUser}