const express = require("express")
const app = express()
const cors = require('cors')
const nodemailer = require("nodemailer")
const bodyParser = require('body-parser')

const smtp_login = process.env.SMTP_LOGIN || 'vilena27arturovna@gmail.com'
const smtp_password = process.env.SMTP_PASSWORD || 'Integrirovanie27'
const port = process.env.PORT || 3010

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login,
        pass: smtp_password,
    },
})

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

//app.use(cors())
//'https://vilenaarturovna.github.io'
//'http://localhost:3000'

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Add headers
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.get("/", function (req, res) {
    res.send("<h2>Привет Express!</h2>")
})

app.post('/sendMessage', async function (req, res) {

   /* res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.set('Access-Control-Allow-Credentials', true);*/

    const {values} = req.body

    const info = await transporter.sendMail({
        from: 'Vilena Portfolio Feedback',
        to: "vilena-forever@inbox.ru",
        subject: "HR wants me!!",
        html: `<div>
                    <div>Name: ${values.name}</div>
                    <div>E-mail: ${values.email}</div>
                    <div>Theme: ${values.theme}</div>
                    <div>Message: ${values.message}</div>
               </div>`,
    })

    res.send()

    console.log("Message sent: %s", info.messageId)
})

app.listen(port, function () {
    console.log('Example app listening on port 3010')
})



