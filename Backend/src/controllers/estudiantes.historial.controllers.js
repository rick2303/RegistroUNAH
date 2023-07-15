import { getConnection, sql, queryStudentHistory } from "../Database";
import fs from "fs";
import path from "path";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { createWriteStream } from 'fs';
import { columns } from "mssql";
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
//
export const historialPDF = async (req, res) => {
  let fecha = new Date();

  function formatoFecha(fecha, formato) {
  	//
  }

  

  
   fecha = fecha.toLocaleDateString()
  const NumCuenta = req.params.id;
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
  let CentroRegional = student.recordset[0].CentroRegional;
  const IndiceGlobal = student.recordset[0].IndiceGlobal;
  if(CentroRegional == 'VS'){
    CentroRegional = 'Valle de Sula'
  }else if(CentroRegional == 'CU'){
    CentroRegional = 'Ciudad Universitaria'
  }
  console.log(student.recordset[0]);
  

  // Obtener los años únicos presentes en el recordset
  const years = [...new Set(result.recordset.map((registro) => registro.Año))];
  years.sort((a, b) => a - b);

  
  const imagePath = path.join(__dirname, '../img/UNAH-escudo.png');

  // Lee la imagen como un archivo de bytes
  const imageBytes = fs.readFileSync(imagePath);
  
  // Convierte los bytes de la imagen a base64
  const base64Image = imageBytes.toString('base64');
  // Crear el documento PDF
  const docDefinition = {
    
    footer: 
    function(currentPage, pageCount) {
      return {
        columns: [
          {
            text:"2673469/nperez",
            width:"20%",
            alignment: 'center',
            margin: [10, 0],
          },
          {
            text: `"La Educación es la Primera Necesidad de la Republica"`,
            alignment: 'center',
            width:"60%",
          },
          {
            text: 'Página ' +currentPage.toString() + ' de ' + pageCount+"  ",
            alignment: 'center',
          }
        ]
      };
    },
    header:
    function(currentPage, pageCount) {
      if (currentPage === 1) {
        return null; // No mostrar header en la primera página
      } else if(currentPage>=2) {
        return  [
          {
            //Editar para que se pueda poner el apellido completo
            columns: [
              {
                text: `${Numcuenta} ${Nombre.toUpperCase()} ${Apellido.toUpperCase()}`,
                style: "subheader",
                alignment: "left",
                margin: [30, 10, 0, 10],
                fontSize: 12 
              },
              {
                text: `${fecha}`,
                style: "subheader",
                margin: [10, 10, 30, 10],
                alignment: 'right',
                fontSize: 12 

              }
            ]
          }
          ]
        };
    },
    content: [
      {
      columns: [
        {
          image: `data:image/png;base64,${base64Image}`,
          width: 45, 
          height: 65, 
          alignment: "left"
        },
        {
          stack: [
            { text: "Universidad Nacional Autónoma de Honduras", style: "title", alignment: "center" },
            { text: "Dirección de Ingresos Permanencia y Promoción", style: "subheader", alignment: "center" },
            { text: "Historial Académico", style: "subheader", alignment: "center" },
          ],
          alignment: "center",
          width: "*"
        }
      ]},
      "\n",
      {
        alignment: "left",
        layout: { defaultBorderRadius: '10%', defaultBorder: false },
        table: {
          widths: ["50%", "0.000001%", "50%"], // Divide the table width equally into three columns
          body: [
            [
              { text: "Cuenta:   " + Numcuenta, fillColor: "#CCCCCC", margin:[0,5,0,0] } ,
              { text: "", fillColor: "#FFFFFF" } ,
              { text: "Carrera Actual: " + Carrera.toUpperCase(), fillColor: "#CCCCCC",margin:[0,5,0,0]}
              
            ],
            [
              { text: "Nombre: " + Nombre.toUpperCase(), fillColor: "#CCCCCC" },
              { text: "", fillColor: "#FFFFFF" },
              { text: "Centro:               " + CentroRegional.toUpperCase(), fillColor: "#CCCCCC" }
               
            ],
            [
              { text: "Apellido: " + Apellido.toUpperCase(), fillColor: "#CCCCCC", margin:[0,0,0,5] },
              { text: "", fillColor: "#FFFFFF" },
              { text: "Indice:                " + IndiceGlobal + "%", fillColor: "#CCCCCC", margin:[0,0,0,5] }
            ],
          ],
        },
        
      },
      "\n",
      {
        table: {
          widths: ["*"], // Establecer el ancho de la celda de tabla como "*"
          body: [
            [
              {
                text: Carrera.toString().toUpperCase(),
                style: "header",
                alignment: "center",
                fillColor: "#CCCCCC",// Establecer el color de fondo deseado
                width:"90%",
                
              }
            ]
          ]
        },
        layout: "noBorders" // Eliminar los bordes de la celda de tabla
      },
      ,
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
      leftAligned: {
        fontSize: 14,
        bold: false,
        alignment: 'left',
        margin: [35, 0, 0, 0] // Adjust the left margin value as needed
      }
    },
  };



  // Agregar la tabla de cada año al documento PDF
  years.forEach((year) => {

    const classesOfYear = result.recordset.filter((registro) => registro.Año === year);
    const tableData = [];

    let sumUVxNota = 0;
    let sumUV = 0;

    //
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
          clase.ASIGNATURA.toUpperCase(),
          uv ,
          clase.PERIODO.replace(/[^\d]/g, ''),
          clase.CALIFIACION,
          clase.OBS,
          
        ]);
      }
    });

    // Agregar el año antes de la tabla
    docDefinition.content.push({
      layout: { defaultBorder: false },
      table: {
        widths: ['auto', '*', 'auto'],
        body: [
          [
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 220, y2: 5, lineWidth: 1 }] },
            { text: year, style: 'subtitle', alignment: 'center' },
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 210, y2: 5, lineWidth: 1 }] },
          ],
        ],
      },
    });
    

    // Crear tabla para los datos del año actual
    const table = {
      headerRows: 1,
      widths: ["auto", "50%", "auto", "auto", "auto", "auto"],
      body: [[
        { text: 'CODIGO', style: 'subtitle' },
        { text: 'NOMBRE', style: 'subtitle' },
        { text: 'UV', style: 'subtitle',},
        { text: 'PERIODO', style: 'subtitle' },
        { text: 'NOTA', style: 'subtitle' },
        { text: 'OBS', style: 'subtitle' },
      ], ...tableData].map((clase) => [
        clase[0],
        { text: clase[1], fitWidth: true, bold: false },
        { text: clase[2], alignment: 'right' },
        { text: clase[3], alignment: 'center'},
        { text: clase[4], alignment: 'center' },
        { text: clase[5], alignment: 'center' },
      ]),
      style: "table",
      keepWithHeaderRows: 1
    };
    

        // Filtrar las clases con OBS "APR" del año actual
    const classesAPR = classesOfYear.filter((clase) => clase.OBS === "APR");

    // Obtener la cantidad de clases con OBS "APR"
    const countAPR = classesAPR.length;

    // Agregar la cantidad al documento PDF
    docDefinition.content.push({ layout: { defaultBorder: false }, table });

    // Agregar la cantidad de clases con OBS "APR" al final de la tabla
    docDefinition.content.push({ text: `Total Aprobadas:      ${countAPR}`, style: "leftAligned", bold: true, fontSize: 14},
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
    { text: `******************************************Ultima Linea******************************************`, style: "subtitle", alignment: "center", width: "90%", fontSize: 12 },
    "\n",
    { text: 'Cálculo del índice académico:', style: "subtitle", alignment: "left" },
    { text: `Suma UV x Nota:                         ${sumUVxNotaTotal}`, style: "leftAligned",  margin:[14,5,0,0]},
    { text: `Suma de UV:                                     ${sumUVTotal}`, style: "leftAligned",  margin:[14,5,0,0]},
    { text: `Indice académico:          ${sumUVxNotaTotal} / ${sumUVTotal} = ${parseInt(sumUVxNotaTotal/sumUVTotal)}%`, style: "leftAligned" ,  margin:[14,5,0,0]},
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

