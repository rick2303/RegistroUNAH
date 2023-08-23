export const queries = {
    get_Docentes: "SELECT Top 10 * from dbo.empleados where rol='Docente' ORDER BY NumEmpleado DESC",
    get_Docente_By_Id: "SELECT * from dbo.empleados where rol='Docente' and DNI = @DNI",
    get_Docente_By_Id_Dep: "SELECT * from dbo.empleados where rol='Docente' and DNI = @DNI and Carrera = @Carrera and CentroRegional = @CentroRegional",
    getNumEmpleado: "SELECT numEmpleado from dbo.empleados where DNI = @dni",
    insert_Docentes: "INSERT INTO dbo.empleados (DNI, Nombre, Apellido, NumeroTelefono, CorreoInstitucional, CorreoPersonal, Contrasena,FechaNacimiento ,FechaContratacion, Carrera, Direccion, Foto, CentroRegional, Rol,SubRol) VALUES ( @DNI, @Nombre, @Apellido, @NumeroTelefono,@CorreoInstitucional, @CorreoPersonal, @Contrasena, @FechaNacimiento, @FechaContratacion, @Carrera, @Direccion, @Foto, @CentroRegional, @Rol , @SubRol )",
    accessLogin: "SELECT Contrasena, CAST(NumEmpleado AS varchar) AS Codigo, Rol, SubRol, estado FROM dbo.empleados WHERE CAST(NumEmpleado AS varchar) = @Id UNION ALL SELECT Contrasena, CAST(NumCuenta AS varchar) AS NumCuenta, NULL AS rol, NULL AS subrol, NULL as estado FROM dbo.estudiantes WHERE NumCuenta = @Id  ",
    updateEmpleado: "UPDATE dbo.empleados SET DNI = @DNI, Nombre = @Nombre, Apellido = @Apellido, NumeroTelefono = @NumeroTelefono, CorreoPersonal = @CorreoPersonal,  FechaNacimiento = @FechaNacimiento, Carrera = @Carrera, Direccion = @Direccion, CentroRegional = @CentroRegional, SubRol = @SubRol, Estado = @Estado where NumEmpleado = @NumEmpleado",
    getEstudiantes: "SELECT Nombre, apellido, NumCuenta,Sistema, CorreoInstitucional,CorreoPersonal,Carrera,CentroRegional,IndiceGlobal from dbo.estudiantes WHERE NumCuenta= @Id",
    getEmpleado: "select CAST(NumEmpleado AS varchar) 'NumEmpleado', Nombre,Apellido,CorreoInstitucional,CorreoPersonal,Carrera,Foto,CentroRegional,Rol,Subrol, Sistema from empleados WHERE CAST(NumEmpleado AS varchar) = @Id ",
    getPerfilEmpleado: "select * from perfil_empleados where CAST(idPerfil AS varchar) = @Id ",
    getPerfilestudiante: "select * from perfil_estudiante where IdPerfil= @Id ",

    insertPerfilEstudiante: "insert into perfil_estudiante (IdPerfil, imagen1, imagen2, imagen3 )values(@Id,case when @photoPath1 is null then null else @photoPath1 end, case when @photoPath2 is null then null else @photoPath2 end, case when @photoPath3 is null then null else @photoPath3 end) ",

    insertDescripcionPerfilEstudiante: "Insert into perfil_estudiante(IdPerfil, descripcion) values (@Id, @descripcion)",

    updatePerfilEstudiante: "update perfil_estudiante set imagen1 = case WHEN @photoPath1 is NULL then imagen1 ELSE @photoPath1 END,  imagen2 = case WHEN @photoPath2 is NULL then imagen2 ELSE @photoPath2 END, imagen3 = case WHEN @photoPath3 is NULL then imagen3 ELSE @photoPath3 END where IdPerfil = @Id",

    insertDescripcionPerfilEmpleado: "Insert into perfil_empleados(IdPerfil, descripcion) values (@Id, @descripcion)",

    updateDescripcionPerfilEstudiantep: 'update perfil_estudiante set descripcion = @descripcion where IdPerfil = @id',
    updateCorreoPersonalEstudiante: 'update estudiantes set CorreoPersonal = @CorreoPersonal where NumCuenta = @id',
    updateCorreoPersonalEmpleado: 'update empleados set CorreoPersonal = @CorreoPersonal where NumEmpleado = @id',
    updateDescripcionPerfilEmpleado: 'update perfil_empleados set descripcion = @descripcion where IdPerfil = @id',

    insertVideoEmpleado: "Insert into perfil_empleados(IdPerfil, Video) values (@Id, @Video)",
    updateVideoEmpleado: "update perfil_empleados set Video = @Video where CAST(idPerfil AS varchar) = @Id",

    insertPerfilEmpleado: "Insert into perfil_empleados(IdPerfil, imagen1) values(@Id, case when @photoPath1 is null then null else @photoPath1 end)",
    updatePerfilEmpleado: "UPDATE perfil_empleados SET Imagen1 = case when @photoPath1 is null then null else @photoPath1 end WHERE CAST(IdPerfil AS varchar) = @id",

    insertSeccion: "INSERT INTO secciones (IdClase, Edificio, Aula, HI, Seccion, HF, Periodo, Fecha, Obs, IdDocente, Dias, Cupos, CentroRegional, ClaseServicio) VALUES (@IdClase, @Edificio, @Aula, @HI, @Seccion, @HF, @Periodo, @FechaActual, @Obs, @IdDocente, @Dias, CASE WHEN @Cupos IS NULL THEN 0 ELSE @Cupos END, @CentroRegional, @ClaseServicio);",

    getAulas: "select au.Nombre from aulas au inner join edificios as ed on au.IdEdificio=ed.IdEdificio where ed.IdEdificio=@IdEdificio",

    validarDocenteSeccion: `SELECT * FROM Secciones
    WHERE IdDocente = @IdDocente 
    AND ((HI = @HI AND HF >= @HI) OR (HI <= @HF AND HF >= @HF) OR (HI >= @HI AND HF <= @HF))       AND (
        (@Dias LIKE '%Lu%' AND Dias LIKE '%Lu%')
        OR (@Dias LIKE '%Ma%' AND Dias LIKE '%Ma%')
        OR (@Dias LIKE '%Mi%' AND Dias LIKE '%Mi%')
        OR (@Dias LIKE '%Ju%' AND Dias LIKE '%Ju%')
        OR (@Dias LIKE '%Vi%' AND Dias LIKE '%Vi%')
        OR (@Dias LIKE '%Sa%' AND Dias LIKE '%Sa%')
    )
    AND Periodo = @Periodo`,

    obtenerSeccionMaxima: `SELECT MAX(Seccion) AS MaxSeccion FROM Secciones WHERE HI = @HI AND Periodo = @Periodo`,

    validarSeccionExistente: `SELECT * FROM Secciones WHERE IdClase = @IdClase AND Seccion = @Seccion AND Periodo = @Periodo AND YEAR(Fecha) = YEAR(@FechaActual)`,

    validarSeccionAulaQuery: `SELECT *
    FROM Secciones
    WHERE Edificio = @Edificio
      AND Aula = @Aula
      AND Periodo = @Periodo
      AND ((HI = @HI AND HF >= @HI) OR (HI >= @HI AND HF <= @HI))
      AND (
          (@Dias LIKE '%Lu%' AND Dias LIKE '%Lu%')
          OR (@Dias LIKE '%Ma%' AND Dias LIKE '%Ma%')
          OR (@Dias LIKE '%Mi%' AND Dias LIKE '%Mi%')
          OR (@Dias LIKE '%Ju%' AND Dias LIKE '%Ju%')
          OR (@Dias LIKE '%Vi%' AND Dias LIKE '%Vi%')
          OR (@Dias LIKE '%Sa%' AND Dias LIKE '%Sa%')
      );
    `,

    deleteSeccion: "EXEC SP_EliminarSeccion @IdSeccion = @idseccion, @Justificacion = @justificado, @Asignatura = @clase, @UV = @uvs;",

    agregarCupos: "UPDATE Secciones SET Cupos = CASE WHEN Cupos IS NULL THEN 0 ELSE Cupos + @Cupos END   WHERE IdSeccion = @idseccion;",

    getCarreras: "SELECT NombreCarrera from Carrera",

    insertSolicitudCambioCentro: "INSERT INTO solicitud_cambiocentro VALUES (@NumCuenta,@CentroRegional,@CentroNuevo,@Justificacion,@FechaSolicitud,'EN ESPERA','NO PAGADO')",

    getSolicitudesCambioCentro: `SELECT DISTINCT es.NumCuenta,es.Nombre, es.Apellido, pe.Imagen1, esp.TipoPago as Solicitud, scc.Justificacion, es.CorreoInstitucional,  
    es.IndiceGlobal, es.CentroRegional as 'CentroActual', scc.CentroNuevo  as 'CentroNuevo',esp.Estado, scc.Dictamen 
    FROM estudiantes as es 
    LEFT JOIN solicitud_cambiocentro as scc ON es.NumCuenta = scc.NumCuenta 
    LEFT JOIN estudiantes_pagos as esp ON es.NumCuenta = esp.NumCuenta 
    INNER JOIN [dbo].[perfil_estudiante] pe ON pe.IdPerfil = es.NumCuenta
    WHERE esp.TipoPago = 'CAMBIO DE CENTRO' 
    AND esp.Estado = 'PAGADO'
    AND scc.CentroNuevo= @CentroRegional
    AND scc.Dictamen='EN ESPERA'
    AND scc.Estado='PAGADO'
    AND es.Carrera=@Carrera`,

    UpdateDictamenCambioCentro: "update solicitud_cambiocentro set Dictamen=@Dictamen where NumCuenta=@NumCuenta AND Dictamen ='EN ESPERA'",

    UpdateCambioCentro: "update dbo.estudiantes set CentroRegional=@CentroRegional where NumCuenta=@NumCuenta",

    CargaAcademica: `
    select 
    sc.IdClase,cl.Nombre,Edificio,sc.Aula,sc.CantidadAlumnos,sc.HI,sc.HF,sc.Seccion,sc.IdDocente, sc.CentroRegional, 
    concat(emp.Nombre,' ', emp.Apellido) as NombreDocente, sc.Dias
    from secciones as sc
    right join clases as cl on sc.IdClase=cl.IdClase
    right join empleados as emp on sc.IdDocente=NumEmpleado 
    where Departamento=@Departamento And sc.CentroRegional=@CentroRegional`,

    PeriodoSeccionesCarga: `SELECT CONCAT(CAST(CAST(SUBSTRING(PeriodoAcademico, 1, CHARINDEX('PAC', PeriodoAcademico) - 1) AS INT) + 1 AS NVARCHAR(10)), 'PAC') AS NuevoPeriodoAcademico, year(FechaFinal) as Anio
    FROM planificacion_academica
    WHERE GETDATE() BETWEEN FechaInicio AND FechaFinal AND Sistema = @Sistema`,

    getContactos:`select distinct c.IdEstudiantePropietario, c.IdEstudianteAgregado,pe.Imagen1,es.Nombre,es.Apellido, eu.IsOnline from contactos as c 
    left join perfil_estudiante as pe 
    on c.IdEstudianteAgregado = pe.IdPerfil
    left join estudiantes as es
    on c.IdEstudianteAgregado = es.NumCuenta
    left join EstadoUsuarios as eu
	on c.IdEstudianteAgregado = eu.UserId
    where c.IdEstudiantePropietario= @NumCuenta  AND EstadoSolicitud='AGREGADO' 
    `


}

export const querys = {
    getAllStudents: "SELECT * from [dbo].[estudiantes]",
    addNewStudent: "INSERT INTO [dbo].[estudiantes] (NumCuenta, DNI, Nombre, Apellido,NumeroTelefono, CorreoInstitucional, CorreoPersonal, Contrasena, FechaNacimiento, Carrera, Direccion, CentroRegional, PuntajePAA, PuntajePAM, PuntajePCCNS) VALUES (@NumCuenta, @DNI, @Nombre, @Apellido,@NumeroTelefono, @CorreoInstitucional, @CorreoPersonal, @Contrasena, @FechaNacimiento, @Carrera, @Direccion, @CentroRegional, @PuntajePAA, @PuntajePAM, @PuntajePCCNS);",
    getEstudiantesMatriculados: "SELECT Distinct NumCuenta, Nombre, Apellido, CorreoInstitucional, Carrera, IndiceGlobal, IndicePeriodo FROM [dbo].[estudiantes] e inner join registro_estudiante_clases re on re.IdEstudiante = numCuenta inner join secciones s on re.idSeccion = s.idseccion where YEAR(re.fecha) = year(getdate()) and month(RE.Fecha) > '05'",
    insertNuevaPlanificacion: "INSERT INTO [dbo].[planificacion_academica] (FechaInicio, FechaFinal, PeriodoAcademico, Sistema) VALUES (@FechaInicio, @FechaFinal, @PeriodoAcademico, @Sistema)",
    getPlanificacionAcademica: "SELECT * FROM [dbo].[planificacion_academica] WHERE Sistema='Trimestral'Order by FechaInicio",
    getPlanificacionAcademicaSemestral: "SELECT * FROM [dbo].[planificacion_academica] WHERE Sistema='Semestral' Order by FechaInicio",
    insertNuevaMatricula: "INSERT INTO [dbo].[planificacion_matricula] (FechaInicio, FechaFinal, HoraInicio, HoraFinal, PeriodoAcademico, Sistema) VALUES (@FechaInicio, @FechaFinal,@HoraInicio, @HoraFinal, @PeriodoAcademico, @Sistema)",
    insertFechaNotas: "INSERT INTO [dbo].[planificacion_ingresonotas] (FechaInicio, FechaFinal, HoraInicio, HoraFinal, PeriodoAcademico, Sistema) VALUES (@FechaInicio, @FechaFinal,@HoraInicio, @HoraFinal, @PeriodoAcademico, @Sistema)",
    getMatricula: "select * from [dbo].[planificacion_matricula] WHERE Sistema='Trimestral' Order by FechaInicio",
    getMatriculaSemestral: "select * from [dbo].[planificacion_matricula] WHERE Sistema='Semestral' Order by FechaInicio",
    insertProcesoCancelacion: "INSERT INTO [dbo].[planificacion_cancelacionesexcepcionales] (FechaInicio, FechaFinal, HoraInicio, HoraFinal, PeriodoAcademico, Sistema) VALUES (@FechaInicio, @FechaFinal,@HoraInicio, @HoraFinal, @PeriodoAcademico, @Sistema)",
    getCancelacion: "select * from [dbo].[planificacion_cancelacionesexcepcionales] WHERE Sistema='Trimestral' Order by FechaInicio",
    getCancelacionSemestral: "select * from [dbo].[planificacion_cancelacionesexcepcionales] WHERE Sistema='Semestral' Order by FechaInicio",
    getFechaNotas: "select * from [dbo].[planificacion_ingresonotas] WHERE Sistema='Trimestral' Order by FechaInicio",
    getFechaNotasSemestral: "select * from [dbo].[planificacion_ingresonotas] WHERE Sistema='Semestral' Order by FechaInicio",
    getIPACMatricula: "select * from [dbo].[planificacion_matricula] where PeriodoAcademico ='1PAC'",
    getIIPACMatricula: "select * from [dbo].[planificacion_matricula] where PeriodoAcademico ='2PAC'",
    getIIIPACMatricula: "select * from [dbo].[planificacion_matricula] where PeriodoAcademico ='3PAC'",
    getIPACPlanificacion: "select * from [dbo].[planificacion_academica] where PeriodoAcademico = '1PAC' AND Sistema='Trimestral'",
    getIIPACPlanificacion: "select * from [dbo].[planificacion_academica] where PeriodoAcademico = '2PAC' AND Sistema='Trimestral'",
    getIIIPACPlanificacion: "select * from [dbo].[planificacion_academica] where PeriodoAcademico = '3PAC' AND Sistema='Trimestral'",
    getIPACPlanificacionSemestral: "select * from [dbo].[planificacion_academica] where PeriodoAcademico = '1PAC' AND Sistema='Semestral'",
    getIIPACPlanificacionSemestral: "select * from [dbo].[planificacion_academica] where PeriodoAcademico = '2PAC' AND Sistema='Semestral'",

    getClasesCursando: `select 
    cs.IdClase as CODIGO, cs.Nombre as ASIGNATURA, cs.uv as UV, s.seccion AS SECCION,
    s.Edificio AS EDIFICIO,s.Aula AS AULA,s.HI AS HORA_INICIO,s.HF AS HORA_FINAL,s.obs AS OBS, 
    year(re.Fecha) AS Año, Periodo AS PERIODO, s.Dias, s.IdSeccion AS IDSECCION, re.Nota, s.IdDocente 
    from registro_estudiante_clases re INNER JOIN estudiantes e on IdEstudiante = NumCuenta 
    INNER join secciones s on re.IdSeccion = s.IdSeccion INNER join clases cs on cs.IdClase = s.IdClase 
    where e.numCuenta=@NumCuenta and Periodo = @Periodo and year(re.Fecha) = @año and EstadoMatricula='MATRICULADO'`,

    getClasesEnListaDeEspera: "select cs.IdClase as CODIGO, cs.Nombre as ASIGNATURA, cs.uv as UV, s.seccion AS SECCION,s.Edificio AS EDIFICIO,s.Aula AS AULA,s.HI AS HORA_INICIO,s.HF AS HORA_FINAL,s.obs AS OBS, year(re.Fecha) AS Año, Periodo AS PERIODO, s.Dias from registro_estudiante_clases re INNER JOIN estudiantes e on IdEstudiante = NumCuenta INNER join secciones s on re.IdSeccion = s.IdSeccion INNER join clases cs on cs.IdClase = s.IdClase where e.numCuenta=@NumCuenta and Periodo = @Periodo and year(re.Fecha) = @año and EstadoMatricula='EN ESPERA'",

    insertPDF: "update [dbo].[registro_cancelaciones_excepcionales] set Documento=@pdfPath where NumCuenta=@Id",
    insertSoliCancel: "Insert into [dbo].[registro_cancelaciones_excepcionales] (IdClase, Asignatura, UV, Seccion, Año, Periodo, Estado, Descripcion, NumCuenta) values(@idClase, @asignatura, @uv,  @seccion,@año, @periodo, @estado, @descripcion, @Id)",
    getCancelaciones: "select IdClase AS CODIGO,Asignatura AS ASIGNATURA,UV AS UV,Seccion AS SECCION,Periodo AS PERIODO,Estado AS ESTADO from [dbo].[registro_cancelaciones_excepcionales] WHERE NumCuenta =  @NumCuenta And Periodo = @Periodo",
    getPerfilEstudianteFormaAdmin: "select e.Nombre,e.Apellido,pe.Imagen1,e.IndiceGlobal,e.IndicePeriodo, e.Carrera, e.CentroRegional from [dbo].[perfil_estudiante] as pe INNER JOIN [dbo].[estudiantes] e on e.NumCuenta = pe.IdPerfil where e.NumCuenta = @NumCuenta",

    geSoliCancelacionesCoordinador: "SELECT DISTINCT rce.NumCuenta, rce.Descripcion, rce.Estado, e.Nombre, e.Apellido, e.IndiceGlobal, e.IndicePeriodo, e.CorreoInstitucional, pe.Imagen1 , e.Carrera, e.CentroRegional FROM [dbo].[registro_cancelaciones_excepcionales] AS rce INNER JOIN [dbo].[estudiantes] e ON e.NumCuenta = rce.NumCuenta INNER JOIN [dbo].[perfil_estudiante] pe ON pe.IdPerfil = e.NumCuenta WHERE rce.Estado = 'Pendiente' And e.Carrera = @carrera And e.CentroRegional = @CentroRegional",

    getSoliCambioDeCarreraCoordi: "SELECT DISTINCT sc.NumCuenta, sc.RazonDeCambio, sc.Estado,sc.Dictamen, e.Nombre, e.Apellido, e.IndiceGlobal, e.IndicePeriodo, pe.Imagen1, sc.Carrera, sc.CarreraDeCambio, sc.CentroRegional, e.CorreoInstitucional, sc.IdSolicitud, e.PuntajePAA, e.PuntajePAM, e.PuntajePCCNS FROM [dbo].[solicitud_cambiocarrera] AS sc INNER JOIN [dbo].[estudiantes] e ON e.NumCuenta = sc.NumCuenta INNER JOIN [dbo].[perfil_estudiante] pe ON pe.IdPerfil = e.NumCuenta WHERE sc.Estado = 'PAGADO' AND sc.CarreraDeCambio= @carreraCambio AND sc.CentroRegional=@CentroRegional AND sc.Dictamen='EN ESPERA'",
    getPdfSolicitud: "select DISTINCT Documento from [dbo].[registro_cancelaciones_excepcionales] where NumCuenta = @NumCuenta",

    getSoliCancelacionesCount: "SELECT COUNT(DISTINCT NumCuenta) AS total_filas FROM registro_cancelaciones_excepcionales;",
    getClasesSolicitud: "select rce.IdClase, rce.Asignatura, rce.UV, rce.Seccion, rce.Periodo,rce.Estado, rce.NumCuenta,pe.Imagen1 from [dbo].[registro_cancelaciones_excepcionales] as rce inner join [dbo].[estudiantes] e on e.NumCuenta = rce.NumCuenta INNER JOIN [dbo].[perfil_estudiante] pe on pe.IdPerfil = e.NumCuenta where rce.Estado = 'Pendiente' And rce.NumCuenta = @NumCuenta",

    UpdateEstadoCancel: "UPDATE [dbo].[registro_cancelaciones_excepcionales] SET Estado = '@estado' WHERE NumCuenta = @numCuenta AND IdClase = '@idClase'",
    EliminarClaseExcep: "DELETE FROM registro_estudiante_clases WHERE EXISTS (SELECT 1 FROM estudiantes e INNER JOIN secciones s ON registro_estudiante_clases.IdSeccion = s.IdSeccion INNER JOIN clases cs ON cs.IdClase = s.IdClase WHERE e.numCuenta = @numCuenta AND Periodo = @periodo AND YEAR(registro_estudiante_clases.Fecha) = @año AND cs.IdClase = @idClase AND registro_estudiante_clases.IdEstudiante = e.NumCuenta);",

    getCarreras: "SELECT IdCarrera, NombreCarrera, Sistema from [dbo].[carrera]",
    getCarrerasSistema: "select * from carrera c where c.deptosprestados like '%@carrera%' OR c.deptosprestados = 'TODOS'",
    getInfoEstudent: "select * from [dbo].[estudiantes] where NumCuenta = @NumCuenta",
    getSoliEstu: "select * from [dbo].[solicitud_cambiocarrera] where NumCuenta = @NumCuenta",
    insertSolicitudCambioCarrera: "insert into [dbo].[solicitud_cambiocarrera] (NumCuenta, Nombre, Apellido, Carrera, CentroRegional, IndiceGlobal, PuntajePAA, CarreraDeCambio, RazonDeCambio, FechaSolicitud, Dictamen) values (@NumCuenta, @Nombre, @Apellido, @Carrera, @CentroRegional, @IndiceGlobal, @PuntajePAA, @CarreraDeCambio, @RazonDeCambio, @FechaSolicitud, @Dictamen)",
    UpdateEstadoCambioCarrera: "UPDATE [dbo].[solicitud_cambiocarrera] SET Dictamen =  '@dictamen', JustificacionCoordi = '@justificacion' WHERE NumCuenta = @numCuenta AND IdSolicitud = @idSolicitud",
    updateCambioCarreraEstudiante: "UPDATE [dbo].[estudiantes] SET Carrera = @CarreraCambio WHERE NumCuenta = @numCuenta",
    UpdateEstadoCambioCarrera: "UPDATE [dbo].[solicitud_cambiocarrera] SET Dictamen =  '@dictamen', JustificacionCoordi = '@justificacion' WHERE NumCuenta = @numCuenta AND IdSolicitud = @idSolicitud",

    getCambioCentroSoli: "select * from [dbo].[solicitud_cambiocentro] where NumCuenta=@NumCuenta",

    getCentrosRegionales: "select NombreCentro, Centro from [dbo].[centro_regionales]",

    updateCentroNuevo: "update [dbo].[solicitud_cambiocentro] set CentroNuevo='@Centro' where NumCuenta=numCuenta AND IdSolicitud=idSolicitud",

    getAsignaturasDepartamento: "SELECT c.*FROM clases c WHERE c.Departamento = @Departamento AND NOT EXISTS ( SELECT 1 FROM registro_estudiante_clases rec JOIN secciones s ON rec.IdSeccion = s.IdSeccion WHERE rec.IdEstudiante = '@Numcuenta' AND s.IdClase = c.IdClase) AND NOT EXISTS ( SELECT 1 FROM clases requisitos WHERE c.Requisitos LIKE '%' + requisitos.IdClase + '%' AND NOT EXISTS ( SELECT 1 FROM registro_estudiante_clases rec_req JOIN secciones s_req ON rec_req.IdSeccion = s_req.IdSeccion WHERE rec_req.IdEstudiante = '@Numcuenta' AND s_req.IdClase = requisitos.IdClase AND rec_req.EstadoClase = 'APR' ));",
};

export const queryStudentHistory = {
    getStudentHistory: "select cs.IdClase as CODIGO, cs.Nombre as ASIGNATURA, cs.uv as UV, s.seccion AS SECCION,  year(re.Fecha) AS Año, Periodo AS PERIODO, nota AS CALIFIACION, EstadoClase AS OBS  from registro_estudiante_clases re INNER JOIN estudiantes e on IdEstudiante = NumCuenta INNER join secciones s on re.IdSeccion = s.IdSeccion INNER join clases cs on cs.IdClase = s.IdClase  where e.numCuenta = @NumCuenta and EstadoClase is not null ",
    getHistorial: "select cs.IdClase as CODIGO, cs.Nombre as ASIGNATURA, cs.uv as UV, s.seccion AS SECCION,  year(re.Fecha) AS Año, Periodo AS PERIODO, nota AS CALIFIACION, EstadoClase AS OBS  from registro_estudiante_clases re INNER JOIN estudiantes e on IdEstudiante = NumCuenta INNER join secciones s on re.IdSeccion = s.IdSeccion INNER join clases cs on cs.IdClase = s.IdClase",
    getStudentForHistory: "select NumCuenta, Nombre, Apellido, Carrera, CentroRegional, IndiceGlobal from estudiantes where NumCuenta=@NumCuenta"
}

export const querysADMIN = {
    DeletePlanificacion: 'delete planificacion_academica where idPlanificacion = @idPlanificacion',
    DeleteMatricula: 'delete planificacion_matricula where idPlanificacion = @idPlanificacion',
    DeleteFechaNotas: 'delete planificacion_ingresonotas where idPlanificacion = @idPlanificacion',
    DeleteCancelacionesExcepcionales: 'delete planificacion_cancelacionesexcepcionales where idPlanificacion = @idPlanificacion',
    getPeriodoActual: 'select PeriodoAcademico from planificacion_academica where GETDATE() BETWEEN FechaInicio and FechaFinal and Sistema = @Sistema',
    sendEmail: `select 
    s.IdSeccion, e.NumCuenta, e.Nombre + ' ' + e.Apellido 'Estudiante', e.CorreoInstitucional, c.idclase, c.nombre 'Asignatura', s.Seccion, s.Periodo from secciones s inner join registro_estudiante_clases res
    on res.IdSeccion = s.IdSeccion inner join estudiantes e on e.NumCuenta = res.IdEstudiante inner join clases c on c.IdClase = s.IdClase
    where s.IdSeccion = @IdSeccion`,
    pagoSimulado: `update estudiantes_pagos set estado = 'PAGADO'`,
    getJefeExistente: `SELECT CAST(CASE
        WHEN EXISTS (
            SELECT 1
            FROM empleados
            WHERE subrol = 'Jefe departamento'
            AND carrera = @Carrera
            AND centroregional = @CentroRegional
        ) THEN 1
        ELSE 0
    END AS BIT) AS existe_empleado;`,
    getCoordiExistente: `SELECT CASE
    WHEN (SELECT COUNT(*)
          FROM empleados
          WHERE subrol = 'Coordinador'
          AND centroregional = @CentroRegional
          AND carrera = @Carrera) < 2
    THEN 1
    ELSE 0
END AS existencia;
`

}

export const queryEstudiante = {
    getState: 'select * from estudiantes_pagos where NumCuenta = @numCuenta',
    postSolicitudReposicion: 'insert into solicitudes_pagoreposicion (NumCuenta, Justificacion, FechaSolicitud, Periodo) values (@NumCuenta, @Justificacion, GETDATE(), @Periodo)',
    getExistenciaSolicitudReposicion: 'select * from solicitudes_pagoreposicion where NumCuenta = @NumCuenta and Periodo = @Periodo and year(FechaSolicitud) = year(GETDATE())',
    insertEvaluaciones: ` insert into evaluaciones_docentes (idseccion, FechaEvaluacion, iddocente, IdEstudiante, pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, Observacion) values (
        @IdSeccion, getdate(), @IdDocente, @IdEstudiante, @Pregunta1, @Pregunta2, @Pregunta3, @Pregunta4, @Pregunta5, @Observacion
    )`,
    getNotas: `select res.nota, res.EstadoClase
    from registro_estudiante_clases res
    inner join secciones s on s.idseccion = res.idseccion
    where res.IdEstudiante = @IdEstudiante and s.idseccion = @IdSeccion`,
    getEvaluacionExistente: `SELECT CASE WHEN EXISTS (
        SELECT 1
        FROM evaluaciones_docentes
        WHERE IdEstudiante = @IdEstudiante
          AND IdSeccion = @IdSeccion
          AND IdDocente = @IdDocente
    ) THEN 1 ELSE 0 END AS ExisteEvaluacion;
    `
}

export const queryDocente = {
    getClasesAsignadas: `select 
    c.IdClase, c.Nombre, Seccion, HI, HF, IdDocente, Dias, Periodo, year(Fecha) Año
    from secciones s inner join clases c on c.IdClase = s.IdClase 
    where cast(IdDocente as varchar) = @NumEmpleado AND periodo = @Periodo`,
    getPerfilSeccion: `select s.idseccion, e.numempleado, e.nombre, e.apellido, numerotelefono, e.correoinstitucional, e.centroregional, e.carrera, e.correopersonal, pe.imagen1, pe.video, pe.descripcion from secciones s inner join empleados e on e.NumEmpleado = s.IdDocente left join perfil_empleados pe on pe.idperfil = s.iddocente 
    where s.idseccion = @IdSeccion`,
    updateNotaEstudiante: `update registro_estudiante_clases set Nota = round(@Nota, 0), EstadoClase = @EstadoClase where IdSeccion = @IdSeccion and IdEstudiante = @IdEstudiante `,
    getIngresoNotas: `select * from planificacion_ingresonotas where Sistema = @Sistema and GETDATE() BETWEEN FechaInicio and FechaFinal`,
    getEstudiantesSeccion: `select 
    s.idseccion, s.seccion 'Seccion', c.idclase 'Codigo', c.nombre 'Asignatura', e.NumCuenta, e.Nombre + ' ' + e.apellido 'Estudiante', e.CorreoInstitucional, e.CorreoPersonal,s.periodo 'Periodo', year(s.fecha) 'Año' 
    from secciones s 
    inner join clases c on c.IdClase = s.IdClase
    inner join registro_estudiante_clases res on res.idseccion = s.IdSeccion 
    inner join estudiantes e on e.numcuenta = res.IdEstudiante
    where s.IdSeccion = @IdSeccion and res.EstadoMatricula = 'MATRICULADO'`
}

export const queryJefe = {
    getEvaluaciones: `select
    s.idseccion, c.nombre 'Asignatura', s.Periodo, s.IdDocente, e.Nombre, e.Apellido, e.CorreoInstitucional,    ed.IdEstudiante, ed.Pregunta1, ed.Pregunta2, ed.Pregunta3, ed.Pregunta4, ed.Pregunta5, ed.Observacion
    from evaluaciones_docentes ed
        inner join empleados e on ed.iddocente = e.numempleado
        inner join secciones s on s.idseccion = ed.idseccion
        inner join clases c on c.idclase = s.idclase
    where s.iddocente = @IdDocente and s.periodo = @Periodo`,
    getDocenteDepartamento: `select NumEmpleado, DNI, Nombre, Apellido, NumeroTelefono, CorreoInstitucional, Carrera, Sistema from empleados where rol = 'Docente' and carrera = @Carrera and centroregional = @CentroRegional and Estado = 'ACTIVO'`,
    getNotas: `select
    c.IdClase, c.Nombre 'Asignatura', s.Seccion, s.Periodo,
    es.NumCuenta, es.Nombre + ' ' + es.Apellido 'Estudiante', res.nota, res.EstadoClase, res.IdSeccion
    from registro_estudiante_clases res
    inner join secciones s on s.IdSeccion = res.IdSeccion
    inner join clases c on c.IdClase = s.IdClase
    inner join empleados e on s.IdDocente = e.NumEmpleado
    inner join estudiantes es on es.NumCuenta = res.IdEstudiante
    inner join planificacion_academica pa on pa.PeriodoAcademico = s.Periodo
    where GETDATE() BETWEEN pa.FechaInicio and pa.FechaFinal and e.carrera = @Carrera and pa.Sistema = @Sistema and s.IdDocente = @IdDocente and s.IdSeccion = @IdSeccion`,
    getSeccionesNotas: `select 
    s.IdSeccion, s.IdDocente, c.IdClase, c.Nombre 'Asignatura', s.Seccion, s.Periodo, res.IdEstudiante, res.Nota, res.EstadoClase  from registro_estudiante_clases res inner join secciones s on s.IdSeccion = res.IdSeccion inner join clases c on c.idclase = s.IdClase where s.Periodo = @Periodo and YEAR(s.Fecha) = YEAR(GETDATE()) and s.iddocente =  @IdDocente`,
    getSeccionEstudiantes: `select 
    s.IdSeccion, s.IdDocente, c.IdClase, c.Nombre 'Asignatura',
    s.Seccion, s.Periodo, res.IdEstudiante, e.nombre 'Estudiante', e.Apellido, e.CorreoInstitucional, res.Nota, res.EstadoClase from registro_estudiante_clases res inner join secciones s on s.IdSeccion = res.IdSeccion inner join clases c on c.idclase = s.IdClase  inner join estudiantes e on e.numcuenta = res.IdEstudiante where s.Periodo = @Periodo and YEAR(s.Fecha) = YEAR(GETDATE()) and s.iddocente =  @IdDocente and EstadoMatricula = 'MATRICULADO'`
}
