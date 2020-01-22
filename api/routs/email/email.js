


const express = require('express')
const router = express.Router()
var nodemailer = require('nodemailer');
const cre = require("../email/cre")




/**
 *  POST http://localhost:3000/email/send
{
	"name": "Tomas Mali",
    "email" : "tomasmali@gmail.com",
    "emailtext" : "tomas prova ricezione email"
}
 */
router.post('/send', (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const emailtext = req.body.emailtext

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: cre.user,
            pass: cre.pass
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: email,
        to: "tomasmali08@gmail.com",
        subject: '##### MODULO JEXP ##### \n Mandato da: ' + email,
        text: emailtext
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Errore dal server: \n" + (error));
            res.send("Errore dal server: \n" + (error))
        } else {
            console.log('Email sent: ' + info.response);
            res.send(true)
        }
    });
    console.log("Nome: " + name + "\n" + "Email: " + email + "\n" + "Testo della mail: " + emailtext + "\n")
})




module.exports = router;