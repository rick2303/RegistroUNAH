import { getConnection, querys, sql} from "../Database"


export const getEstudiantes = async (req, res) => {
    try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllStudents);
    res.json(result.recordset);
    } catch (error) {
    res.status(500);
    res.send(error.message);
    }  
};

export const createNewStudent = async (req, res) => {
    const {NumCuenta, DNI, Nombre, Apellido,NumeroTelefono, CorreoInstitucional, CorreoPersonal, Contrasena, FechaNacimiento, Carrera, Direccion, CentroRegional, PuntajePAA } = req.body;

    // validating
    if (NumCuenta == null || DNI == null || Nombre == null || Apellido == null || NumeroTelefono == null || CorreoInstitucional == null || CorreoPersonal == null || Contrasena == null || FechaNacimiento == null || Carrera == null || Direccion == null || CentroRegional == null || PuntajePAA == null) {
        return res.status(400).json({ msg: "Peticion denegada. Por favor, llenar todos los espacios" });
    }
    
    try {
        const pool = await getConnection();

        await pool
        .request()
        .input("NumCuenta", sql.VarChar, NumCuenta)
        .input("DNI", sql.VarChar, DNI)
        .input("Nombre", sql.VarChar, Nombre)
        .input("Apellido", sql.VarChar, Apellido)
        .input("NumeroTelefono", sql.VarChar, NumeroTelefono)
        .input("CorreoInstitucional", sql.VarChar, CorreoInstitucional)
        .input("CorreoPersonal", sql.VarChar, CorreoPersonal)
        .input("Contrasena", sql.VarChar, Contrasena)
        .input("FechaNacimiento", sql.Date, FechaNacimiento)
        .input("Carrera", sql.VarChar, Carrera)
        .input("Direccion", sql.VarChar,Direccion)
        .input("CentroRegional", sql.VarChar, CentroRegional)
        .input("PuntajePAA", sql.Int, PuntajePAA)
        .query(querys.addNewStudent);
        console.log("funciona crear usuarios")

        res.json({NumCuenta, DNI, Nombre, Apellido,NumeroTelefono, CorreoInstitucional, CorreoPersonal, Contrasena, FechaNacimiento, Carrera, Direccion, CentroRegional, PuntajePAA});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
/*
export const receiveNewStudent = async (req, res) => {
   const { NumCuenta, DNI, Nombre, Apellido, NumeroTelefono, CorreoInstitucional, CorreoPersonal, Contrasena, FechaNacimiento, Carrera, Direccion, CentroRegional, PuntajePAA } = req.bodyReceive;
    // Validación
    if (NumCuenta == null || DNI == null || Nombre == null || Apellido == null || NumeroTelefono == null || CorreoInstitucional == null || CorreoPersonal == null || Contrasena == null || FechaNacimiento == null || Carrera == null || Direccion == null || CentroRegional == null || PuntajePAA == null) {
    return res.status(400).json({ msg: "Peticion denegada. Por favor, llenar todos los espacios" });
    } 
    try {
      // Aquí puedes realizar cualquier operación adicional con los datos recibidos, como asignarlos a variables locales
      // Ejemplo:
    const newStudent = {
        NumCuenta,
        DNI,
        Nombre,
        Apellido,
        NumeroTelefono,
        CorreoInstitucional,
        CorreoPersonal,
        Contrasena,
        FechaNacimiento,
        Carrera,
        Direccion,
        CentroRegional,
        PuntajePAA
};

      // Devuelve los datos recibidos en la respuesta
    res.json(newStudent);
    } catch (error) {
    res.status(500);
    res.send(error.message);
    }
};*/
