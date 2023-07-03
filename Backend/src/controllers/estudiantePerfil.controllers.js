import { getConnection,sql, queries} from "../Database"
export const insertPerfilEstudiante = async (req,res)=> {
    const {Id}=req.body;
    const photoPaths = req.files.map(file => file.filename);
    const pool = await getConnection();
    const result= await pool.request()
        .input("Id",sql.VarChar,Id)
        .input('photoPath1', sql.VarChar, photoPaths[0])
        .input('photoPath2', sql.VarChar, photoPaths[1])
        .input('photoPath3', sql.VarChar, photoPaths[2])
        .query(queries.insertPerfilEstudiante);
        res.status(200).json({ message: 'Operación completada exitosamente' });
}

export const updatePerfilEstudiante = async (req,res)=> {
    try{
        const { Id} = req.body;
        const photoPaths = req.files.map(file => file.filename);
        const pool = await getConnection();
        const result = await pool.request()
            .input("Id", sql.VarChar, Id)
            .input('photoPath1', sql.VarChar, photoPaths[0])
            .input('photoPath2', sql.VarChar, photoPaths[1])
            .input('photoPath3', sql.VarChar, photoPaths[2])
            .query(queries.updatePerfilEstudiante);
        res.status(200).json({ message: 'Operación completada exitosamente' });
    }catch(error){
        res.status(500).json({ message: 'error al momento de actualizar foto' })
    }
}

export const updateDescripcionPerfilEstudiante = async (req,res)=> {
        const {id , descripcion } = req.body;
        const pool = await getConnection();
        const result = await pool.request()
            .input("id" , sql.VarChar,id )
            .input("descripcion", sql.VarChar, descripcion)
            .query(queries.updateDescripcionPerfilEstudiantep);
        res.status(200).json({ message: 'Operación completada exitosamente' });
}

export const insertDescripcionPerfilEstudiante = async (req,res)=> {
    const {Id,descripcion}=req.body;
    const pool = await getConnection();
    const result= await pool.request()
        .input("Id",sql.VarChar,Id)
        .input("Descripcion",sql.VarChar,descripcion)
        .query(queries.insertDescripcionPerfilEstudiante);
        res.status(200).json({ message: 'Operación completada exitosamente' });
}

