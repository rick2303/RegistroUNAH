import { getConnection,sql, queries} from "../Database"

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
        const contraseñaBD= result.recordset[0].Contrasena
        const subrol=result.recordset[0].SubRol
        const rol=result.recordset[0].Rol 
        //si las claves son iguales accede.
        if(contraseñaBD==contraseña){
            if( rol=='ADMIN' && subrol==null){
                res.redirect('/iswAdmin');
            }
            if(rol=='DOCENTE' && subrol=='DOCENTE'){
                res.redirect('/iswDocente');
                console.log('Docente')
            }
            if(rol=='DOCENTE' && subrol=='COORDINADOR'){
                res.redirect('/iswCoordinacion');
            }
            if(rol==null && subrol==null){
                res.redirect('/iswEstudiantes');
            }
            if(rol=='DOCENTE' && subrol=='JEFE DEPARTAMENTO'){
                res.redirect('/iswJefatura');
            }
        }else{
            res.status(500).json({ message: 'contraseña incorrecta'}); 
        }
    } catch (error) {
        res.status(500).json({ message: 'Credenciales invalidas'});
    }
}