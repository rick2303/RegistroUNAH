export const queries = {
    get_Docentes: "SELECT * from dbo.empleados where rol='Docente'",
    getNumEmpleado: "SELECT numEmpleado from dbo.empleados where DNI = @dni",
    insert_Docentes: "INSERT INTO dbo.empleados (DNI, Nombre, Apellido, NumeroTelefono, CorreoInstitucional, CorreoPersonal, Contrasena,FechaNacimiento ,FechaContratacion, Carrera, Direccion, Foto, CentroRegional, Rol,SubRol) VALUES ( @DNI, @Nombre, @Apellido, @NumeroTelefono,@CorreoInstitucional, @CorreoPersonal, @Contrasena, @FechaNacimiento, @FechaContratacion, @Carrera, @Direccion, @Foto, @CentroRegional, @Rol , @SubRol )",
    accessLogin: "SELECT Contrasena, CAST(NumEmpleado AS varchar) AS Codigo, Rol, SubRol FROM dbo.empleados WHERE CAST(NumEmpleado AS varchar) = @Id UNION ALL SELECT Contrasena, CAST(NumCuenta AS varchar) AS NumCuenta, NULL AS rol, NULL AS subrol FROM dbo.estudiantes WHERE NumCuenta = @Id  ",
    updateEmpleado: "UPDATE dbo.empleados SET NumeroTelefono= @NumeroTelefono, CorreoPersonal=@CorreoPersonal, Direccion=@Direccion, SubRol=@SubRol WHERE NumEmpleado=@Id",
    getEstudiantes: "SELECT Nombre, apellido, NumCuenta,CorreoInstitucional,Carrera, IndiceGlobal from dbo.estudiantes WHERE NumCuenta= @Id",
    getEmpleado: "select CAST(NumEmpleado AS varchar) 'NumEmpleado', Nombre,Apellido,CorreoInstitucional,Carrera,Foto,CentroRegional,Rol,Subrol from empleados WHERE CAST(NumEmpleado AS varchar) = @Id ",
    getPerfilEmpleado: "select * from perfil_empleados where CAST(idPerfil AS varchar) = @Id ",
    getPerfilestudiante: "select * from perfil_estudiante where IdPerfil= @Id ",

    insertPerfilEstudiante: "insert into perfil_estudiante (IdPerfil, imagen1, imagen2, imagen3 )values(@Id,case when @photoPath1 is null then null else @photoPath1 end, case when @photoPath2 is null then null else @photoPath2 end, case when @photoPath3 is null then null else @photoPath3 end) ",

    insertDescripcionPerfilEstudiante: "Insert into perfil_estudiante(IdPerfil, descripcion) values (@Id, @descripcion)",

    updatePerfilEstudiante: "update perfil_estudiante set imagen1 = case WHEN @photoPath1 is NULL then imagen1 ELSE @photoPath1 END,  imagen2 = case WHEN @photoPath2 is NULL then imagen2 ELSE @photoPath2 END, imagen3 = case WHEN @photoPath3 is NULL then imagen3 ELSE @photoPath3 END where IdPerfil = @Id",

    insertDescripcionPerfilEmpleado: "Insert into perfil_empleados(IdPerfil, descripcion) values (@Id, @descripcion)",

    updateDescripcionPerfilEstudiantep: 'update perfil_estudiante set descripcion = @descripcion where IdPerfil = @id',
    updateDescripcionPerfilEmpleado: 'update perfil_empleados set descripcion = @descripcion where IdPerfil = @id',

    insertVideoEmpleado: "Insert into perfil_empleados(IdPerfil, Video) values (@Id, @Video)",
    updateVideoEmpleado: "update perfil_empleados set Video = @Video where CAST(idPerfil AS varchar) = @Id",

    insertPerfilEmpleado: "Insert into perfil_empleados(IdPerfil, imagen1) values(@Id, case when @photoPath1 is null then null else @photoPath1 end)",
    updatePerfilEmpleado: "UPDATE perfil_empleados SET Imagen1 = case when @photoPath1 is null then null else @photoPath1 end WHERE CAST(IdPerfil AS varchar) = @id"
}

export const querys = {
    getAllStudents: "SELECT * from [dbo].[estudiantes]",
    addNewStudent: "INSERT INTO [dbo].[estudiantes] (NumCuenta, DNI, Nombre, Apellido,NumeroTelefono, CorreoInstitucional, CorreoPersonal, Contrasena, FechaNacimiento, Carrera, Direccion, CentroRegional, PuntajePAA) VALUES (@NumCuenta, @DNI, @Nombre, @Apellido,@NumeroTelefono, @CorreoInstitucional, @CorreoPersonal, @Contrasena, @FechaNacimiento, @Carrera, @Direccion, @CentroRegional, @PuntajePAA);",
    getEstudiantesMatriculados: "SELECT Distinct NumCuenta, Nombre, Apellido, CorreoInstitucional, Carrera, IndiceGlobal, IndicePeriodo FROM [dbo].[estudiantes] e inner join registro_estudiante_clases re on re.IdEstudiante = numCuenta inner join secciones s on re.idSeccion = s.idseccion where YEAR(re.fecha) = year(getdate()) and month(RE.Fecha) > '05'",
    insertNuevaPlanificacion: "INSERT INTO [dbo].[planificacion_academica] (FechaInicio, FechaFinal, PeriodoAcademico) VALUES (@FechaInicio, @FechaFinal, @PeriodoAcademico)",
    getPlanificacionAcademica: "SELECT * FROM [dbo].[planificacion_academica]",
    insertNuevaMatricula: "INSERT INTO [dbo].[planificacion_matricula] (FechaInicio, FechaFinal, HoraInicio, HoraFinal, PeriodoAcademico) VALUES (@FechaInicio, @FechaFinal,@HoraInicio, @HoraFinal, @PeriodoAcademico)",
    getMatricula: "select * from [dbo].[planificacion_matricula]",
    insertProcesoCancelacion: "INSERT INTO [dbo].[planificacion_cancelacionesexcepcionales] (FechaInicio, FechaFinal, HoraInicio, HoraFinal, PeriodoAcademico) VALUES (@FechaInicio, @FechaFinal,@HoraInicio, @HoraFinal, @PeriodoAcademico)",
    getCancelacion: "select * from [dbo].[planificacion_cancelacionesexcepcionales]",
    getIPACMatricula: "select * from [dbo].[planificacion_matricula] where PeriodoAcademico ='1PAC'",
    getIIPACMatricula: "select * from [dbo].[planificacion_matricula] where PeriodoAcademico ='2PAC'",
    getIIIPACMatricula: "select * from [dbo].[planificacion_matricula] where PeriodoAcademico ='3PAC'",
    getIPACPlanificacion: "select * from [dbo].[planificacion_academica] where PeriodoAcademico = '1PAC'",
    getIIPACPlanificacion: "select * from [dbo].[planificacion_academica] where PeriodoAcademico = '2PAC'",
    getIIIPACPlanificacion: "select * from [dbo].[planificacion_academica] where PeriodoAcademico = '3PAC'",
    getClasesCursando: "select cs.IdClase as CODIGO, cs.Nombre as ASIGNATURA, cs.uv as UV, s.seccion AS SECCION,s.Edificio AS EDIFICIO,s.Aula AS AULA,s.HI AS HORA_INICIO,s.HF AS HORA_FINAL,s.obs AS OBS, year(re.Fecha) AS Año, Periodo AS PERIODO from registro_estudiante_clases re INNER JOIN estudiantes e on IdEstudiante = NumCuenta INNER join secciones s on re.IdSeccion = s.IdSeccion INNER join clases cs on cs.IdClase = s.IdClase where e.numCuenta=@NumCuenta and Periodo = @Periodo and year(re.Fecha) = @año",

    insertPDF: "update [dbo].[registro_cancelaciones_excepcionales] set Documento=@pdfPath where NumCuenta=@Id",
    insertSoliCancel: "Insert into [dbo].[registro_cancelaciones_excepcionales] (IdClase, Asignatura, UV, Seccion, Año, Periodo, Estado, Descripcion, NumCuenta) values(@idClase, @asignatura, @uv,  @seccion,@año, @periodo, @estado, @descripcion, @Id)",
    getCancelaciones: "select IdClase AS CODIGO,Asignatura AS ASIGNATURA,UV AS UV,Seccion AS SECCION,Periodo AS PERIODO,Estado AS ESTADO from [dbo].[registro_cancelaciones_excepcionales] WHERE NumCuenta =  @NumCuenta And Periodo = @Periodo",
    getPerfilEstudianteFormaAdmin: "select e.Nombre,e.Apellido,pe.Imagen1,e.IndiceGlobal,e.IndicePeriodo from [dbo].[perfil_estudiante] as pe INNER JOIN [dbo].[estudiantes] e on e.NumCuenta = pe.IdPerfil where e.NumCuenta = @NumCuenta",

    geSoliCancelacionesCoordinador: "select rce.IdClase, rce.Asignatura, rce.UV, rce.Seccion, rce.Periodo, rce.Descripcion, rce.Documento, rce.Estado, rce.NumCuenta, e.Nombre, e.Apellido, e.IndiceGlobal, e.IndicePeriodo, pe.Imagen1 from [dbo].[registro_cancelaciones_excepcionales] as rce inner join [dbo].[estudiantes] e on e.NumCuenta = rce.NumCuenta INNER JOIN [dbo].[perfil_estudiante] pe on pe.IdPerfil = e.NumCuenta",

    getPdfSolicitud: "select DISTINCT Documento from [dbo].[registro_cancelaciones_excepcionales] where NumCuenta = @NumCuenta",
};

export const queryStudentHistory = {
    getStudentHistory: "select cs.IdClase as CODIGO, cs.Nombre as ASIGNATURA, cs.uv as UV, s.seccion AS SECCION,  year(re.Fecha) AS Año, Periodo AS PERIODO, nota AS CALIFIACION, EstadoClase AS OBS  from registro_estudiante_clases re INNER JOIN estudiantes e on IdEstudiante = NumCuenta INNER join secciones s on re.IdSeccion = s.IdSeccion INNER join clases cs on cs.IdClase = s.IdClase  where e.numCuenta = @NumCuenta",
    getHistorial: "select cs.IdClase as CODIGO, cs.Nombre as ASIGNATURA, cs.uv as UV, s.seccion AS SECCION,  year(re.Fecha) AS Año, Periodo AS PERIODO, nota AS CALIFIACION, EstadoClase AS OBS  from registro_estudiante_clases re INNER JOIN estudiantes e on IdEstudiante = NumCuenta INNER join secciones s on re.IdSeccion = s.IdSeccion INNER join clases cs on cs.IdClase = s.IdClase",
    getStudentForHistory:"select NumCuenta, Nombre, Apellido, Carrera, CentroRegional, IndiceGlobal from estudiantes where NumCuenta=@NumCuenta"
}

export const querysADMIN = {

}