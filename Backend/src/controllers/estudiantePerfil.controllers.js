import { getConnection,sql, queries} from "../Database"
export const insertPerfilEstudiante = async (req,res)=> {
    const {Id,descripcion}=req.body;
    const photoPaths = req.files.map(file => file.filename);
    const pool = await getConnection();
    const result= await pool.request()
        .input("Id",sql.VarChar,Id)
        .input('photoPath1', sql.VarChar, photoPaths[0])
        .input('photoPath2', sql.VarChar, photoPaths[1])
        .input('photoPath3', sql.VarChar, photoPaths[2])
        .input("Descripcion",sql.VarChar,descripcion)
        .query(queries.insertPerfilEstudiante);
        res.status(200).json({ message: 'Operación completada exitosamente' });
}

export const updatePerfilEstudiante = async (req,res)=> {
    const {Id,descripcion}=req.body;
    const photoPaths = req.files.map(file => file.filename);
    const pool = await getConnection();
    const result= await pool.request()
        .input("Id",sql.VarChar,Id)
        .input('photoPath1', sql.VarChar, photoPaths[0])
        .input('photoPath2', sql.VarChar, photoPaths[1])
        .input('photoPath3', sql.VarChar, photoPaths[2])
        .input("Descripcion",sql.VarChar,descripcion)
        .query(queries.updatePerfilEstudiante);
        res.status(200).json({ message: 'Operación completada exitosamente' });
}
