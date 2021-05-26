const express = require("express");
const app = express();
const cors = require('cors')

const nodemailer = require("nodemailer");

const bodyParser = require('body-parser')

/*app.use(cors({ origin: "http://localhost:3000/portfolio" }))*/

const corsOptions = {
    origin: 'http://localhost:3000/portfolio',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

const smtp_login = process.env.SMTP_LOGIN
const smtp_password = process.env.SMTP_PASSWORD


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login,
        pass: smtp_password,
    },
});

app.get("/", function(request, response){

    // отправляем ответ
    response.send("<h2>Привет Express!</h2>");
});

app.post('/sendMessage', cors(corsOptions), async function (req, res) {

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

const port = process.env.PORT || 3010

app.listen(port, function () {
    console.log('Example app listening on port 3010')
})



