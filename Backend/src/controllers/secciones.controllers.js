import { getConnection, queries, querys, sql} from "../Database"


export const secciones =  async (req, res) => {
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
}

export const traerClases =  async (req, res) => {
    const { Departamento } = req.body;
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('departamento', sql.VarChar, Departamento)
        .query(`select * from [dbo].[clases] where Departamento = @departamento`);

    res.json(result.recordset);
}

export const traerDocentes= async (req, res) => {
    const { Carrera, CentroRegional } = req.body;
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('carrera', sql.VarChar, Carrera)
        .input('centroRegional', sql.VarChar, CentroRegional)
        .query(`SELECT * FROM [dbo].[empleados] WHERE Carrera = @carrera And CentroRegional = @centroRegional`);

    res.json(result.recordset);
}

export const crearSeccion = async (req, res) => {
    try {
      const { IdClase, Edificio, Aula, HI, Seccion, HF, Periodo, Obs, IdDocente, Dias, Cupos, CentroRegional, ClaseServicio } = req.body;
      const fechaActual = new Date();  // Obtiene la fecha actual del sistema
      const pool = await getConnection();
  
      // Validar si el docente seleccionado ya tiene una sección asignada a los mismos días, hora y periodo
      const validarDocenteSeccionQuery = await pool.request()
        .input("IdDocente", sql.Int, IdDocente)
        .input("Dias", sql.VarChar, Dias)
        .input("HI", sql.VarChar, HI)
        .input("HF", sql.VarChar, HF)
        .input("Periodo", sql.VarChar, Periodo)
        .query(queries.validarDocenteSeccion);
  
      if (validarDocenteSeccionQuery.recordset.length > 0) {
        res.status(400).json({ message: 'El docente seleccionado ya tiene una sección asignada a los mismos días, hora y periodo.' });
        return;
      }
  
      // Validar si ya existe una sección en el mismo aula, hora inicial, días y periodo
      const seccionAulaExistenteQuery = await pool.request()
        .input("Edificio", sql.VarChar, Edificio)
        .input("Aula", sql.VarChar, Aula)
        .input("HI", sql.VarChar, HI)
        .input("Dias", sql.VarChar, Dias)
        .input("Periodo", sql.VarChar, Periodo)
        .query(queries.validarSeccionAulaQuery);
  
      if (seccionAulaExistenteQuery.recordset.length > 0) {
        res.status(400).json({ message: 'Ya existe una sección asignada al mismo aula, hora inicial, días y periodo.' });
        return;
      }
  
      // Validar si la HI es mayor que la HF
      if (parseInt(HI) >= parseInt(HF)) {
        res.status(400).json({ message: 'La HI debe ser menor a la HF.' });
        return;
      }
  
      // Validar si la sección ya existe para la clase, periodo y año seleccionados
      const seccionExistenteQuery = await pool.request()
        .input("IdClase", sql.VarChar, IdClase)
        .input("Seccion", sql.Int, Seccion)
        .input("Periodo", sql.VarChar, Periodo)
        .input("FechaActual", sql.DateTime, fechaActual)
        .query(queries.validarSeccionExistente);
  
      if (seccionExistenteQuery.recordset.length > 0) {
        res.status(400).json({ message: 'La sección ya existe para la clase, periodo y año seleccionados.' });
        return;
      }
  
      const result = await pool.request()
        .input("IdClase", sql.VarChar, IdClase)
        .input("Edificio", sql.VarChar, Edificio)
        .input("Aula", sql.VarChar, Aula)
        .input("HI", sql.VarChar, HI)
        .input("Seccion", sql.Int, Seccion)
        .input("HF", sql.VarChar, HF)
        .input("Periodo", sql.VarChar, Periodo)
        .input("Obs", sql.VarChar, Obs)
        .input("IdDocente", sql.Int, IdDocente)
        .input("Dias", sql.VarChar, Dias)
        .input("Cupos", sql.Int, Cupos)
        .input("CentroRegional", sql.VarChar, CentroRegional)
        .input("ClaseServicio", sql.VarChar, ClaseServicio)
        .input("FechaActual", sql.DateTime, fechaActual)
        .query(queries.insertSeccion);
  
      res.status(200).json({ message: 'Sección creada exitosamente' });
    } catch (error) {
      console.error("Error al crear sección:", error);
      res.status(500).json({ message: 'Error al crear sección' });
    }
  };
  
export const getAulas = async (req, res) => {
    const IdEdificio = req.params.id;

    const pool = await getConnection();
    const result = await pool.request()
        .input("IdEdificio", sql.VarChar, IdEdificio)
        .query(queries.getAulas);

    const aulas = result.recordset.map((aula) => aula.Nombre);

    res.json(aulas);
};