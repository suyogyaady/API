const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {

    // 1. Check incoming data
    console.log(req.body);


    // 2. Destructure the incoming data
    const { firstName, lastName, email, password } = req.body;

    // 3. Validate the data (if empty, stop the process and send response)
    if (!firstName || !lastName || !email || !password) {
        // res.send("Please enter all fields!")
        return res.json({
            "success": false,
            "message": "Pleasse enter all fields!"
        })
    }



    // 4.  Error Handling (Try Catch)

    try {

        // 5. Check if the user is already registered
        const existingUser = await userModel.findOne({ email: email })

        // 5.1 if user found: Send response 
        if (existingUser) {
            return res.json({
                "success": false,
                "message": "User Already Exists!"
            })
        }

        // Hashing/Encryption of the password
        const randomSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, randomSalt)


        // 5.2 if user is new:

        const newUser = new userModel({
            //Database Fields  : Client's Value
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        })

        // Save to database
        await newUser.save()

        // send the respose
        res.json({
            "success": true,
            "message": "User Created Successfully!"
        })

        // 5.2.1 Hash the password
        // 5.2.2 Save to the database
        // 5.2.3 Send Successful response

    } catch (error) {
        console.log(error)
        res.json({
            "success": false,
            "message": "Internal server Error!"
        })
    }



    // 5.2.4 

}


// Login Function
const loginUser= async (req,res)=>{

    //Check incoming data
    console.log(req.body)

    // Destructuring
    const {email, password} = req.body;

    //Validation
    if(!email || !password){
        return res.json({
            "success" :false,
            "message": "Please enter all fields"
        })
    }

    // Try Catch
    try {

        // Find user (email)
        const user = await userModel.findOne({email:email})
        // found data : firstName, lastName, email, password

        // notFound (error messsage)
        if(!user){
            return res.json({
                "success" : false,
                "message" : "User not exists!"
            })
        }

        // Compare password (bcrypt)
        const isValidPassword = await bcrypt.compare(password,user.password)
        
        // If not valid (error)
        if(!isValidPassword){
            return res.json({
                "success" : false,
                "message" : "Password not matched!"
            })
        }

        // token (generate - user data + KEY)
        const token = await jwt.sign(
            {id : user._id, isAdmin: user.isAdmin},
            process.env.JWT_SECRET
        )

        // response (token, user data)
        res.json({
            "success" : true,
            "message" : "User Logged in Successful",
            "token" : token,
            "userData" : user
        })
        
    } catch (error) {
        console.log(error)
        return res.json({
            "success" : false,
            "message" : "Internal Server Error"
        })
        
    }
}


// exporting
module.exports = {
    createUser,
    loginUser
}

