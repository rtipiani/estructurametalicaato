requestAnimationFrame('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyparser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extend:true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

app.post('/send-email', (req, res) => {
    const { nombre_usuario, email_usuario, telefono_usuario, ruc_usuario, razon_social, mensaje_usuario } = req.body;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.SMTP_USER,
        subject: `Nuevo mensaje de contacto de ${nombre_usuario}`,
        html: `
            <h2>
                Nuevo mensaje de contacto
            </h2>
            <p>
                <strong>
                    Nombre:
                </strong>
                ${nombre_usuario}
            </p>
            <p>
                <strong>
                    Correo electrónico:
                </strong>
                ${email_usuario}
            </p>
            <p>
                <strong>
                    Teléfono:
                </strong>
                ${telefono_usuario}
            </p>
            <p>
                <strong>
                    Número de RUC:
                </strong>
                ${ruc_usuario}
            </p>
            <p>
                <strong>
                    Razón Social:
                </strong>
                ${razon_social}
            </p>
            <p>
                <strong>
                    Mensaje:
                </strong>
                ${mensaje_usuario}
            </p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ success: false, message: 'Error al enviar el correo', error: error.message });
        }
        res.status(200).send({ success: true, message: 'Correo enviado correctamente' });
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});