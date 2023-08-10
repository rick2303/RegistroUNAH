import { getConnection, querysADMIN } from '../Database';
import nodemailer from 'nodemailer';
import sql from 'mssql';

export const informarNotas = async (req, res) => {
  try {
    const config = {
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.USEREMAIL,
        pass: process.env.PASS,
      },
    };

    const { IdSeccion } = req.body;
    const pool = await getConnection();

    // Assuming querysADMIN.sendEmail is a valid SQL query
    const result = await pool
      .request()
      .input('IdSeccion', sql.Int, IdSeccion)
      .query(querysADMIN.sendEmail);

    const transport = nodemailer.createTransport(config);

    for (const student of result.recordset) {
      const mensaje = {
        from: 'gelenamador26@gmail.com',
        to: student.CorreoInstitucional, // Assuming each student has a 'correo' property
        subject: `Notas de ${student.Asignatura} Subidas`,
        html: `<h1>Hola ${student.Estudiante},</h1> Tus notas de la clase  ${student.Asignatura} han sido subidas a registro, revisalas y cualquier reclamo pertinente puedes acudir al docente que imparte la clase.
        <br> <i> Este es un mensaje generado automaticamente.
        Por favor, no responderlo </i><br><br>"Piensa en el medio ambiente. Antes de imprimir este correo electrónico, por favor considera si es necesario."`, // Update HTML content
      };

      const info = await transport.sendMail(mensaje);
      console.log(`Email sent to: ${student.CorreoInstitucional}`);
    }

    res.status(200).json({ message: 'Correos enviados' });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
