import { getConnection, queryDocente, sql } from "../Database";
const Excel = require('exceljs');


export const listadoAlumnosEXCEL = async (req, res) => {
  const { Departamento, IdSeccion } = req.body;
  try {
    const pool = await getConnection();
    const listado = await pool.request()
      .input("IdSeccion", sql.Int, IdSeccion)
      .input('Departamento', sql.VarChar, Departamento)
      .query(queryDocente.getEstudiantesSeccion);

    // Crear el Excel
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(`${listado.recordset[0].Asignatura}`);


    worksheet.getCell('A1').value = '**************************************************************';
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.mergeCells('A1:E1');

    worksheet.getCell('A2').value = 'UNIVERSIDAD NACIONAL AUTÓNOMA DE HONDURAS';
    worksheet.getCell('A2').alignment = { horizontal: 'center' };
    worksheet.mergeCells('A2:E2');

    worksheet.getCell('A3').value = `DEPARTAMENTO DE ${Departamento.toUpperCase()}`;
    worksheet.getCell('A3').alignment = { horizontal: 'center' };
    worksheet.mergeCells('A3:E3');

    worksheet.getCell('A4').value = `LISTADO DE ESTUDIANTES`;
    worksheet.getCell('A4').alignment = { horizontal: 'center' };
    worksheet.mergeCells('A4:E4');

    worksheet.getCell('A5').value = `${listado.recordset[0]?.Codigo} ${listado.recordset[0]?.Asignatura} - ${listado.recordset[0].Periodo} ${listado.recordset[0].Año} ${listado.recordset[0].Seccion}`;
    worksheet.getCell('A5').alignment = { horizontal: 'center' };
    worksheet.mergeCells('A5:E5');

   // worksheet.getCell('A6').value = 'N°';
    worksheet.getCell('A7').value = 'N°';
    worksheet.getCell('B7').value = 'Num Cuenta';
    worksheet.getCell('C7').value = 'Nombre del Estudiante';
    worksheet.getCell('D7').value = 'Correo Institucional';
    worksheet.getCell('E7').value = 'Correo Personal';

    // Definir los encabezados de columna
    worksheet.columns = [
      { header: 'N°', key: 'Numero', width: 4 },
      { header: 'Num Cuenta', key: 'NumCuenta', width: 15 },
      { header: 'Nombre del estudiante', key: 'Estudiante', width: 30 },
      { header: 'Correo Institucional', key: 'CorreoInstitucional', width: 30 },
      { header: '', key: 'CorreoPersonal', width: 30 },
      //{ header: '', key: 'iddocente', width: 30 },

    ];
    // Agregar los datos a partir de la fila 7
    listado.recordset.forEach((item, index) => {
      const rowIndex = index + 7;
      //const index1 = 1
      worksheet.addRow({
        Numero: index+1,
        NumCuenta: item.NumCuenta,
        Estudiante: item.Estudiante,
        CorreoInstitucional: item.CorreoInstitucional,
        CorreoPersonal: item.CorreoPersonal,
        iddocente : item._id,
      });
      // Ajustar el ancho de las filas automáticamente
      worksheet.getRow(rowIndex).height = 30;
    });

    const filename = 'ListadoEstudiante.xlsx';

    // Enviar el archivo Excel como descarga
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

    // Generar el archivo Excel en un búfer
    const buffer = await workbook.xlsx.writeBuffer();

    res.end(buffer);
  } catch (error) {
    res.status(500).send(error.message);
  } 

};
