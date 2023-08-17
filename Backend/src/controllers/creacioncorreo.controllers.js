
const existingEmails = new Set();
export function generateUniqueEmail(firstNameOnly, lastNameOnly) {
  const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const cleanedFirstName = removeAccents(firstNameOnly.replace(/\s/g, ""));
  const cleanedLastName = removeAccents(lastNameOnly.replace(/\s/g, ""));
  const baseEmail = `${cleanedFirstName.toLowerCase()}.${cleanedLastName.toLowerCase()}`;
  let email = `${baseEmail}@unah.edu.hn`;
  let count = 1;

  while (isEmailAlreadyTaken(email)) {
      email = generateRandomString(cleanedFirstName, cleanedLastName);
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
        randomString = characters + firstNameOnly + lastNameOnly + '@unah.edu.hn';
        break;
    case 1:
        randomString = firstNameOnly + characters + lastNameOnly + '@unah.edu.hn';
        break;
    case 2:
        randomString = firstNameOnly + lastNameOnly + characters + '@unah.hn';
        break;
    }

    return randomString.toLowerCase();
}

export function generateRandomPassword(firstNameOnly, lastNameOnly) {
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

const nodemailer = require('nodemailer');

export async function enviarEmail(correo,nombre,apellido,correoinst,numEmpleado,contrasena,carrera) {
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
    html: `<h1>Felicitaciones ${nombre} ${apellido} por ser docente de  la Carrera de ${carrera}</h1><p>Te hacemos entrega de tus credenciales:</p><ul><li>Tu correo institucional es: ${correoinst}</li><li>Tu número de empleado es: ${numEmpleado}</li><li>Tu clave para acceder a registro es: ${contrasena}</li></ul><p>Por favor, no compartas tu contraseña con nadie.</p><p>Para más información o preguntas, escríbenos a consultas_dipp@unah.edu.hn o llámanos a nuestros teléfonos: (+504) 2216-3002 / 2216-3003 / 2216-3004</p>`
  };
  
  const transport = nodemailer.createTransport(config);

  const info = await transport.sendMail(mensaje);
}