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

/*const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}*/


app.use(cors())
//app.use(cors(corsOptions))
//'https://vilenaarturovna.github.io'
// 'http://localhost:3000'

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get("/", function (req, res) {
    res.send("<h2>Привет Express!</h2>")
})

app.post('/sendMessage', async function (req, res) {

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

    res.send(req.body)

    console.log("Message sent: %s", info.messageId)
})

app.listen(port, function () {
    console.log('Example app listening on port 3010')
})



