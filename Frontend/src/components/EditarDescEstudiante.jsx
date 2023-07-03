import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiEdit } from "react-icons/fi";
import ReactTextareaAutosize from "react-textarea-autosize";


function EditableParagraph(props) {
 /*  const [descripcion, setDescripcion] = useState("");
  


  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
     
      const descripcion = userData.perfil.Descripcion; 
      setDescripcion(descripcion);
    }
  }, []); */
  const [editing, setEditing] = useState(false);
  const [paragraphContent, setParagraphContent] = useState(
    props.descripcion
  );
 

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleInputChange = (event) => {
    setParagraphContent(event.target.value);
  };

  const handleSubmit = () => {
    // Enviar la información al backend utilizando fetch o una librería como Axios
    fetch("/api/paragraph", {
      method: "POST",
      body: JSON.stringify({ content: paragraphContent }),
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
            <FiEdit className="text-2xl fas fa-pencil-alt" title="Editar descripción" />
          </button>
        </div>
      )}
    </div>
  );
}

export default EditableParagraph;
