import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const {
            nombre_usuario, email_usuario, telefono_usuario, ruc_usuario, razon_social, mensaje_usuario
        } = req.body;

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

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Correo enviado correctamente' });
        } catch (error) {
            console.error('Error al enviar correo:', error);
            res.status(500).json({ error: 'Hubo un error al enviar el mensaje.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}