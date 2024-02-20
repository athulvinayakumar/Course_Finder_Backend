
// import modal
const users = require('../Model/userSchema')

const jwt = require('jsonwebtoken')

// register
exports.register = async(req, res) => {

    try {

        const { username, email, password } = req.body

        const existingUser = await users.findOne({ email })

        if (existingUser) {
            res.status(406).json("User Already Exists...... Please Login!!!")
        }
        else {

            const newUser = new users({
                username,
                email,
                password,
                profile: ""
            })
            // add to mongodb - use save method in mongoose
            await newUser.save()

            res.status(200).json(newUser)
        }

    } catch (err) {
        res.status(401).json(`Register failed due to ${err}`)
    }
}

// login
exports.login = async (req, res) => {

    try {
        const { email, password } = req.body

        const existingUser = await users.findOne({ email, password })

        console.log(existingUser);

        if (existingUser) {

            const token = jwt.sign({ userId: existingUser._id }, "superSecretKey12345")

            res.status(200).json({
                existingUser,
                token
            })
        } else {
            res.status(404).json("Incorrect email/password")
        }
    } catch (err) {
        res.status(401).json(`Login request failed due to:${err}`)
    }

}


exports.getallusers=async(req,res)=>{
  
    try{
        const alluser=await users.find()
        res.status(200).json(alluser)
    }
    catch(err){
        res.status(401).json(`request failed due to :${err}`)
    }
    
    }