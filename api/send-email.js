import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { nombre_usuario, email_usuario, telefono_usuario, ruc_usuario, razon_social, mensaje_usuario } = req.body;

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.SMTP_USER,
            subject: `Nuevo Mensaje de contacto de ${nombre_usuario}`,
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
            `,
        };
        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ success: true, message: 'Correo enviado correctamente' });
        } catch (error) {
            res.status(500).json({ success:false, message: 'Error al enviar el correo', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}