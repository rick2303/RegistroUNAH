import React, { useState ,useEffect} from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "../App.css"

const ModalDocentes = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [Nombre, setNombre] = useState("");
  const [Apellido, setApellido] = useState("");
  const [DNI, setDNI] = useState("");
  const [CorreoPersonal, setCorreoPersonal] = useState("");
  const [NumeroTelefono, setNumeroTelefono] = useState("");
  const [FechaNacimiento, setFechaNacimiento] = useState("");
  const [Direccion, setDireccion] = useState("");
  const [CentroRegional, setCentroRegional] = useState("");
  const [Foto, setFoto] = useState("");
  const [Carrera, setCarrera] = useState([]);
  const [carreraSeleccionada, setCarreraSeleccionada] = useState("");
 

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleCarreraChange = (event) => {
    setCarreraSeleccionada(event.target.value);
  };

  const fecharango = (date) => {
    const minDate = new Date("1900-01-01");
    const maxDate = new Date("2000-01-01");
    return date >= minDate && date <= maxDate;
  };

  const handleOpcionChange = (event) => {
    setCentroRegional(event.target.value);
  };

  const handleDNIcambio = (e) => {
    const inputDNI = e.target.value;
    
    // Limit input to 13 characters
    if (inputDNI.length <= 13) {
      setDNI(inputDNI);
    }
  };

  const borrarCampos = () => {
    setNombre("");
    setApellido("");
    setDNI("");
    setCorreoPersonal("");
    setNumeroTelefono("");
    setFechaNacimiento("");
    setDireccion("");
    setCentroRegional("");
    setFoto("");
    setCarreraSeleccionada("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Nombre:", Nombre);
    console.log("Apellido:", Apellido);
    console.log("DNI:", DNI);
    console.log("CorreoPersonal:", CorreoPersonal);
    console.log("NumeroTelefono:", NumeroTelefono);
    console.log("FechaNacimiento:", FechaNacimiento);
    console.log("Direccion:", Direccion);
    console.log("CentroRegional:", CentroRegional);
    console.log("Foto:", Foto);

    toggleModal();

  };

  const fetchCarrera = async () => {
    // Lógica para obtener la lista de aulas desde tu API, pasando el edificio como parámetro
    try {
      const response = await fetch(`http://localhost:5000/carreras`);
      const data = await response.json();
      setCarrera(data);
      console.log(data)
    } catch (error) {
      console.log("Error al obtener las carreras", error);
    }
  };
  useEffect(() => {
      fetchCarrera();
  }, []);


  const AgregarDocente = (event) => {
    event.preventDefault();

    const dateObject = new Date(FechaNacimiento);

    if (!fecharango(dateObject)) {
      alert("La fecha de nacimiento debe ser igual o anterior a 2000");
      return;
    }

    const formData = new FormData();
    formData.append("DNI", DNI);
    formData.append("Nombre", Nombre);
    formData.append("Apellido", Apellido);
    formData.append("NumeroTelefono", NumeroTelefono);
    formData.append("CorreoPersonal", CorreoPersonal);
    formData.append("FechaNacimiento", FechaNacimiento);
    formData.append("Carrera", carreraSeleccionada);
    formData.append("Direccion", Direccion);
    formData.append("files", document.getElementById("foto").files[0]);
    formData.append("CentroRegional", CentroRegional);

    toggleModal();
    borrarCampos();

    // Realizar la solicitud HTTP utilizando fetch
    fetch("http://localhost:5000/registrarDocentes", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Docente agregado correctamente");
          return response;
        } else {
          alert("Datos incompletos");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        alert("Datos incompletos");
      });
  };

  return (
    <div>
      <div onClick={toggleModal} className="grid grid-cols-1">
        <a>
          <a className="rounded grid grid-cols-1 group relative focus:outline-none focus:ring">
            <span
              className=" rounded-[25px] grid grid-cols-1 absolute inset-0 translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
              style={{ backgroundColor: "#145eb9" }}
            ></span>

            <span className=" cursor-pointer rounded-[25px] relative text-center inline-block border-2 border-black px-8 py-3 text-sm font-bold uppercase tracking-widest text-white group-active:text-opacity-75">
              Ir
            </span>
          </a>
        </a>
      </div>
      <Modal isOpen={modalOpen} toggle={toggleModal}>
      <ModalHeader className="text-white bg-blue-800 text-2xl">
        <strong>Registrar Docentes</strong> 
        <button className="close boton_cierre" onClick={toggleModal}>
              <span aria-hidden="true">X</span>
            </button>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            {/* Resto del código del formulario */}
            <FormGroup>
              <Label for="nombre">Nombre</Label>
              <Input
                type="text"
                id="nombre"
                value={Nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="apellido">Apellido</Label>
              <Input
                type="text"
                id="apellido"
                value={Apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
                <Label for="DNI">DNI</Label>
                <Input
                  type="text"
                  id="DNI"
                  value={DNI}
                  onChange={handleDNIcambio} 
                  onKeyDown={(event) => {
                    
                    if (event.target.value.length >= 13 && event.key !== "Backspace") {
                      event.preventDefault();
                    }
                  }}
                />
            </FormGroup>
            <FormGroup>
              <Label for="email">Correo Personal</Label>
              <Input
                type="email"
                id="email"
                value={CorreoPersonal}
                onChange={(e) => setCorreoPersonal(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="numCelular">Numero De Celular</Label>
              <Input
                type="text"
                id="numCelular"
                maxLength="8"
                value={NumeroTelefono}
                onChange={(e) => setNumeroTelefono(e.target.value)}
                onKeyPress={(event) => {
            const charCode = event.which ? event.which : event.keyCode;
            if (charCode < 48 || charCode > 57) {
            event.preventDefault();
            }
        }}
              />
            </FormGroup>
            <FormGroup>
                <Label for="fechaNacimiento">Fecha De Nacimiento</Label>
                <Input
                  type="date"
                  id="fechaNacimiento"
                  value={FechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  max="2000-01-01" 
                  min="1900-01-01" 
                />
              </FormGroup>
            <FormGroup>
              <Label for="carrera">Carrera</Label>
              <select
          className="form-select border-3"
          aria-label="Default select example"
          value={carreraSeleccionada}
          onChange={handleCarreraChange}
        >
          <option>Carrera</option>
          {Carrera.map((carrera, index) => (
            <option key={index} value={carrera}>
              {carrera}
            </option>
          ))}
        </select>
            </FormGroup>
            <FormGroup>
              <Label for="direccion">Direccion</Label>
              <Input
                type="textarea"
                id="direccion"
                value={Direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="centroRegional">Centro Regional:</Label>
              <Input
                type="select"
                id="centroRegional"
                value={CentroRegional}
                onChange={handleOpcionChange}
              >
                <option value="">Seleccione un Centro Regional</option>
                <option value="CU">Ciudad Universitaria</option>
                <option value="VS">Valle de Sula</option>
                <option value="CURC">CURC</option>
                <option value="CURNO">CURNO</option>
                <option value="CURLA">CURLA</option>
                <option value="CURLP">CURLP</option>
                <option value="TEC-DANLI">TEC-DANLI</option>
                <option value="TEC-AGUAN">TEC-AGUAN</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="foto">Foto</Label>
              <Input
                type="file"
                id="foto"
                value={Foto}
                onChange={(e) => setFoto(e.target.value)}
                accept=".jpg,.pgn,.png"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="boton_guardar" onClick={AgregarDocente}>
            Registrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalDocentes;