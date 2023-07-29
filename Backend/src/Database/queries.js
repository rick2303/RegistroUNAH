export const queries = {
    get_Docentes: "SELECT Top 10 * from dbo.empleados where rol='Docente' ORDER BY NumEmpleado DESC",
    get_Docente_By_Id: "SELECT * from dbo.empleados where rol='Docente' and DNI = @DNI",
    getNumEmpleado: "SELECT numEmpleado from dbo.empleados where DNI = @dni",
    insert_Docentes: "INSERT INTO dbo.empleados (DNI, Nombre, Apellido, NumeroTelefono, CorreoInstitucional, CorreoPersonal, Contrasena,FechaNacimiento ,FechaContratacion, Carrera, Direccion, Foto, CentroRegional, Rol,SubRol) VALUES ( @DNI, @Nombre, @Apellido, @NumeroTelefono,@CorreoInstitucional, @CorreoPersonal, @Contrasena, @FechaNacimiento, @FechaContratacion, @Carrera, @Direccion, @Foto, @CentroRegional, @Rol , @SubRol )",
    accessLogin: "SELECT Contrasena, CAST(NumEmpleado AS varchar) AS Codigo, Rol, SubRol, estado FROM dbo.empleados WHERE CAST(NumEmpleado AS varchar) = @Id UNION ALL SELECT Contrasena, CAST(NumCuenta AS varchar) AS NumCuenta, NULL AS rol, NULL AS subrol, NULL as estado FROM dbo.estudiantes WHERE NumCuenta = @Id  ",
    updateEmpleado: "UPDATE dbo.empleados SET DNI = @DNI, Nombre = @Nombre, Apellido = @Apellido, NumeroTelefono = @NumeroTelefono, CorreoPersonal = @CorreoPersonal,  FechaNacimiento = @FechaNacimiento, Carrera = @Carrera, Direccion = @Direccion, CentroRegional = @CentroRegional, SubRol = @SubRol, Estado = @Estado where NumEmpleado = @NumEmpleado",
    getEstudiantes: "SELECT Nombre, apellido, NumCuenta,CorreoInstitucional,CorreoPersonal,Carrera, IndiceGlobal from dbo.estudiantes WHERE NumCuenta= @Id",
    getEmpleado: "select CAST(NumEmpleado AS varchar) 'NumEmpleado', Nombre,Apellido,CorreoInstitucional,CorreoPersonal,Carrera,Foto,CentroRegional,Rol,Subrol from empleados WHERE CAST(NumEmpleado AS varchar) = @Id ",
    getPerfilEmpleado: "select * from perfil_empleados where CAST(idPerfil AS varchar) = @Id ",
    getPerfilestudiante: "select * from perfil_estudiante where IdPerfil= @Id ",

    insertPerfilEstudiante: "insert into perfil_estudiante (IdPerfil, imagen1, imagen2, imagen3 )values(@Id,case when @photoPath1 is null then null else @photoPath1 end, case when @photoPath2 is null then null else @photoPath2 end, case when @photoPath3 is null then null else @photoPath3 end) ",

    insertDescripcionPerfilEstudiante: "Insert into perfil_estudiante(IdPerfil, descripcion) values (@Id, @descripcion)",

    updatePerfilEstudiante: "update perfil_estudiante set imagen1 = case WHEN @photoPath1 is NULL then imagen1 ELSE @photoPath1 END,  imagen2 = case WHEN @photoPath2 is NULL then imagen2 ELSE @photoPath2 END, imagen3 = case WHEN @photoPath3 is NULL then imagen3 ELSE @photoPath3 END where IdPerfil = @Id",

    insertDescripcionPerfilEmpleado: "Insert into perfil_empleados(IdPerfil, descripcion) values (@Id, @descripcion)",

    updateDescripcionPerfilEstudiantep: 'update perfil_estudiante set descripcion = @descripcion where IdPerfil = @id',
    updateCorreoPersonalEstudiante: 'update estudiantes set CorreoPersonal = @CorreoPersonal where NumCuenta = @id',
    updateDescripcionPerfilEmpleado: 'update perfil_empleados set descripcion = @descripcion where IdPerfil = @id',

    insertVideoEmpleado: "Insert into perfil_empleados(IdPerfil, Video) values (@Id, @Video)",
    updateVideoEmpleado: "update perfil_empleados set Video = @Video where CAST(idPerfil AS varchar) = @Id",

    insertPerfilEmpleado: "Insert into perfil_empleados(IdPerfil, imagen1) values(@Id, case when @photoPath1 is null then null else @photoPath1 end)",
    updatePerfilEmpleado: "UPDATE perfil_empleados SET Imagen1 = case when @photoPath1 is null then null else @photoPath1 end WHERE CAST(IdPerfil AS varchar) = @id",

    insertSeccion: "INSERT INTO secciones (IdClase, Edificio, Aula, HI, Seccion, HF, Periodo, Fecha, Obs, IdDocente, Dias, Cupos, CentroRegional, ClaseServicio) VALUES (@IdClase, @Edificio, @Aula, @HI, @Seccion, @HF, @Periodo, @FechaActual, @Obs, @IdDocente, @Dias, CASE WHEN @Cupos IS NULL THEN 0 ELSE @Cupos END, @CentroRegional, @ClaseServicio);",

    getAulas: "select au.Nombre from aulas au inner join edificios as ed on au.IdEdificio=ed.IdEdificio where ed.IdEdificio=@IdEdificio",

    validarDocenteSeccion: `SELECT * FROM Secciones WHERE IdDocente = @IdDocente AND Dias = @Dias AND ((HI <= @HI AND HF >= @HI) OR (HI <= @HF AND HF >= @HF) OR (HI >= @HI AND HF <= @HF)) AND Periodo = @Periodo`,

    obtenerSeccionMaxima:`SELECT MAX(Seccion) AS MaxSeccion FROM Secciones WHERE HI = @HI AND Periodo = @Periodo`,

    validarSeccionExistente : `SELECT * FROM Secciones WHERE IdClase = @IdClase AND Seccion = @Seccion AND Periodo = @Periodo AND YEAR(Fecha) = YEAR(@FechaActual)`,

    validarSeccionAulaQuery :`SELECT * FROM Secciones WHERE Edificio = @Edificio  AND Aula = @Aula  AND Periodo = @Periodo  AND ((HI <= @HI AND HF >= @HI) OR (HI>= @HI AND HF <= @HI)) AND dias = @Dias`,

    deleteSeccion: "EXEC SP_EliminarSeccion @IdSeccion = @idseccion, @Justificacion = @justificado, @Asignatura = @clase, @UV = @uvs;",

    agregarCupos:"UPDATE Secciones SET Cupos = CASE WHEN Cupos IS NULL THEN 0 ELSE Cupos + @Cupos END   WHERE IdSeccion = @idseccion;",

    getCarreras:"SELECT NombreCarrera from Carrera",

    insertSolicitudCambioCentro:"INSERT INTO solicitud_cambiocentro VALUES (@NumCuenta,@CentroRegional,@CentroNuevo,@Justificacion,@FechaSolicitud,'EN ESPERA','NO PAGADO')",

    getSolicitudesCambioCentro:`SELECT DISTINCT es.NumCuenta,es.Nombre, es.Apellido, esp.TipoPago as Solicitud, scc.Justificacion, es.CorreoInstitucional,  
    es.IndiceGlobal, es.CentroRegional as 'CentroActual', scc.CentroNuevo  as 'CentroNuevo',esp.Estado, scc.Dictamen 
    FROM estudiantes as es 
    LEFT JOIN solicitud_cambiocentro as scc ON es.NumCuenta = scc.NumCuenta 
    LEFT JOIN estudiantes_pagos as esp ON es.NumCuenta = esp.NumCuenta 
    WHERE esp.TipoPago = 'CAMBIO DE CENTRO' 
    AND esp.Estado = 'PAGADO'
    AND scc.CentroNuevo= @CentroRegional
    AND scc.Dictamen='EN ESPERA'
    AND scc.Estado='PAGADO'
    AND es.Carrera=@Carrera`,

    UpdateDictamenCambioCentro:"update solicitud_cambiocentro set Dictamen=@Dictamen where NumCuenta=@NumCuenta AND Dictamen ='EN ESPERA'",

    UpdateCambioCentro:"update dbo.estudiantes set CentroRegional=@CentroRegional where NumCuenta=@NumCuenta",

}

export const querys = {
    getAllStudents: "SELECT * from [dbo].[estudiantes]",
    addNewStudent: "INSERT INTO [dbo].[estudiantes] (NumCuenta, DNI, Nombre, Apellido,NumeroTelefono, CorreoInstitucional, CorreoPersonal, Contrasena, FechaNacimiento, Carrera, Direccion, CentroRegional, PuntajePAA) VALUES (@NumCuenta, @DNI, @Nombre, @Apellido,@NumeroTelefono, @CorreoInstitucional, @CorreoPersonal, @Contrasena, @FechaNacimiento, @Carrera, @Direccion, @CentroRegional, @PuntajePAA);",
    getEstudiantesMatriculados: "SELECT Distinct NumCuenta, Nombre, Apellido, CorreoInstitucional, Carrera, IndiceGlobal, IndicePeriodo FROM [dbo].[estudiantes] e inner join registro_estudiante_clases re on re.IdEstudiante = numCuenta inner join secciones s on re.idSeccion = s.idseccion where YEAR(re.fecha) = year(getdate()) and month(RE.Fecha) > '05'",
    insertNuevaPlanificacion: "INSERT INTO [dbo].[planificacion_academica] (FechaInicio, FechaFinal, PeriodoAcademico, Sistema) VALUES (@FechaInicio, @FechaFinal, @PeriodoAcademico, @Sistema)",
    getPlanificacionAcademica: "SELECT * FROM [dbo].[planificacion_academica] WHERE Sistema='Trimestral'",
    getPlanificacionAcademicaSemestral: "SELECT * FROM [dbo].[planificacion_academica] WHERE Sistema='Semestral'",
    insertNuevaMatricula: "INSERT INTO [dbo].[planificacion_matricula] (FechaInicio, FechaFinal, HoraInicio, HoraFinal, PeriodoAcademico, Sistema) VALUES (@FechaInicio, @FechaFinal,@HoraInicio, @HoraFinal, @PeriodoAcademico, @Sistema)",
    getMatricula: "select * from [dbo].[planificacion_matricula]",
    insertProcesoCancelacion: "INSERT INTO [dbo].[planificacion_cancelacionesexcepcionales] (FechaInicio, FechaFinal, HoraInicio, HoraFinal, PeriodoAcademico, Sistema) VALUES (@FechaInicio, @FechaFinal,@HoraInicio, @HoraFinal, @PeriodoAcademico, @Sistema)",
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
    getPerfilEstudianteFormaAdmin: "select e.Nombre,e.Apellido,pe.Imagen1,e.IndiceGlobal,e.IndicePeriodo, e.Carrera, e.CentroRegional from [dbo].[perfil_estudiante] as pe INNER JOIN [dbo].[estudiantes] e on e.NumCuenta = pe.IdPerfil where e.NumCuenta = @NumCuenta",
    
    geSoliCancelacionesCoordinador: "SELECT DISTINCT rce.NumCuenta, rce.Descripcion, rce.Estado, e.Nombre, e.Apellido, e.IndiceGlobal, e.IndicePeriodo, e.CorreoInstitucional, pe.Imagen1 , e.Carrera, e.CentroRegional FROM [dbo].[registro_cancelaciones_excepcionales] AS rce INNER JOIN [dbo].[estudiantes] e ON e.NumCuenta = rce.NumCuenta INNER JOIN [dbo].[perfil_estudiante] pe ON pe.IdPerfil = e.NumCuenta WHERE rce.Estado = 'Pendiente' And e.Carrera = @carrera And e.CentroRegional = @CentroRegional",

    getSoliCambioDeCarreraCoordi:"SELECT DISTINCT sc.NumCuenta, sc.RazonDeCambio, sc.Estado,sc.Dictamen, e.Nombre, e.Apellido, e.IndiceGlobal, e.IndicePeriodo, pe.Imagen1, sc.Carrera, sc.CarreraDeCambio, sc.CentroRegional, e.CorreoInstitucional, sc.IdSolicitud, e.PuntajePAA, e.PuntajePAM, e.PuntajePCCNS FROM [dbo].[solicitud_cambiocarrera] AS sc INNER JOIN [dbo].[estudiantes] e ON e.NumCuenta = sc.NumCuenta INNER JOIN [dbo].[perfil_estudiante] pe ON pe.IdPerfil = e.NumCuenta WHERE sc.Estado = 'PAGADO' AND sc.CarreraDeCambio= @carreraCambio AND sc.CentroRegional=@CentroRegional AND sc.Dictamen='EN ESPERA'",
    getPdfSolicitud: "select DISTINCT Documento from [dbo].[registro_cancelaciones_excepcionales] where NumCuenta = @NumCuenta",

    getSoliCancelacionesCount: "SELECT COUNT(DISTINCT NumCuenta) AS total_filas FROM registro_cancelaciones_excepcionales;",
    getClasesSolicitud:"select rce.IdClase, rce.Asignatura, rce.UV, rce.Seccion, rce.Periodo,rce.Estado, rce.NumCuenta,pe.Imagen1 from [dbo].[registro_cancelaciones_excepcionales] as rce inner join [dbo].[estudiantes] e on e.NumCuenta = rce.NumCuenta INNER JOIN [dbo].[perfil_estudiante] pe on pe.IdPerfil = e.NumCuenta where rce.Estado = 'Pendiente' And rce.NumCuenta = @NumCuenta",

    UpdateEstadoCancel: "UPDATE [dbo].[registro_cancelaciones_excepcionales] SET Estado = '@estado' WHERE NumCuenta = @numCuenta AND IdClase = '@idClase'",
    EliminarClaseExcep: "DELETE FROM registro_estudiante_clases WHERE EXISTS (SELECT 1 FROM estudiantes e INNER JOIN secciones s ON registro_estudiante_clases.IdSeccion = s.IdSeccion INNER JOIN clases cs ON cs.IdClase = s.IdClase WHERE e.numCuenta = @numCuenta AND Periodo = @periodo AND YEAR(registro_estudiante_clases.Fecha) = @año AND cs.IdClase = @idClase AND registro_estudiante_clases.IdEstudiante = e.NumCuenta);",
    
    getCarreras: "SELECT IdCarrera, NombreCarrera, Sistema from [dbo].[carrera]",
    getInfoEstudent: "select * from [dbo].[estudiantes] where NumCuenta = @NumCuenta",
    getSoliEstu: "select * from [dbo].[solicitud_cambiocarrera] where NumCuenta = @NumCuenta",
    insertSolicitudCambioCarrera: "insert into [dbo].[solicitud_cambiocarrera] (NumCuenta, Nombre, Apellido, Carrera, CentroRegional, IndiceGlobal, PuntajePAA, CarreraDeCambio, RazonDeCambio, FechaSolicitud, Dictamen) values (@NumCuenta, @Nombre, @Apellido, @Carrera, @CentroRegional, @IndiceGlobal, @PuntajePAA, @CarreraDeCambio, @RazonDeCambio, @FechaSolicitud, @Dictamen)",
    UpdateEstadoCambioCarrera: "UPDATE [dbo].[solicitud_cambiocarrera] SET Dictamen =  '@dictamen', JustificacionCoordi = '@justificacion' WHERE NumCuenta = @numCuenta AND IdSolicitud = @idSolicitud",
    updateCambioCarreraEstudiante:"UPDATE [dbo].[estudiantes] SET Carrera = @CarreraCambio WHERE NumCuenta = @numCuenta",
    UpdateEstadoCambioCarrera: "UPDATE [dbo].[solicitud_cambiocarrera] SET Dictamen =  '@dictamen', JustificacionCoordi = '@justificacion' WHERE NumCuenta = @numCuenta AND IdSolicitud = @idSolicitud",
    updateCambioCarreraEstudiante:"UPDATE [dbo].[estudiantes] SET Carrera = @CarreraCambio WHERE NumCuenta = @numCuenta",

    getCambioCentroSoli:"select * from [dbo].[solicitud_cambiocentro] where NumCuenta=@NumCuenta",  

    getCentrosRegionales:"select NombreCentro, Centro from [dbo].[centro_regionales]",

    updateCentroNuevo:"update [dbo].[solicitud_cambiocentro] set CentroNuevo='@Centro' where NumCuenta=numCuenta AND IdSolicitud=idSolicitud",
};

export const queryStudentHistory = {
    getStudentHistory: "select cs.IdClase as CODIGO, cs.Nombre as ASIGNATURA, cs.uv as UV, s.seccion AS SECCION,  year(re.Fecha) AS Año, Periodo AS PERIODO, nota AS CALIFIACION, EstadoClase AS OBS  from registro_estudiante_clases re INNER JOIN estudiantes e on IdEstudiante = NumCuenta INNER join secciones s on re.IdSeccion = s.IdSeccion INNER join clases cs on cs.IdClase = s.IdClase  where e.numCuenta = @NumCuenta and EstadoClase is not null ",
    getHistorial: "select cs.IdClase as CODIGO, cs.Nombre as ASIGNATURA, cs.uv as UV, s.seccion AS SECCION,  year(re.Fecha) AS Año, Periodo AS PERIODO, nota AS CALIFIACION, EstadoClase AS OBS  from registro_estudiante_clases re INNER JOIN estudiantes e on IdEstudiante = NumCuenta INNER join secciones s on re.IdSeccion = s.IdSeccion INNER join clases cs on cs.IdClase = s.IdClase",
    getStudentForHistory:"select NumCuenta, Nombre, Apellido, Carrera, CentroRegional, IndiceGlobal from estudiantes where NumCuenta=@NumCuenta"
}

export const querysADMIN = {
    DeletePlanificacion: 'delete planificacion_academica where idPlanificacion = @idPlanificacion',
    DeleteMatricula: 'delete planificacion_matricula where idPlanificacion = @idPlanificacion',
    DeleteCancelacionesExcepcionales: 'delete planificacion_cancelacionesexcepcionales where idPlanificacion = @idPlanificacion',
    getPeriodoActual: 'select PeriodoAcademico from planificacion_academica where GETDATE() BETWEEN FechaInicio and FechaFinal and Sistema = @Sistema'

}

export const queryEstudiante= {
    getState: 'select * from estudiantes_pagos where NumCuenta = @numCuenta',
    postSolicitudReposicion: 'insert into solicitudes_pagoreposicion (NumCuenta, Justificacion, FechaSolicitud, Periodo) values (@NumCuenta, @Justificacion, GETDATE(), @Periodo)',
    getExistenciaSolicitudReposicion: 'select * from solicitudes_pagoreposicion where NumCuenta = @NumCuenta and Periodo = @Periodo and year(FechaSolicitud) = year(GETDATE())',
}

