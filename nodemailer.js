// подключение express
const express = require("express");
// создаем объект приложения
const app = express();
// cors
const cors = require('cors')

const nodemailer = require("nodemailer");

const bodyParser = require('body-parser')

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vilena27arturovna@gmail.com',
        pass: 'Integrirovanie27',
    },
});

app.post('/sendMessage', async function (req, res) {

    const {values} = req.body

    // send mail with defined transport object
   await transporter.sendMail({
        from: 'Vilena Portfolio Feedback',
        to: "vilena-forever@inbox.ru",
        subject: "HR wants me!!",
        html: `<div>
                    <div>Name: ${values.name}</div>
                    <div>E-mail: ${values.email}</div>
                    <div>Theme: ${values.theme}</div>
                    <div>Message: ${values.message}</div>
               </div>`,
    });

})

app.listen(3010, function () {
    console.log('Example app listening on port 3010')
})



