import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/', async (req, res) => {  // Cambia '/contact' a '/' ya que el archivo ya es la ruta /api/contact
    const { nombre_usuario, email_usuario, telefono_usuario, ruc_usuario, razon_social, mensaje_usuario } = req.body;

    // Validación básica
    if (!nombre_usuario || !email_usuario) {
        return res.status(400).json({ error: 'Nombre y email son requeridos.' });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // Cambia a true si usas el puerto 465
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `${nombre_usuario} <${email_usuario}>`,
            to: process.env.EMAIL_TO,
            subject: 'Nuevo Mensaje de Contacto',
            text: `Nombre: ${nombre_usuario}\nEmail: ${email_usuario}\nTeléfono: ${telefono_usuario}\nRUC: ${ruc_usuario}\nRazón Social: ${razon_social}\nMensaje: ${mensaje_usuario}`
        };

        await transporter.sendMail(mailOptions);
        console.log('Correo enviado.');
        res.status(200).json({ message: 'Mensaje enviado exitosamente.' });
    } catch (error) {
        console.error('Error al enviar el correo:', error.message || error);
        res.status(500).json({ error: 'Hubo un error al enviar el mensaje.', details: error.message });
    }
});

export default router;
