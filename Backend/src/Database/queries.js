export const queries={
    get_Docentes: "SELECT * from dbo.empleados where rol='Docente'",
    insert_Docentes:"INSERT INTO dbo.empleados (DNI, Nombre, Apellido, NumeroTelefono, CorreoInstitucional, CorreoPersonal, Contrasena,FechaNacimiento ,FechaContratacion, Carrera, Direccion, Foto, CentroRegional, Rol,SubRol) VALUES ( @DNI, @Nombre, @Apellido, @NumeroTelefono,@CorreoInstitucional, @CorreoPersonal, @Contrasena, @FechaNacimiento, @FechaContratacion, @Carrera, @Direccion, @Foto, @CentroRegional, @Rol , @SubRol )",
    accessLogin: "SELECT Contrasena, CAST(NumEmpleado AS varchar) AS Codigo, Rol, SubRol FROM dbo.empleados WHERE CAST(NumEmpleado AS varchar) = @Id UNION ALL SELECT Contrasena, CAST(NumCuenta AS varchar) AS NumCuenta, NULL AS rol, NULL AS subrol FROM dbo.estudiantes WHERE NumCuenta = @Id  ",
    updateEmpleado: "UPDATE dbo.empleados SET NumeroTelefono= @NumeroTelefono, CorreoPersonal=@CorreoPersonal, Direccion=@Direccion, SubRol=@SubRol WHERE NumEmpleado=@Id" ,
    getEstudiantes: "SELECT Nombre, apellido, NumCuenta,CorreoInstitucional,Carrera, IndiceGlobal from dbo.estudiantes WHERE NumCuenta= @Id",
    getEmpleado: "select CAST(NumEmpleado AS varchar) 'NumEmpleado', Nombre,Apellido,CorreoInstitucional,Carrera,Foto,CentroRegional,Rol from empleados WHERE CAST(NumEmpleado AS varchar) = @Id ",
    getPerfilEmpleado:"select * from perfil_empleados where CAST(idPerfil AS varchar) = @Id ",
    getPerfilestudiante: "select * from perfil_estudiante where IdPerfil= @Id ",
    insertPerfilEstudiante:"Insert into perfil_estudiante values(@Id,@photoPath1,@photoPath2,@photoPath3)",
    insertDescripcionPerfilEstudiante:"Insert into perfil_estudiante(IdPerfil, descripcion) values(@Id, @descripcion)",
    updatePerfilEstudiante:"update perfil_estudiante set imagen1 = case WHEN @photoPath1 is NULL then imagen1 ELSE @photoPath1 END,  imagen2 = case WHEN @photoPath2 is NULL then imagen2 ELSE @photoPath2 END, imagen3 = case WHEN @photoPath3 is NULL then imagen3 ELSE @photoPath3 END where IdPerfil = @Id",
    insertDescripcionPerfilEmpleado:"Insert into perfil_empleados(IdPerfil, descripcion) values(@Id, @descripcion)",
    updateDescripcionPerfilEstudiantep: 'update perfil_estudiante set descripcion = @descripcion where IdPerfil = @id',
    updateDescripcionPerfilEmpleado: 'update perfil_empleados set descripcion = @descripcion where IdPerfil = @id',
    insertVideoEmpleado:"Insert into perfil_empleados(IdPerfil, Video) values (@Id, @Video)",
    updateVideoEmpleado:"update perfil_empleados set Video = @Video where CAST(idPerfil AS varchar) = @Id",
    insertPerfilEmpleado:"Insert into perfil_empleados values(@Id,@photoPath1,@photoPath2)",
    updatePerfilEmpleado:"UPDATE perfil_empleados SET Imagen1 = @photoPath1, Imagen2 = @photoPath2 WHERE CAST(IdPerfil AS varchar) = @id"
}

export const querys = {
    getAllStudents: "SELECT * from [dbo].[estudiantes]",
    addNewStudent:"INSERT INTO [dbo].[estudiantes] (NumCuenta, DNI, Nombre, Apellido,NumeroTelefono, CorreoInstitucional, CorreoPersonal, Contrasena, FechaNacimiento, Carrera, Direccion, CentroRegional, PuntajePAA) VALUES (@NumCuenta, @DNI, @Nombre, @Apellido,@NumeroTelefono, @CorreoInstitucional, @CorreoPersonal, @Contrasena, @FechaNacimiento, @Carrera, @Direccion, @CentroRegional, @PuntajePAA);",
    getEstudiantesMatriculados: "SELECT Distinct NumCuenta, Nombre, Apellido, CorreoInstitucional, Carrera, IndiceGlobal, IndicePeriodo FROM [dbo].[estudiantes] e inner join registro_estudiante_clases re on re.IdEstudiante = numCuenta inner join secciones s on re.idSeccion = s.idseccion where YEAR(re.fecha) = year(getdate()) and month(RE.Fecha) > '05'"
};

export const queryStudentHistory = {
    getStudentHistory: "select cs.IdClase as CODIGO, cs.Nombre as ASIGNATURA, cs.uv as UV, s.seccion AS SECCION,  year(re.Fecha) AS Año, Periodo AS PERIODO, nota AS CALIFIACION, EstadoClase AS OBS  from registro_estudiante_clases re INNER JOIN estudiantes e on IdEstudiante = NumCuenta INNER join secciones s on re.IdSeccion = s.IdSeccion INNER join clases cs on cs.IdClase = s.IdClase  where e.numCuenta = @NumCuenta",
    getHistorial: "select cs.IdClase as CODIGO, cs.Nombre as ASIGNATURA, cs.uv as UV, s.seccion AS SECCION,  year(re.Fecha) AS Año, Periodo AS PERIODO, nota AS CALIFIACION, EstadoClase AS OBS  from registro_estudiante_clases re INNER JOIN estudiantes e on IdEstudiante = NumCuenta INNER join secciones s on re.IdSeccion = s.IdSeccion INNER join clases cs on cs.IdClase = s.IdClase"
}
