const nodemailer = require('nodemailer')


function sendMail(sendTo, subject, bodyEmail) {
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.useremail,
            pass: process.env.passmail
        }
    })

    const mailOptions = {
        from: process.env.useremail, //email pengirim
        to: `${sendTo}`,
        subject: `${subject}`,
        html: `${bodyEmail}`
    }

    transporter.sendMail(mailOptions, function(err, info) {
        if(err){
            console.log(err)
        } else {
            console.log(info)
        }
    })
}

module.exports = sendMail