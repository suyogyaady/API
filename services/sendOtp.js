const axios = require('axios')

const sendOtp = async (phone, otp) => {

    //setting state
    let isSent = false

    //URL to send OTP
    const url = 'https://api.managepoint.co/api/sms/send'

    //Payload to send
    const payload = {
        'apiKey' : 'c1c5427b-6c19-4f42-a534-7c0e4d550659' ,
        'to' : phone,
        'message' : `Your verification code is ${otp}`
    }

    try {
        const res = await axios.post(url, payload)
        if(res.status === 200){
            isSent = true;
        }
        
    } catch (error) {
        console.log('Error sending OTP', error.message)
        
    }
    return isSent;
}
module.exports = sendOtp;