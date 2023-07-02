import {USEREMAIL,PASS,PORT} from "../../.env"
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));


app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

function sendEmail({ recipient_email, OTP }) {
    return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: process.env.USEREMAIL,
        pass: process.env.PASS,
        },
    });

    const mail_configs = {
        from: process.env.USEREMAIL,
        to: recipient_email,
        subject: "RECUPERACIÓN DE CUENTA",
        html:  `<!DOCTYPE html>
        <html lang="es" >
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
        <!-- partial:index.partial.html -->
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Contraseña</a>
            </div>
            <p style="font-size:1.1em">Hola,</p>
            <p>Para poder reestablecer su contraseña y tener acceso de nuevo a su cuenta, ingrese el codigo OTP que solo es vigente durante 5 minutos</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
            <p style="font-size:0.9em;">DIPP<br />UNAH</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Honduras</p>
            </div>
        </div>
        </div>
        <!-- partial -->
        
        </body>
        </html>`,
            };
    transporter.sendMail(mail_configs, function (error, info) {
        if (error) {
        console.log(error);
        return reject({ message: `Ha ocurrido un error` });
        }
        return resolve({ message: "Correo enviado de manera exitosa" });
    });
    });
}

app.get("/", (req, res) => {
    console.log(process.env.MY_EMAIL);
});

app.post("/send_recovery_email", (req, res) => {
    sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});
const port = 5001;

app.listen(port, () => {
    console.log(`ENVIO DE RECUPERACION DE CORREOS ESTA FUNCIONANDO EN EL PUERTO http://localhost:${port}`);
});

