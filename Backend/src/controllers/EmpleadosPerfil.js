import { getConnection, sql, queries } from "../Database"
export const insertPerfilEmpleado = async (req, res) => {
    const { Id } = req.body;
    const photoPaths = req.files.map(file => file.filename);
    const pool = await getConnection();
    const result = await pool.request()
        .input("Id", sql.VarChar, Id)
        .input('photoPath1', sql.VarChar, photoPaths[0])
        .input('photoPath2', sql.VarChar, photoPaths[1])
        .query(queries.insertPerfilEmpleado);
    res.status(200).json({ message: 'Operación completada exitosamente' });
}
export const updatePerfilEmpleado = async (req, res) => {
    const { Id } = req.body;
    const photoPaths = req.files.map(file => file.filename);
    const pool = await getConnection();
    const result = await pool.request()
        .input("Id", sql.VarChar, Id)
        .input('photoPath1', sql.VarChar, photoPaths[0])
        .input('photoPath2', sql.VarChar, photoPaths[1])
        .query(queries.updatePerfilEmpleado);
    res.status(200).json({ message: 'Operación completada exitosamente' });
}
export const updateDescripcionPerfilEmpleado = async (req, res) => {
    const { id, descripcion } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
        .input("id", sql.VarChar, id)
        .input("descripcion", sql.VarChar, descripcion)
        .query(queries.updateDescripcionPerfilEmpleado);
    res.status(200).json({ message: 'Operación completada exitosamente' });
}

export const insertDescripcionPerfilEmpleado = async (req, res) => {
    const { Id, descripcion } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
        .input("Id", sql.VarChar, Id)
        .input("Descripcion", sql.VarChar, descripcion)
        .query(queries.insertDescripcionPerfilEmpleado);
    res.status(200).json({ message: 'Operación completada exitosamente' });
}

export const insertVideoPerfilEmpleado = async (req, res) => {
    try {
        const video = req.files.map(file => file.filename);
        const { Id } = req.body;
        const pool = await getConnection();
        const result = await pool.request()
            .input("Id", sql.VarChar, Id)
            .input("Video", sql.VarChar, video[0])
            .query(queries.insertVideoEmpleado);
        res.status(200).json({ message: 'Operación completada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Aprendan a programar' })
    }
}

export const updateVideoPerfilEmpleado = async (req, res) => {
    try {
        const { Id } = req.body;
        const video = req.files.map(file => file.filename);
        const pool = await getConnection();
        const result = await pool.request()
            .input("Id", sql.VarChar, Id)
            .input("Video", sql.VarChar, video[0])
            .query(queries.updateVideoEmpleado);
        res.status(200).json({ message: 'Operación completada exitosamente' });
    } catch (error) {
        console.error(error);
    }
}