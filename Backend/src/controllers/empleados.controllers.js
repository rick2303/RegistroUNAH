import { getConnection,sql, queries} from "../Database"
const bcrypt = require('bcrypt');

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
        NumEmpleado,
        DNI,
        Nombre,
        Apellido,
        NumeroTelefono,
        CorreoInstitucional,
        CorreoPersonal,
        Contrasena,
        FechaNacimiento,
        FechaContratacion,
        Id_Carrera,
        Direccion,
        Foto,
        ID_CentroRegional,
        Rol,
        SubRol
        } = req.body;
    try {
       // Genera un hash de la Contrasena utilizando bcrypt
       const hashedCContrasena = await bcrypt.hash(Contrasena, 10);
       console.log(hashedCContrasena);
       // Establece la conexión a la base de datos
       const pool = await getConnection();
       // Inserta el nombre de usuario y la Contrasena en la tabla de usuarios
       await pool.request()
       .input("NumEmpleado", sql.Int,NumEmpleado)
       .input("DNI",sql.Int,DNI)
       .input("Nombre",sql.VarChar,Nombre)
       .input("Apellido",sql.VarChar,Apellido)
       .input("NumeroTelefono",sql.VarChar,NumeroTelefono)
       .input("CorreoInstitucional",sql.VarChar,CorreoInstitucional)
       .input("CorreoPersonal",sql.VarChar,CorreoPersonal)
       .input("Contrasena",sql.VarChar,hashedCContrasena)
       .input("FechaNacimiento",sql.Date,FechaNacimiento)
       .input("FechaContratacion",sql.Date,FechaContratacion)
       .input("Id_Carrera",sql.Int, Id_Carrera)
       .input("Direccion",sql.VarChar,Direccion)
       .input("Foto",sql.VarChar,Foto)
       .input("ID_CentroRegional",sql.Int,ID_CentroRegional)
       .input("Rol",sql.VarChar,Rol)
       .input("SubRol", sql.VarChar,SubRol)
       .query(queries.insert_Docentes);
       res.status(200).json({ message: 'Docente registrado correctamente.' });  
    } catch (error) {
    res.status(500).json({ message: 'No se pudo registrar el Docente' })
    } 
}

export const loginUsuarios = async (req,res)=>{
    
    const {Id,contraseña} = req.body;//Requests
    try {
        const pool = await getConnection();//coneccion a la BD
        //setea correo para realizar la validacion de la contraseña
        const result= await pool.request()
        .input("contrasena",sql.VarChar,contraseña)
        .input("Id",sql.VarChar,Id)
        .query(queries.accessLogin);
        //obtiene la contraseña adjunta al correo segun la BD
        const contraseñaBD= result.recordset[0].Constrasena
        const subrol=result.recordset[0].SubRol
        const rol=result.recordset[0].Rol 
        //compara la contraseña enviada por el cliente y la de la BD
        const comparacion = await  bcrypt.compare(contraseña,contraseñaBD)
        //si las claves son iguales accede.
        if(comparacion==true){
            if( rol=='Admin' && subrol=='Admin'){
                res.status(200).json({ message: 'Contraseña correcta, Administrador' });
            }
            if(rol=='Docente' && subrol=='Docente'){
                res.status(200).json({ message: 'Contraseña correcta,Docente'});
            }
            if(rol=='Docente' && subrol=='Coordinador'){
                res.status(200).json({ message: 'Contraseña correcta,Coordinador'});
            }
            if(rol==null && subrol==null){
                res.status(200).json({ message: 'Contraseña correcta,Estudiante'});
            }
            if(rol=='Docente' && subrol=='Jefe'){
                res.status(200).json({ message: 'Contraseña correcta,Jefe'});
            }
        }else{
            res.status(500).json({ message: 'contraseña incorrecta'}); 
        }
    } catch (error) {
        res.status(500).json({ message: 'Credenciales invalidas'});
    }
}