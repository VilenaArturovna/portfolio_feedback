const express = require("express")
const app = express()
const cors = require('cors')
const nodemailer = require("nodemailer")
const bodyParser = require('body-parser')

const smtp_login = process.env.SMTP_LOGIN 
const smtp_password = process.env.SMTP_PASSWORD 
const port = process.env.PORT || 3010

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login,
        pass: smtp_password,
    },
})

app.use(cors({
    origin: 'https://vilenaarturovna.github.io'
}))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

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
    res.send()
    console.log("Message sent: %s", info.messageId)
})

app.listen(port, function () {
    console.log('Example app listening on port 3010')
})



