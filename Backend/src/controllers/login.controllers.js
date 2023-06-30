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
                const admin=await pool.request()
                .input("Id",sql.VarChar,Id)
                .query(queries.getEmpleado)
                res.json({url:'http://127.0.0.1:5173/src/html/Administracion.html', data:admin.recordset[0]});
            }
            if(rol=='DOCENTE' && subrol=='DOCENTE'){
                const docente=await pool.request()
                .input("Id",sql.VarChar,Id)
                .query(queries.getEmpleado)
                const perfilEmpleado = await pool.request().input("Id",sql.VarChar,Id).query(queries.getPerfilEmpleado)
                res.json({url:'http://127.0.0.1:5173/src/html/Docente.html', data:docente.recordset[0], perfil:perfilEmpleado.recordset[0]});
            }
            if(rol=='DOCENTE' && subrol=='COORDINADOR'){
                const coordinador=await pool.request()
                .input("Id",sql.VarChar,Id)
                .query(queries.getEmpleado)
                const perfilEmpleado = await pool.request().input("Id",sql.VarChar,Id).query(queries.getPerfilEmpleado)
                res.json({url:'http://127.0.0.1:5173/src/html/Coordinacion_menu.html', data:coordinador.recordset[0],perfil:perfilEmpleado.recordset[0]});
            }
            if(rol==null && subrol==null){
                const estudiante = await pool.request()
                .input("Id", sql.VarChar, Id)
                .query(queries.getEstudiantes);
                console.log(estudiante);
                const perfilEstudiante = await pool.request().input("Id", sql.VarChar, Id).query(queries.getPerfilestudiante);
                res.json({url:'http://127.0.0.1:5173/src/html/Estudiante.html', data: estudiante.recordset[0], perfil: perfilEstudiante.recordset[0]});                
            }
            if(rol=='DOCENTE' && subrol=='JEFE DEPARTAMENTO'){
                const jefe=await pool.request()
                .input("Id",sql.VarChar,Id)
                .query(queries.getEmpleado)
                const perfilEmpleado = await pool.request().input("Id",sql.VarChar,Id).query(queries.getPerfilEmpleado)
                res.json({url:'http://127.0.0.1:5173/src/html/Jefatura_menu.html', data:jefe.recordset[0],perfil:perfilEmpleado.recordset[0]});
            }
        }if(contraseñaBD!=contraseña){
            res.status(500).json({ error: "Acceso inválido. Por favor, inténtelo otra vez." });
        }
    } catch (error) {
        res.status(500).json({ error: "Acceso inválido. Por favor, inténtelo otra vez." });
    }
}