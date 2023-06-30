export const queries={
    get_Docentes: "SELECT * from dbo.empleados where rol='Docente'",
    insert_Docentes:"INSERT INTO dbo.empleados (DNI, Nombre, Apellido, NumeroTelefono, CorreoInstitucional, CorreoPersonal, Contrasena,FechaNacimiento ,FechaContratacion, Carrera, Direccion, Foto, CentroRegional, Rol,SubRol) VALUES ( @DNI, @Nombre, @Apellido, @NumeroTelefono,@CorreoInstitucional, @CorreoPersonal, @Contrasena, @FechaNacimiento, @FechaContratacion, @Carrera, @Direccion, @Foto, @CentroRegional, @Rol , @SubRol )",
    accessLogin: "SELECT Contrasena, CAST(NumEmpleado AS varchar) AS Codigo, Rol, SubRol FROM dbo.empleados WHERE CAST(NumEmpleado AS varchar) = @Id UNION ALL SELECT Contrasena, CAST(NumCuenta AS varchar) AS NumCuenta, NULL AS rol, NULL AS subrol FROM dbo.estudiantes WHERE NumCuenta = @Id  ",
    updateEmpleado: "UPDATE dbo.empleados SET NumeroTelefono= @NumeroTelefono, CorreoPersonal=@CorreoPersonal, Direccion=@Direccion, SubRol=@SubRol WHERE NumEmpleado=@Id" ,
    getEstudiantes: "SELECT Nombre, NumCuenta,CorreoInstitucional,Carrera, IndiceGlobal from dbo.estudiantes WHERE NumCuenta= @Id",
    getEmpleado: "select Nombre,Apellido,CorreoInstitucional,Carrera,Foto,CentroRegional,Rol from empleados WHERE CAST(NumEmpleado AS varchar) = @Id ",
    getPerfilEmpleado:"select * from perfil_empleados where CAST(idPerfil AS varchar) = @Id ",
    getPerfilestudiante: "select * from perfil_estudiante where IdPerfil= @Id "
}

export const querys = {
    getAllStudents: "SELECT * from [dbo].[estudiantes]",
    addNewStudent:"INSERT INTO [dbo].[estudiantes] (NumCuenta, DNI, Nombre, Apellido,NumeroTelefono, CorreoInstitucional, CorreoPersonal, Contrasena, FechaNacimiento, Carrera, Direccion, CentroRegional, PuntajePAA) VALUES (@NumCuenta, @DNI, @Nombre, @Apellido,@NumeroTelefono, @CorreoInstitucional, @CorreoPersonal, @Contrasena, @FechaNacimiento, @Carrera, @Direccion, @CentroRegional, @PuntajePAA);"
};