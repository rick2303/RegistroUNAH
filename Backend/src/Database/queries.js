export const queries={
    get_Docentes: "SELECT * from dbo.empleados where rol='Docente' and subrol= 'Docente' ",
    insert_Docentes:"INSERT INTO dbo.empleados (NumEmpleado, DNI, Nombre, Apellido, NumeroTelefono, CorreoInstitucional, CorreoPersonal, Constrasena,FechaNacimiento ,FechaContratacion, Id_Carrera, Direccion, Foto, ID_CentroRegional, Rol,SubRol) VALUES ( @NumEmpleado, @DNI, @Nombre, @Apellido, @NumeroTelefono,@CorreoInstitucional, @CorreoPersonal, @Contrasena, @FechaNacimiento, @FechaContratacion, @Id_Carrera, @Direccion, @Foto, @ID_CentroRegional, @Rol , @SubRol )",
    accessLogin: "SELECT Constrasena, NumEmpleado AS Codigo, Rol, SubRol FROM dbo.empleados where NumEmpleado=@Id UNION ALL SELECT Constrasena, NumCuenta,null,null FROM dbo.estudiantes where NumCuenta=@Id",
}

