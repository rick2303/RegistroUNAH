import { getConnection,sql, queries} from "../Database"
const bcrypt = require('bcrypt');

export const loginUsuarios = async (req,res)=>{
    
    const {Id,contraseña} = req.body;//Requests
    try {
        const pool = await getConnection();//coneccion a la BD
        //setea correo para realizar la validacion de la contraseña
        const result= await pool.request()
        .input("contrasena",sql.VarChar,contraseña)
        .input("Id",sql.Int,Id)
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
                res.redirect('/iswJefatura');
            }
            if(rol=='Docente' && subrol=='Docente'){
                res.redirect('/iswDocente');
            }
            if(rol=='Docente' && subrol=='Coordinador'){
                res.redirect('/iswCoordinacion');
            }
            if(rol==null && subrol==null){
                res.redirect('/iswEstudiante');
            }
            if(rol=='Docente' && subrol=='Jefe'){
                res.redirect('/iswJefatura');
            }
        }else{
            res.status(500).json({ message: 'contraseña incorrecta'}); 
        }
    } catch (error) {
        res.status(500).json({ message: 'Credenciales invalidas'});
    }
}
