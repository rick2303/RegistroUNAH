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
    const {NumCuenta, DNI, Nombre, Apellido,NumeroTelefono, CorreoInstitucional, CorreoPersonal, Contrasena, FechaNacimiento, Carrera, Direccion, CentroRegional, PuntajePAA, PuntajePAM, PuntajePCCNS } = req.body;

    // validating
    if (NumCuenta == null || DNI == null || Nombre == null || Apellido == null || NumeroTelefono == null || CorreoInstitucional == null || CorreoPersonal == null || Contrasena == null || FechaNacimiento == null || Carrera == null || Direccion == null || CentroRegional == null || PuntajePAA == null ) {
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
        .input("PuntajePAM", sql.Int, PuntajePAM)
        .input("PuntajePCCNS", sql.Int, PuntajePCCNS)
        .query(querys.addNewStudent);

        res.json({NumCuenta, DNI, Nombre, Apellido,NumeroTelefono, CorreoInstitucional, CorreoPersonal, Contrasena, FechaNacimiento, Carrera, Direccion, CentroRegional, PuntajePAA, PuntajePAM, PuntajePCCNS});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const updatePassword = async (req, res) => {
    const { newPassword, email } = req.body;

    if (!newPassword || !email) {
        return res.status(400).json({ error: 'Debes proporcionar una nueva contraseña y un correo electrónico' });
    }

    try {
        const pool = await getConnection();
        const result = await pool.request().query(`UPDATE [dbo].[estudiantes] SET Contrasena = '${newPassword}' WHERE CorreoPersonal = '${email}';`);

        console.log('Contraseña actualizada correctamente en la base de datos.');

        res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        res.status(500).json({ error: 'Error al actualizar la contraseña' });
    }
};


export const getEstudiantesMatriculados = async (req, res) => {

    
    try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getEstudiantesMatriculados);
    res.json(result.recordset);
    } catch (error) {
    res.status(500);
    res.send(error.message);
    }  
};
