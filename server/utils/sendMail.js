const nodemailer = require('nodemailer');
require("dotenv").config();

//ljwlnecwkvvachqv

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.SITE_EMAIL,
        pass: process.env.SITE_EMAIL_PASSWORD
    }
});


const sendMail = (email, subject, html) => {
    transporter.sendMail({
        from: 'bookshelfsrilanka@gmail.com',
        to: email,
        subject: subject,
        html: html
    }, function (err, data) {
        if (err) {
            console.log(err);
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    }
    );


}

module.exports = sendMail;