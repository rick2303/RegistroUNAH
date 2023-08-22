import { getConnection, sql, queries } from "../Database";
import fs from "fs";
import path from "path";
import pdfMake from "pdfmake/build/pdfmake";
const Excel = require('exceljs');
import pdfFonts from "pdfmake/build/vfs_fonts";
const bwipjs = require('bwip-js');

export const cargaAcademicaPDF = async (req, res) => {
  const { Departamento, CentroRegional, Sistema } = req.body;

  try {
    const pool = await getConnection();
    const sistema = await pool.request()
      .input("Sistema", sql.VarChar, Sistema)
      .query(queries.PeriodoSeccionesCarga)

    const sistema2 = sistema.recordset

    console.log(sistema.recordset)



    const nuevoPeriodoAcademicoValue = sistema2[0]?.NuevoPeriodoAcademico;

    const carga = await pool.request()
      .input("Departamento", sql.VarChar, Departamento)
      .input("CentroRegional", sql.VarChar, CentroRegional)
      .query(`select 
            sc.IdClase,cl.Nombre,Edificio,sc.Aula,sc.Cupos,sc.HI,sc.HF,sc.Seccion,sc.IdDocente, sc.CentroRegional, 
            concat(emp.Nombre,' ', emp.Apellido) as NombreDocente, sc.Dias
            from secciones as sc
            right join clases as cl on sc.IdClase=cl.IdClase
            right join empleados as emp on sc.IdDocente=NumEmpleado 
            where Departamento=@Departamento And sc.CentroRegional=@CentroRegional and periodo = '${sistema2[0].NuevoPeriodoAcademico}'`);

    console.log(Sistema);
    const data = carga.recordset;
    const combinedData = data.map((item) => ({
      ...item,
      NuevoPeriodoAcademico: nuevoPeriodoAcademicoValue,
    }));

    const imagePath = path.join(__dirname, '../img/UNAH-escudo.png');

    // Lee la imagen como un archivo de bytes
    const imageBytes = fs.readFileSync(imagePath);

    // Convierte los bytes de la imagen a base64
    const base64Image = imageBytes.toString('base64');

    const docDefinition = {
      pageOrientation: 'landscape',

      footer: function (currentPage, pageCount) {
        return {
          columns: [
            {
              text: 'Página ' + currentPage.toString() + ' de ' + pageCount + '  ',
              alignment: 'center',
            },
          ],
        };
      },
      content: [
        {
          columns: [
            {
              image: `data:image/png;base64,${base64Image}`,
              width: 45,
              height: 65,
              alignment: 'left',
            },
            {
              stack: [
                { text: 'UNIVERSIDAD NACIONAL AUTÓNOMA DE HONDURAS', style: 'header', alignment: 'center' },
                { text: `DEPARTAMENTO DE ${Departamento.toUpperCase()}`, style: 'subheader', alignment: 'center' },
                { text: `CARGA ACADÉMICA ${sistema2[0]?.NuevoPeriodoAcademico} ${sistema2[0].Anio}`, style: 'subheader', alignment: 'center' },
              ],
              alignment: 'center',
              width: '*',
            },
          ],
        },
        '\n',
        {
          table: {
            widths: ['7%', '18%', '*', '*', '*', '7%', '7%', '*', '7%', '7%', '20%'],
            body: [
              // Encabezados de la  tabla
              [
                { text: 'Código clase', style: 'tableHeader', alignment: 'center' },
                { text: 'Nombre clase', style: 'tableHeader', alignment: 'center' },
                { text: 'Edificio', style: 'tableHeader', alignment: 'center' },
                { text: 'Aula', style: 'tableHeader', alignment: 'center' },
                { text: 'Cupos', style: 'tableHeader', alignment: 'center' },
                { text: 'Hora inicial', style: 'tableHeader', alignment: 'center' },
                { text: 'Hora final', style: 'tableHeader', alignment: 'center' },
                { text: 'Sección', style: 'tableHeader', alignment: 'center' },
                { text: 'Días', style: 'tableHeader', alignment: 'center' },
                { text: 'Número empleado', style: 'tableHeader', alignment: 'center' },
                { text: 'Docente', style: 'tableHeader', alignment: 'center' },
              ],
              // Datos de la tabla 
              ...combinedData.map((item) => [
                { text: item.IdClase, alignment: 'center' },
                { text: item.Nombre, alignment: 'center' },
                { text: item.Edificio, alignment: 'center' },
                { text: item.Aula, alignment: 'center' },
                { text: item.Cupos ?? 'N/A', alignment: 'center' },
                { text: item.HI, alignment: 'center' },
                { text: item.HF, alignment: 'center' },
                { text: item.Seccion, alignment: 'center' },
                { text: item.Dias, alignment: 'center' },
                { text: item.IdDocente, alignment: 'center' },
                { text: item.NombreDocente, alignment: 'center' },
              ]),

            ],
            pageBreak: 'auto'
          },
          layout: {
            alignment: 'center',
          },
        },

      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 5, 0, 0],
        },
      },
    };
    const pdfDoc = pdfMake.createPdf(docDefinition);

    const pdfBuffer = await new Promise((resolve, reject) => {
      pdfDoc.getBuffer((buffer) => {
        resolve(buffer);
      });
    });

    // Definir el nombre y la ruta del archivo
    const fileName = `Carga_académica_${Departamento}.pdf`;
    const filePath = path.join(__dirname, "../pdfs", fileName);

    // Guardar el PDF en el sistema de archivos
    fs.writeFileSync(filePath, pdfBuffer);

    // Descargar el PDF
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Error al descargar el PDF:", err);
      }

      // Eliminar el archivo del sistema de archivos después de descargarlo
      fs.unlinkSync(filePath);
    });

  } catch (error) {
    console.error('Error al generar el PDF:', error);
    res.status(500).json({ message: 'Error al generar el PDF.' });
  }
};



export const cargaAcademicaEXCEL = async (req, res) => {
  const { Departamento, CentroRegional, Sistema } = req.body;

  try {
    const pool = await getConnection();
    const sistema = await pool.request()
      .input("Sistema", sql.VarChar, Sistema)
      .query(queries.PeriodoSeccionesCarga)

    const sistema2 = sistema.recordset

    const carga = await pool
      .request()
      .input('Departamento', sql.VarChar, Departamento)
      .input('CentroRegional', sql.VarChar, CentroRegional)
      .query(`select 
      sc.IdClase,cl.Nombre,Edificio,sc.Aula,sc.Cupos,sc.HI,sc.HF,sc.Seccion,sc.IdDocente, sc.CentroRegional, 
      concat(emp.Nombre,' ', emp.Apellido) as NombreDocente, sc.Dias
      from secciones as sc
      right join clases as cl on sc.IdClase=cl.IdClase
      right join empleados as emp on sc.IdDocente=NumEmpleado 
      where Departamento=@Departamento And sc.CentroRegional=@CentroRegional and periodo = '${sistema2[0].NuevoPeriodoAcademico}'`);

    const data = carga.recordset;



    // Crear el Excel
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Carga Académica');


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
    worksheet.getCell('J6').value = 'Nùmero empleado';
    worksheet.getCell('K6').value = 'Docente';

    // Definir los encabezados de columna
    worksheet.columns = [
      { header: 'Código Clase', key: 'CodigoClase', width: 15 },
      { header: 'Nombre Clase', key: 'NombreClase', width: 40 },
      { header: 'Edificio', key: 'Edificio', width: 15 },
      { header: 'Aula', key: 'Aula', width: 15 },
      { header: 'Cupos', key: 'Cupos', width: 10 },
      { header: 'Hora Inicial', key: 'HoraInicial', width: 15 },
      { header: 'Hora Final', key: 'HoraFinal', width: 15 },
      { header: 'Sección', key: 'Seccion', width: 10 },
      { header: 'Días', key: 'Dias', width: 15 },
      { header: '', key: 'NumeroEmpleado', width: 20 },
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
        Cupos: item.Cupos ?? 'N/A',
        HoraInicial: item.HI,
        HoraFinal: item.HF,
        Seccion: item.Seccion,
        Dias: item.Dias,
        NumeroEmpleado: item.IdDocente,
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
