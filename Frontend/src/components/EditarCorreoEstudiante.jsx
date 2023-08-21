import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiEdit } from "react-icons/fi";
import ReactTextareaAutosize from "react-textarea-autosize";

function EditableEmail(props) {
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);
  const [emailContent, setEmailContent] = useState(email);
  const [id1, setId1] = useState(false);
  const [id2, setId2] = useState(false);
  const [rol, setRol] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      const correoPersonal = userData.data.CorreoPersonal;
      setEmail(correoPersonal);
      setEmailContent(correoPersonal);
      const rol = userData.data.Rol;
      setRol(rol);
      if (!rol) {
        const id1 = userData.data.NumCuenta;
        setId1(id1);
      } else {
        const id2 = userData.data.NumEmpleado;
        setId2(id2);
      }
      
    }
    console.log(id2);
    console.log(id1);
  }, []);


  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleInputChange = (event) => {
    setEmailContent(event.target.value);
  };

  const handleSubmit = () => {
    // Enviar la información al backend utilizando fetch o una librería como Axios

    // Actualizar el localStorage
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      userData.data.CorreoPersonal = emailContent;
      localStorage.setItem("userData", JSON.stringify(userData));
    }

    // Aquí debes realizar la solicitud al backend para actualizar el CorreoPersonal
    // Puedes utilizar una estructura similar a la que usaste para la descripción
    // Asegúrate de ajustar las rutas y los datos según las necesidades de tu aplicación

    // Ejemplo:
    // fetch("http://localhost:5000/actualizarCorreoPersonal", {
    //   method: "POST",
    //   body: JSON.stringify({ correoPersonal: emailContent }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Manejar la respuesta del backend si es necesario
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     // Manejar errores si la solicitud falla
    //     console.error(error);
    //   });
    if (!rol) {
      fetch("http://localhost:5000/perfilEstudianteUpdateCorreo", {
       method: "POST",
       body: JSON.stringify({id: id1, CorreoPersonal: emailContent }),
       headers: {
         "Content-Type": "application/json",
       },
     })
       .then((response) => response.json())
       .then((data) => {
         // Manejar la respuesta del backend si es necesario
         console.log(data);
      })
      .catch((error) => {
        // Manejar errores si la solicitud falla
        console.error(error);
      });
    } else {
      fetch("http://localhost:5000/updateCorreo", {
        method: "POST",
        body: JSON.stringify({id: id2, CorreoPersonal: emailContent }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Manejar la respuesta del backend si es necesario
          console.log(data);
       })
       .catch((error) => {
         // Manejar errores si la solicitud falla
         console.error(error);
       });
    }
     
  };

  return (
    <div>
      {editing ? (
        <div className="row">
          <ReactTextareaAutosize
            type="email"
            className="text-black col-9"
            value={emailContent}
            onChange={handleInputChange}
          />
          <button className=" w-28 h-6 rounded text-white col-3"
           style={{ background: "#145eb9", fontSize: "1rem" }}
            onClick={() => {
              handleEditToggle();
              handleSubmit();
            }}
          >
           <strong >Guardar</strong>
          </button>
        </div>
      ) : (
        <div className="row">
          <p className="col-10">{emailContent}</p>

          <button className="col-2" onClick={handleEditToggle}>
            <FiEdit
              className="text-2xl fas fa-pencil-alt"
              title="Editar Correo Personal"
              style={{ color: "#145eb9" }}
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default EditableEmail;
