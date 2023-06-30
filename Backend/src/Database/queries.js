export const queries={
    get_Docentes: "SELECT * from dbo.empleados where rol='Docente'",
    insert_Docentes:"INSERT INTO dbo.empleados (DNI, Nombre, Apellido, NumeroTelefono, CorreoInstitucional, CorreoPersonal, Contrasena,FechaNacimiento ,FechaContratacion, Carrera, Direccion, Foto, CentroRegional, Rol,SubRol) VALUES ( @DNI, @Nombre, @Apellido, @NumeroTelefono,@CorreoInstitucional, @CorreoPersonal, @Contrasena, @FechaNacimiento, @FechaContratacion, @Carrera, @Direccion, @Foto, @CentroRegional, @Rol , @SubRol )",
    accessLogin: "SELECT Contrasena, CAST(NumEmpleado AS varchar) AS Codigo, Rol, SubRol FROM dbo.empleados WHERE CAST(NumEmpleado AS varchar) = @Id UNION ALL SELECT Contrasena, CAST(NumCuenta AS varchar) AS NumCuenta, NULL AS rol, NULL AS subrol FROM dbo.estudiantes WHERE NumCuenta = @Id  ",
    updateEmpleado: "uPDATE dbo.empleados SET NumeroTelefono= @NumeroTelefono, CorreoPersonal=@CorreoPersonal, Direccion=@Direccion, SubRol=@SubRol WHERE NumEmpleado=@Id" 
}

export const querys = {
    getAllStudents: "SELECT * from [dbo].[estudiantes]",
    addNewStudent:"INSERT INTO [dbo].[estudiantes] (NumCuenta, DNI, Nombre, Apellido,NumeroTelefono, CorreoInstitucional, CorreoPersonal, Contrasena, FechaNacimiento, Carrera, Direccion, CentroRegional, PuntajePAA) VALUES (@NumCuenta, @DNI, @Nombre, @Apellido,@NumeroTelefono, @CorreoInstitucional, @CorreoPersonal, @Contrasena, @FechaNacimiento, @Carrera, @Direccion, @CentroRegional, @PuntajePAA);"
};

export const queryStudentHistory = {
    getStudentHistory: "select cs.IdClase as CODIGO, cs.Nombre as ASIGNATURA, cs.uv as UV, s.seccion AS SECCION,  year(re.Fecha) AS Año, Periodo AS PERIODO, nota AS CALIFIACION, EstadoClase AS OBS  from registro_estudiante_clases re INNER JOIN estudiantes e on IdEstudiante = NumCuenta INNER join secciones s on re.IdSeccion = s.IdSeccion INNER join clases cs on cs.IdClase = s.IdClase  where e.numCuenta = @NumCuenta",
    getHistorial: "select cs.IdClase as CODIGO, cs.Nombre as ASIGNATURA, cs.uv as UV, s.seccion AS SECCION,  year(re.Fecha) AS Año, Periodo AS PERIODO, nota AS CALIFIACION, EstadoClase AS OBS  from registro_estudiante_clases re INNER JOIN estudiantes e on IdEstudiante = NumCuenta INNER join secciones s on re.IdSeccion = s.IdSeccion INNER join clases cs on cs.IdClase = s.IdClase"
}