import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sirviendo los archivos estáticos de Astro (que están en 'dist')
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.astro'));
})

// Ruta para manejar el formulario de contacto
app.post('/contact', (req, res) => {
    const { nombre_usuario, email_usuario, telefono_usuario, ruc_usuario, razon_social, mensaje_usuario } = req.body;

    console.log(`Nombre: ${nombre_usuario}`);
    console.log(`Email: ${email_usuario}`);
    console.log(`Teléfono: ${telefono_usuario}`);
    console.log(`RUC: ${ruc_usuario}`);
    console.log(`Razón Social: ${razon_social}`);
    console.log(`Mensaje: ${mensaje_usuario}`);

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `${nombre_usuario} <${email_usuario}>`,
        to: process.env.EMAIL_TO,
        subject: 'Nuevo Mensaje de Contacto',
        text: `Nombre: ${nombre_usuario}\nEmail: ${email_usuario}\nTeléfono: ${telefono_usuario}\nRUC: ${ruc_usuario}\nRazón Social: ${razon_social}\nMensaje: ${mensaje_usuario}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Hubo un error al enviar el mensaje.');
        }
        console.log('Correo enviado, redirigiendo a la página de inicio...');
        res.redirect('/'); // Redirige a la página de inicio
    });
});

// Iniciando el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});