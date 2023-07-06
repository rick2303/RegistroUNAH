import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiEdit } from "react-icons/fi";
import ReactTextareaAutosize from "react-textarea-autosize";

function EditableParagraph(props) {
  const [descripcion, setDescripcion] = useState("");

  const [editing, setEditing] = useState(false);
  const [paragraphContent, setParagraphContent] = useState(descripcion);
  const [id1, setId1] = useState(false);
  const [id2, setId2] = useState(false);
  const [rol, setRol] = useState(false);
  const [perfil, setPerfil] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      const rol = userData.data.Rol;
      setRol(rol);
      if (!rol) {
        const id1 = userData.data.NumCuenta;
        setId1(id1);
      } else {
        const id2 = userData.data.NumEmpleado;
        setId2(id2);
      }
      
      if (!userData.perfil) {
        const descripcion = "Sin descripcion hasta el momento.";
        setDescripcion(descripcion);
        setParagraphContent(descripcion);
        const perfiles = false
        setPerfil(perfiles)
      } else {
        const descripcion = userData.perfil.Descripcion;
        setDescripcion(descripcion);
        setParagraphContent(descripcion);
        const perfiles = true
        setPerfil(perfiles)
      }
    }
  }, []);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleInputChange = (event) => {
    setParagraphContent(event.target.value);
  };

  const handleSubmit = () => {
    // Enviar la información al backend utilizando fetch o una librería como Axios
    

    // Actualizar el localStorage
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      userData.perfil = {
        ...userData.perfil,
        Descripcion: paragraphContent,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
    }
    const userData = JSON.parse(storedData);
    if (!rol) {
      
      if(userData.perfil){
        fetch("http://localhost:5000/perfilEstudianteUpdateDescripcion", {
        method: "POST",
        body: JSON.stringify({ id: id1, descripcion: paragraphContent }),
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
      }else{
        fetch("http://localhost:5000/perfilEstudianteDescripcion", {
        method: "POST",
        body: JSON.stringify({ Id: id1, descripcion: paragraphContent }),
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
      
    }if(rol){
      if(userData.perfil){
        fetch("http://localhost:5000/perfilEmpleadoUpdateDescripcion", {
        method: "POST",
        body: JSON.stringify({id: id2, descripcion: paragraphContent }),
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
      }else{
        fetch("http://localhost:5000/perfilEmpleadoDescripcion", {
        method: "POST",
        body: JSON.stringify({Id: id2, descripcion: paragraphContent }),
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
    }
  };
  return (
    <div>
      {editing ? (
        <div>
          <ReactTextareaAutosize
            className="text-black"
            value={paragraphContent}
            onChange={handleInputChange}
            maxLength={150}
          />
          <button
            onClick={() => {
              handleEditToggle();
              handleSubmit();
            }}
          >
            Guardar
          </button>
        </div>
      ) : (
        <div>
          <p>{paragraphContent}</p>

          <button onClick={handleEditToggle}>
            <FiEdit
              className="text-2xl fas fa-pencil-alt"
              title="Editar descripción"
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default EditableParagraph;
