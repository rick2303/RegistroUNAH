import { getConnection,sql, queries} from "../Database"


export const getDocentes = async (req,res)=> {
    try{
        const pool = await getConnection();
        const result = await pool.request().query(queries.get_Docentes);
        console.log(result);
        res.json(result.recordset);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

export const registrarDocente= async (req,res)=>{
    const { 
        DNI,
        Nombre,
        Apellido,
        NumeroTelefono,
        CorreoInstitucional,
        CorreoPersonal,
        Contrasena,
        FechaNacimiento,
        FechaContratacion,
        Carrera,
        Direccion,
        Foto,
        CentroRegional,
        Rol,
        SubRol
        } = req.body;
    try {
        // Establece la conexión a la base de datos
        const pool = await getConnection();
        // Inserta el nombre de usuario y la Contrasena en la tabla de usuarios
        await pool.request()
        .input("DNI",sql.VarChar,DNI)
        .input("Nombre",sql.VarChar,Nombre)
        .input("Apellido",sql.VarChar,Apellido)
        .input("NumeroTelefono",sql.VarChar,NumeroTelefono)
        .input("CorreoInstitucional",sql.VarChar,CorreoInstitucional)
        .input("CorreoPersonal",sql.VarChar,CorreoPersonal)
        .input("Contrasena",sql.VarChar,Contrasena)
        .input("FechaNacimiento",sql.Date,FechaNacimiento)
        .input("FechaContratacion",sql.Date,FechaContratacion)
        .input("Carrera",sql.VarChar, Carrera.toUpperCase())
        .input("Direccion",sql.VarChar,Direccion)
        .input("Foto",sql.VarChar,Foto)
        .input("CentroRegional",sql.VarChar,CentroRegional.toUpperCase())
        .input("Rol",sql.VarChar,Rol.toUpperCase())
        .input("SubRol", sql.VarChar,SubRol.toUpperCase())
        .query(queries.insert_Docentes);
        res.status(200).json({ message: 'Docente registrado correctamente.' });  
    } catch (error) {
        res.status(500).json({ message: 'No se pudo registrar el Docente' })
    } 
}

export const actualizarDocente = async (req, res) => {
    const {NumeroTelefono,CorreoPersonal,Direccion,SubRol}=req.body;
    const {id}=req.params;
    if(NumeroTelefono==null || CorreoPersonal==null || Direccion==null || SubRol==null){
        return res.status(400).json({message: "Not Found"})
    }
    const pool= await getConnection();
    try {
        const result =await pool.request()
        .input("NumeroTelefono",sql.VarChar,NumeroTelefono)
        .input("CorreoPersonal",sql.VarChar,CorreoPersonal)
        .input("Direccion",sql.VarChar,Direccion)
        .input("SubRol",sql.VarChar,SubRol)
        .input("id",sql.Int,id)
        .query(queries.updateEmpleado);
        res.status(200).json({ message: 'Docente actualizado correctamente.' }); 
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}