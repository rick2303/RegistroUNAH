
import React, { useEffect,useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function VideoDocente() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [id1, setId1] = useState(false);
  const inputFileRef = useRef(null);
  
  useEffect(() => {
    const storedData = localStorage.getItem("userData");

    if (storedData) {
      const userData = JSON.parse(storedData);
      const id1 = userData.data.NumEmpleado;
      setId1(id1);
    }
  }, []);

  
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Obtener el primer archivo seleccionado
    setSelectedFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const storedData = localStorage.getItem("userData");
    const userData = JSON.parse(storedData)
    if (selectedFile) {
      const formData = new FormData();
      formData.append('Id', id1);
      formData.append("files", selectedFile);

      if(userData.perfil){
        fetch("http://localhost:5000/perfilEmpleadoUpdateVideo", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.status === 200) {
            alert("Archivo recibido y procesado correctamente");
              const storedData = localStorage.getItem("userData");
              response.json().then((responseData) => {
              const url = responseData.url;
              const data = responseData;
              console.log(data);
              localStorage.setItem("userData", JSON.stringify(data)); // Almacenar datos en localStorage
              window.location.reload();
            });
            return response;
          }
        })
        .finally(() => {
          setSelectedFile(null); // Reiniciar la selección de archivo
          if (inputFileRef.current) {
            inputFileRef.current.value = ""; // Limpiar el campo de entrada de archivos
          }
        });
      }else{
        fetch("http://localhost:5000/perfilEmpleadoVideo", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.status === 200) {
            alert("Archivo recibido y procesado correctamente");
              const storedData = localStorage.getItem("userData");
              response.json().then((responseData) => {
              const url = responseData.url;
              const data = responseData;
              console.log(data);
              localStorage.setItem("userData", JSON.stringify(data)); // Almacenar datos en localStorage
              window.location.reload();
            });
            return response;
          }
        })
        .finally(() => {
          setSelectedFile(null); // Reiniciar la selección de archivo
          if (inputFileRef.current) {
            inputFileRef.current.value = ""; // Limpiar el campo de entrada de archivos
          }
        });
      }
    }
  };

  return (
    <form className="d-flex justify-content-between align-items-center" onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={handleFileChange}
        ref={inputFileRef}
        accept="video/*" // Solo aceptar archivos de video
      />
      <button  style={{ background: "#145eb9" }}className="rounded-lg text-white shadow h-8 w-14" type="submit">
        Cargar
      </button>
    </form>
  );
}

export default VideoDocente;
