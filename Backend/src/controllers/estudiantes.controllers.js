import { getConnection, sql, queryEstudiante } from "../Database"

export const ingresarEvaluacionesDocentes = async (req, res) => {
    const {IdSeccion, IdDocente, IdEstudiante, Pregunta1, Pregunta2, Pregunta3, Pregunta4, Pregunta5, Observacion } = req.body;
    const pool = await getConnection();
    try {
        const result = await pool.request()
            .input('IdSeccion', sql.VarChar, IdSeccion)
            .input('IdDocente', sql.Int, IdDocente)
            .input('IdEstudiante', sql.VarChar, IdEstudiante)
            .input('Pregunta1', sql.Int, Pregunta1)
            .input('Pregunta2', sql.Int, Pregunta2)
            .input('Pregunta3', sql.Int, Pregunta3)
            .input('Pregunta4', sql.VarChar, Pregunta4)
            .input('Pregunta5', sql.VarChar, Pregunta5)
            .input('Observacion', sql.VarChar, Observacion)
            .query(queryEstudiante.insertEvaluaciones);
        res.status(200).json({ message: 'Operación completada exitosamente' });
    } catch (error) {
        
    res.status(500).send(error.message);
}
}   