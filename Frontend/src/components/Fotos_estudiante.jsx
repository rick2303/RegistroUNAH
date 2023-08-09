import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
function Fotos_estudiante() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [id1, setId1] = useState(false);
  const [id2, setId2] = useState(false);
  const [rol, setRol] = useState(false);
  const inputFileRef = useRef(null);
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
    }
  }, []);
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).slice(0, 3); // Limitar a tres archivos
    setSelectedFiles(files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!rol) {
      const storedData = localStorage.getItem("userData");
      const userData = JSON.parse(storedData)
      if (selectedFiles.length > 0) {
        const formData = new FormData();
        formData.append("Id", id1);
        selectedFiles.forEach((file) => {
          formData.append("files", file);
        });

        if(userData.perfil){
          fetch("http://localhost:5000/perfilEstudianteUpdate", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.status === 200) {
              alert("Archivos recibidos y procesados correctamente");
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
            setSelectedFiles([]); // Reiniciar la selección de archivos
            if (inputFileRef.current) {
              inputFileRef.current.value = ""; // Limpiar el campo de entrada de archivos
            }
          });
        }else{
          fetch("http://localhost:5000/perfilEstudiante", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.status === 200) {
              alert("Archivos recibidos y procesados correctamente");
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
            setSelectedFiles([]); // Reiniciar la selección de archivos
            if (inputFileRef.current) {
              inputFileRef.current.value = ""; // Limpiar el campo de entrada de archivos
            }
          });
        }
      }
    }

    if (rol) {
      const storedData = localStorage.getItem("userData");
      const userData = JSON.parse(storedData)
      if (selectedFiles.length > 0) {
        const formData = new FormData();
        formData.append("Id", id2);
        selectedFiles.forEach((file) => {
          formData.append("files", file);
        });

      if (userData.perfil) {
        fetch("http://localhost:5000/perfilEmpleadoUpdate", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.status === 200) {
              alert("Archivos recibidos y procesados correctamente");
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
            setSelectedFiles([]); // Reiniciar la selección de archivos
            if (inputFileRef.current) {
              inputFileRef.current.value = ""; // Limpiar el campo de entrada de archivos
            }
          });
      } else {
        fetch("http://localhost:5000/perfilEmpleado", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.status === 200) {
              alert("Archivos recibidos y procesados correctamente");
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
            setSelectedFiles([]); // Reiniciar la selección de archivos
            if (inputFileRef.current) {
              inputFileRef.current.value = ""; // Limpiar el campo de entrada de archivos
            }
          });
      }
    }
    }
  };

  return (
    <form
      className="d-flex justify-content-between align-items-center"
      onSubmit={handleSubmit}
    >
      <input
        type="file"
        onChange={handleFileChange}
        ref={inputFileRef}
        accept=".jpg, .jpeg, .png"
        multiple
        max="3"
      />
      <button
        className=" rounded-lg bg-blue-800  text-white shadow h-8 w-14"
        type="submit"
      >
        Cargar
      </button>
    </form>
  );
}

export default Fotos_estudiante;
