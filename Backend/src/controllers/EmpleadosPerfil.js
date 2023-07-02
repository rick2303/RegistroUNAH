import { getConnection,sql, queries} from "../Database"
export const insertPerfilEmpleado = async (req,res)=> {
    const {Id,descripcion}=req.body;
    const photoPaths = req.files.map(file => file.path);
    const pool = await getConnection();
    const result= await pool.request()
        .input("Id",sql.VarChar,Id)
        .input('photoPath1', sql.VarChar, photoPaths[0])
        .input('photoPath2', sql.VarChar, photoPaths[1])
        .input('VideoPath', sql.VarChar, photoPaths[2])
        .input("Descripcion",sql.VarChar,descripcion)
        .query(queries.insertPerfilEmpleado);
        res.status(200).json({ message: 'Operación completada exitosamente' });
}

export const updatePerfilEmpleado = async (req,res)=> {
    const {Id,descripcion}=req.body;
    const photoPaths = req.files.map(file => file.path);
    const pool = await getConnection();
    const result= await pool.request()
        .input("Id",sql.VarChar,Id)
        .input('photoPath1', sql.VarChar, photoPaths[0])
        .input('photoPath2', sql.VarChar, photoPaths[1])
        .input('VideoPath', sql.VarChar, photoPaths[2])
        .input("Descripcion",sql.VarChar,descripcion)
        .query(queries.updatePerfilEmpleado);
        res.status(200).json({ message: 'Operación completada exitosamente' });
}
