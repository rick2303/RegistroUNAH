import { Console } from "console";
import {USEREMAIL,PASS} from "../../.env"
import {createNewStudent} from '../controllers/usuarios.controllers';

//./src/csv/ListadoEstudiantes.csv
const csv = require('csv-parser');
const fs = require('fs');
const existingEmails = new Set();

export function procesarArchivo(filePath) {
  // Ruta del archivo CSV subido desde el frontend
  const csvFilePath = filePath;

  const students = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (data) => {
    const {
      nombre,
      apellido,
      telefono,
      FechaNacimiento,
      puntajePAA,
      DNI,
      carrera,
      correo,
      centro,
      direccion,
      periodoIngreso,
      anioIngreso,
      dia,
      mes,
      anio,
      puntajePAM,
      puntajePCCNS
    } = data;
    const student = {
      nombre,
      apellido,
      telefono,
      FechaNacimiento,
      puntajePAA,
      DNI,
      carrera,
      correo,
      centro,
      direccion,
      periodoIngreso,
      anioIngreso,
      dia,
      mes,
      anio,
      puntajePAM,
      puntajePCCNS
    };
    students.push(student);
  })
  .on("end", () => {

    // console.log("Datos cargados:", students);
    for (let index = 0; index < students.length; index++) {
      CreacionCCC(students[index].correo,students[index].DNI,students[index].nombre, students[index].apellido,students[index].telefono,students[index].FechaNacimiento,students[index].anioIngreso,students[index].direccion, students[index].centro, students[index].periodoIngreso, students[index].carrera, students[index].puntajePAA, students[index].puntajePAM, students[index].puntajePCCNS)      
      
    }

  });

}
//export default students;

function CreacionCCC(correopersonal,dni, firstName, lastName,tel,fechaNaci, anioIngresoPAC,direc, centro, periodo, carreraIngreso, puntaje, puntajePAM, puntajePCCNS) {

  const firstSpaceIndex = firstName.indexOf(' ');
  const firstNameOnly = firstSpaceIndex !== -1 ? firstName.substring(0, firstSpaceIndex) : firstName;

  // Obtener el primer apellido
  const firstLastNameSpaceIndex = lastName.indexOf(' ');
  const lastNameOnly = firstLastNameSpaceIndex !== -1 ? lastName.substring(0, firstLastNameSpaceIndex) : lastName;

  // Agregar la línea para eliminar guiones
  let stringWithoutDashes = dni.replace(/-/g, "");


function generateUniqueEmail(firstNameOnly, lastNameOnly) {
    const baseEmail = `${firstNameOnly.toLowerCase()}.${lastNameOnly.toLowerCase()}`;
    let email = `${baseEmail}@unah.hn`;
    let count = 1;

    while (isEmailAlreadyTaken(email)) {
        email = generateRandomString(firstNameOnly, lastNameOnly);
        count++;
    }
    
    existingEmails.add(email); // Agrega el correo al conjunto de correos existentes
    return email;
}

function isEmailAlreadyTaken(email) {
  return existingEmails.has(email); // Verifica si el correo ya existe en el conjunto
}

function generateRandomString(firstNameOnly, lastNameOnly) {
    const characters = `${firstNameOnly.charAt(0)}${lastNameOnly.charAt(0)}`;
    const randomIndex = Math.floor(Math.random() * 3); 
    let randomString = '';
    switch (randomIndex) {
    case 0:
        randomString = characters + firstNameOnly + lastNameOnly + '@unah.hn';
        break;
    case 1:
        randomString = firstNameOnly + characters + lastNameOnly + '@unah.hn';
        break;
    case 2:
        randomString = firstNameOnly + lastNameOnly + characters + '@unah.hn';
        break;
    }

    return randomString.toLowerCase();
}

function generateRandomPassword(firstNameOnly) {
    const specialCharacters = '!@#$%^&*';
    const randomSpecialChar = specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

    const firstNameOnlyInitial = firstNameOnly.charAt(0).toLowerCase();
    const lastNameOnlyInitial = lastNameOnly.charAt(lastNameOnly.indexOf(' ') + 1).toLowerCase();

    let randomPassword = `${firstNameOnlyInitial}${lastNameOnlyInitial}${randomSpecialChar}`;

    for (let i = 0; i < 9; i++) {
      const randomDigit = Math.floor(Math.random() * 10);
    randomPassword += randomDigit;
    }

    return randomPassword;
}

function asignarNumeroCentroRegional(centro) {
  let numeroCentro;

  switch (centro) {
    case 'CU':
      numeroCentro = 10;
      break;
    case 'VS':
      numeroCentro = 20;
      break;
    case 'CURC':
      numeroCentro = 30;
      break;
    case 'CURNO':
      numeroCentro = 40;
      break;
    case 'CURLA':
      numeroCentro = 50;
      break;
    case 'CURLP':
      numeroCentro = 60;
      break;
    case 'TEC-DANLI':
      numeroCentro = 70;
      break;
    case 'TEC-AGUAN':
        numeroCentro = 80;
      Break;
    default:
      numeroCentro = 0;
      break;
  }

  return numeroCentro;
}


function asignarPeriodo(periodo) {
  let numeroPeriodo;

  switch (periodo) {
    case 'I PAC':
      numeroPeriodo = 0;
      break;
    case 'II PAC':
      numeroPeriodo = 1;
      break;
    case 'III PAC':
      numeroPeriodo = 2;
      break;
    default:
      numeroPeriodo = null;
      break;
  }
  return numeroPeriodo;
}

let numeroCentroAsignado = asignarNumeroCentroRegional(centro);
let numeroPeriodoAsignado = asignarPeriodo(periodo);

let Cuenta = generarNumeroCuenta(anioIngresoPAC, numeroCentroAsignado, numeroPeriodoAsignado);

function generarNumeroCuenta(anioIngresoPAC, centro, periodo) {

// Lista para almacenar los números de cuenta generados
const numerosCuentaGenerados = [];

  do {
    // Generar los últimos 4 dígitos aleatorios
    const ultimosDigitos = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

    // Concatenar los componentes del número de cuenta
    Cuenta = `${anioIngresoPAC}${centro}${periodo}${ultimosDigitos}`;
  } while (numerosCuentaGenerados.includes(Cuenta));

  // Agregar el número de cuenta generado a la lista
  numerosCuentaGenerados.push(Cuenta);

  return Cuenta;

}

  const uniqueEmail = generateUniqueEmail(firstNameOnly, lastNameOnly);
  const password = generateRandomPassword(firstNameOnly);
  // console.log('Correo único generado:', uniqueEmail);
  // console.log('Contraseña:', password);
  //console.log('Número de cuenta:',  Cuenta);

  enviarEmail(correopersonal,firstName,lastName,uniqueEmail, Cuenta,password, carreraIngreso);


  const express = require('express');
  const app = express();
  console.log("PUNTAJE PCCNS", puntajePCCNS);
  const req = {
    body: {
      NumCuenta: Cuenta,
      DNI: stringWithoutDashes,
      Nombre: firstName,
      Apellido: lastName,
      NumeroTelefono: tel,
      CorreoInstitucional: uniqueEmail,
      CorreoPersonal: correopersonal,
      Contrasena: password,
      FechaNacimiento: fechaNaci,
      Carrera: carreraIngreso,
      Direccion: direc,
      CentroRegional: centro,
      PuntajePAA: puntaje,
      PuntajePAM: puntajePAM,
      PuntajePCCNS: puntajePCCNS,
    }
  };

  const res = {
    json: (data) => {
      console.log('Estudiante guardado:', data);
    },
    status: (code) => {
      console.log('Código de estado:', code);
      return res;
    },
    send: (message) => {
      console.log('Error:', message);
    }
  };

  createNewStudent(req, res)
}



const nodemailer = require('nodemailer');

async function enviarEmail(correo,nombre,apellido,correoinst,numeroCuenta,contrasena,carreraIngre) {
  const config = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.USEREMAIL,
      pass: process.env.PASS
    }
  };

  const mensaje = {
    from : 'gelenamador26@gmail.com',
    to: `${correo}`,
    subject: 'Bienvenido a la UNAH',
    html: `<h1>Felicitaciones ${nombre} ${apellido} por entrar a la Carrera de ${carreraIngre}</h1><p>Te hacemos entrega de tus credenciales:</p><ul><li>Tu correo institucional es: ${correoinst}</li><li>Tu número de cuenta es: ${numeroCuenta}</li><li>Tu clave para acceder a registro es: ${contrasena}</li></ul><p>Por favor, no compartas tu contraseña con nadie.</p><p>Para más información o preguntas, escríbenos a consultas_dipp@unah.edu.hn o llámanos a nuestros teléfonos: (+504) 2216-3002 / 2216-3003 / 2216-3004</p>`
  };
  
  const transport = nodemailer.createTransport(config);

  const info = await transport.sendMail(mensaje);
  console.log(info);
}



