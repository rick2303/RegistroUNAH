import { getConnection, sql, queryStudentHistory } from "../Database";
import fs from "fs";
import path from "path";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { createWriteStream } from 'fs';
const bwipjs = require('bwip-js');


// Registrar las fuentes de PDFMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const historialAcademico = async (req, res) => {
  const { NumCuenta } = req.body;
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("NumCuenta", sql.VarChar, NumCuenta)
    .query(queryStudentHistory.getStudentHistory);
    res.json(result.recordset);

};

export const historialPDF = async (req, res) => {
  const { NumCuenta } = req.body;
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("NumCuenta", sql.VarChar, NumCuenta)
    .query(queryStudentHistory.getStudentHistory);

  const student = await pool
    .request()
    .input("NumCuenta", sql.VarChar, NumCuenta)
    .query(queryStudentHistory.getStudentForHistory);

  const Numcuenta = student.recordset[0].NumCuenta;
  const Nombre = student.recordset[0].Nombre;
  const Apellido = student.recordset[0].Apellido;
  const Carrera = student.recordset[0].Carrera;
  const CentroRegional = student.recordset[0].CentroRegional;
  const IndiceGlobal = student.recordset[0].IndiceGlobal;
  console.log(student.recordset[0]);

  // Obtener los años únicos presentes en el recordset
  const years = [...new Set(result.recordset.map((registro) => registro.Año))];
  years.sort((a, b) => a - b);

  // Crear el documento PDF
  const docDefinition = {
    footer: 
    function(currentPage, pageCount) {
      return {
        columns: [
          {
            text: `"La Educación es la Primera Necesidad de la Republica"`,
            alignment: 'center',
            width:"86%"
          },
          {
            text: 'Página ' +currentPage.toString() + ' de ' + pageCount+"  ",
            alignment: 'center',
          }
        ]
      };
    },
    content: [
      { text: "Universidad Nacional Autónoma de Honduras", style: "title", alignment: "center" },
      "\n",
      { text: "Dirección de Ingresos Permanencia y Promoción", style: "subheader", alignment: "center" },
      "\n",
      { text: "Historial Académico", style: "subheader", alignment: "center" },
      "\n",
      {
        alignment: "left",
        layout: { defaultBorder: false },
        table: {
          widths: ["50%", "50%"],
          body: [
            [{ text: "Cuenta: " + Numcuenta, fillColor: "#CCCCCC" },
             { text: "Carrera Actual: " + Carrera, fillColor: "#CCCCCC" }
            ],
            [{ text: "Nombre: " + Nombre, fillColor: "#CCCCCC" },
            { text: "Centro: " + CentroRegional, fillColor: "#CCCCCC" }
            ],
            [{ text: "Apellido: " + Apellido, fillColor: "#CCCCCC" },
             { text: "Indice: " + IndiceGlobal + "%", fillColor: "#CCCCCC" }
            ],
          ],
        },
      },
      "\n",
      { text: Carrera.toString().toUpperCase(), style: "header", alignment: "center"},
      "\n",
      
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      subheader: {
        fontSize: 14,
        bold: false,
      },
      subtitle: {
        fontSize: 16,
        bold: true,
      },
      title: {
        fontSize: 20,
        bold: true,
      },
    },
  };

  // Agregar la tabla de cada año al documento PDF
  years.forEach((year) => {
    const classesOfYear = result.recordset.filter((registro) => registro.Año === year);
    const tableData = [];

    let sumUVxNota = 0;
    let sumUV = 0;

    // Agregar las filas de la tabla y calcular las sumas
    classesOfYear.forEach((clase) => {
      if (clase.CALIFIACION !== null) {
        const uv = clase.UV;
        const nota = clase.CALIFIACION;
        const uvxnota = uv * nota;

        sumUVxNota += uvxnota;
        sumUV += uv;

        tableData.push([
          clase.CODIGO,
          clase.ASIGNATURA,
          uv,
          clase.PERIODO.replace(/[^\d]/g, ''),
          clase.CALIFIACION,
          clase.OBS,
          
        ]);
      }
    });

    // Agregar el año antes de la tabla
    docDefinition.content.push({ text: `---------------------------------------      ${year}       --------------------------------------`, style: "subtitle", alignment: "center", width: "100%" });

    // Crear tabla para los datos del año actual
    const table = {
      headerRows: 1,
      widths: ["auto", "50%", "auto", "auto", "auto", "auto"],
      body: [[
      { text: 'CODIGO', style: 'subtitle' },
      { text: 'NOMBRE', style: 'subtitle' },
      { text: 'UV', style: 'subtitle' },
      { text: 'PERIODO', style: 'subtitle' },
      { text: 'NOTA', style: 'subtitle' },
      { text: 'OBS', style: 'subtitle' },], ...tableData].map((clase) => [
        clase[0],
        clase[1],
        { text: clase[2], alignment: 'center' }, // Centrar contenido
        { text: clase[3], alignment: 'center' }, // Centrar contenido
        { text: clase[4], alignment: 'center' }, // Centrar contenido
        { text: clase[5], alignment: 'center' }, // Centrar contenido
      ]),
      style: "table",
    };

        // Filtrar las clases con OBS "APR" del año actual
    const classesAPR = classesOfYear.filter((clase) => clase.OBS === "APR");

    // Obtener la cantidad de clases con OBS "APR"
    const countAPR = classesAPR.length;

    // Agregar la cantidad al documento PDF
    docDefinition.content.push({ layout: { defaultBorder: false }, table });

    // Agregar la cantidad de clases con OBS "APR" al final de la tabla
    docDefinition.content.push(
      "\n",{ text: `Total Aprobadas:      ${countAPR}`, style: "subheader", alignment: "left", bold: true},
      "\n"
    );
    docDefinition.content.push({ layout: { defaultBorder: false }, table });

    // Agregar salto de página entre las tablas de años
    docDefinition.content.push("\n\n");
  });

  // Calcular la suma de UV * Nota y la suma de UV
  const sumUVxNotaTotal = result.recordset.reduce((total, clase) => {
    if (clase.CALIFIACION !== null) {
      return total + clase.UV * clase.CALIFIACION;
    }
    return total;
  }, 0);

  const sumUVTotal = result.recordset.reduce((total, clase) => {
    if (clase.CALIFIACION !== null) {
      return total + clase.UV;
    }
    return total;
  }, 0);

  const barcode = await generateBarcode(Numcuenta);

  // Agregar la suma de UV * Nota y la suma de UV al final del PDF
  docDefinition.content.push(
    { text: `-------------------------------------Ultima linea--------------------------------------`, style: "subtitle", alignment: "center", width: "100%" },
    "\n",
    { text: 'Cálculo del índice académico:', style: "subtitle", alignment: "left" },
    { text: `Suma UV x Nota: ${sumUVxNotaTotal}`, style: "subheader", alignment: "left" },
    { text: `Suma de UV: ${sumUVTotal}`, style: "subheader", alignment: "left" },
    { text: `Indice académico: ${sumUVxNotaTotal}/${sumUVTotal} = ${parseInt(sumUVxNotaTotal/sumUVTotal)}%`, style: "subheader", alignment: "left" },
    "\n",
    { image: `data:image/png;base64,${barcode}`, width: 150, alignment: "left" }

  );

  const pdfDoc = pdfMake.createPdf(docDefinition);

  const pdfBuffer = await new Promise((resolve, reject) => {
    pdfDoc.getBuffer((buffer) => {
      resolve(buffer);
    });
  });

  // Definir el nombre y la ruta del archivo
  const fileName = "HistorialOficial.pdf";
  const filePath = path.join(__dirname, "../pdfs", fileName);

  // Guardar el PDF en el sistema de archivos
  fs.writeFileSync(filePath, pdfBuffer);

  // Descargar el PDF en el cliente
  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error("Error al descargar el PDF:", err);
    }

    // Eliminar el archivo del sistema de archivos después de descargarlo
    fs.unlinkSync(filePath);
  });
};

function generateBarcode(text) {
  return new Promise((resolve, reject) => {
    bwipjs.toBuffer({
      bcid: 'code128', // Tipo de código de barras a generar
      text: text, // Texto o número a codificar
      scale: 3, // Escala del código de barras
      height: 8, // Altura del código de barras
      includetext: false, // Incluir el texto en el código de barras
      textxalign: 'center', // Alineación horizontal del texto
    }, (err, png) => {
      if (err) {
        reject(err);
      } else {
        const base64String = png.toString('base64');
        resolve(base64String);
      }
    });
  });
}
