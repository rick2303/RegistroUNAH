import { getConnection, sql} from "../Database";
import path from "path";
const Excel = require('exceljs');
const bwipjs = require('bwip-js');


export const listadoAlumnosEXCEL = async (req, res) => {
    const {Departamento, CentroRegional,Sistema } = req.body;
  
    try {
      const pool = await getConnection();
  
      const carga = await pool
        .request()
        .input('Departamento', sql.VarChar, Departamento)
        .input('CentroRegional', sql.VarChar, CentroRegional)
        .query(queries.CargaAcademica);
  
      const data = carga.recordset;
  
      const sistema = await pool.request()
      .input("Sistema", sql.VarChar,Sistema)
      .query(queries.PeriodoSeccionesCarga)
  
      const sistema2 = sistema.recordset
  
      // Crear el Excel
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet('ListadoEstudiantes');
  
      
      worksheet.getCell('A1').value = '**************************************************************';
      worksheet.getCell('A1').alignment = { horizontal: 'center' };
      worksheet.mergeCells('A1:J1');
  
      worksheet.getCell('A2').value = 'UNIVERSIDAD NACIONAL AUTÓNOMA DE HONDURAS';
      worksheet.getCell('A2').alignment = { horizontal: 'center' };
      worksheet.mergeCells('A2:J2');
  
      worksheet.getCell('A3').value = `DEPARTAMENTO DE ${Departamento.toUpperCase()}`;
      worksheet.getCell('A3').alignment = { horizontal: 'center' };
      worksheet.mergeCells('A3:J3');
  
      worksheet.getCell('A4').value = `CARGA ACADÉMICA ${sistema2[0]?.NuevoPeriodoAcademico} ${sistema2[0].Anio}`;
      worksheet.getCell('A4').alignment = { horizontal: 'center' };
      worksheet.mergeCells('A4:J4');
  
  
      worksheet.getCell('A6').value = 'Código Clase';
      worksheet.getCell('B6').value = 'Nombre Clase';
      worksheet.getCell('C6').value = 'Edificio';
      worksheet.getCell('D6').value = 'Aula';
      worksheet.getCell('E6').value = 'Cupos';
      worksheet.getCell('F6').value = 'Hora Inicial';
      worksheet.getCell('G6').value = 'Hora Final';
      worksheet.getCell('H6').value = 'Sección';
      worksheet.getCell('I6').value = 'Días';
      worksheet.getCell('J6').value = 'Docente';
  
      // Definir los encabezados de columna
      worksheet.columns= [
        { header: 'Código Clase', key: 'CodigoClase', width: 15 },
        { header: 'Nombre Clase', key: 'NombreClase', width: 40 },
        { header: 'Edificio', key: 'Edificio', width: 15 },
        { header: 'Aula', key: 'Aula', width: 15 },
        { header: 'Cupos', key: 'Cupos', width: 10 },
        { header: 'Hora Inicial', key: 'HoraInicial', width: 15 },
        { header: 'Hora Final', key: 'HoraFinal', width: 15 },
        { header: 'Sección', key: 'Seccion', width: 10 },
        { header: 'Días', key: 'Dias', width: 15 },
        { header: '', key: 'Docente', width: 30 },
      ];
      // Agregar los datos a partir de la fila 7
      data.forEach((item, index) => {
        const rowIndex = index + 7;
        worksheet.addRow({
          CodigoClase: item.IdClase,
          NombreClase: item.Nombre,
          Edificio: item.Edificio,
          Aula: item.Aula,
          Cupos: item.CantidadAlumnos ?? 'N/A',
          HoraInicial: item.HI,
          HoraFinal: item.HF,
          Seccion: item.Seccion,
          Dias: item.Dias,
          Docente: item.NombreDocente,
        });
  
        // Ajustar el ancho de las filas automáticamente
        worksheet.getRow(rowIndex).height = 20;
      });
  
      const filename = 'Carga_Academica.xlsx';
  
      // Enviar el archivo Excel como descarga
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  
      // Generar el archivo Excel en un búfer
      const buffer = await workbook.xlsx.writeBuffer();
  
      res.end(buffer);
    } catch (error) {
      console.log('Error en la consulta SQL:', error);
      res.status(500).send('Error en la consulta SQL');
    }
  };
  