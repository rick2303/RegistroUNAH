import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiEdit } from "react-icons/fi";
import ReactTextareaAutosize from "react-textarea-autosize";

function EditableParagraph() {
  const [editing, setEditing] = useState(false);
  const [paragraphContent, setParagraphContent] = useState(
    "Agrega una breve descripción de ti mismo"
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
            maxLength={300}
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
            <FiEdit className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
}

export default EditableParagraph;
