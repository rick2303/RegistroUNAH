import { Router } from 'express';
import { getConnection, querys, sql } from "../Database";

const routerSecciones = Router();

routerSecciones.post('/secciones', async (req, res) => {
    const { Departamento, CentroRegional } = req.body;
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('departamento', sql.VarChar, Departamento)
        .input('centroRegional', sql.VarChar, CentroRegional)
        .query(`
            select s.IdClase, s.Edificio, s.Aula, s.CantidadAlumnos, s.HI, s.HF, s.Seccion, s.Periodo, s.Obs, s.Dias, s.Cupos, c.Departamento, s.CentroRegional, (e.Nombre + e.Apellido) as Nombre, c.Nombre AS Clase
            from [dbo].[secciones] s
            INNER join [dbo].[empleados] e on e.NumEmpleado = s.IdDocente
            INNER JOIN [dbo].[clases] c on s.IdClase = c.IdClase
            where c.Departamento = @departamento and s.CentroRegional = @centroRegional
        `);

    res.json(result.recordset);
});


routerSecciones.post('/TraerClases', async (req, res) => {
    const { Departamento } = req.body;
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('departamento', sql.VarChar, Departamento)
        .query(`select * from [dbo].[clases] where Departamento = @departamento`);

    res.json(result.recordset);
});

routerSecciones.post('/TraerDocentes', async (req, res) => {
    const { Carrera, CentroRegional } = req.body;
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('carrera', sql.VarChar, Carrera)
        .input('centroRegional', sql.VarChar, CentroRegional)
        .query(`SELECT * FROM [dbo].[empleados] WHERE Carrera = @carrera And CentroRegional = @centroRegional`);

    res.json(result.recordset);
});

export default routerSecciones;