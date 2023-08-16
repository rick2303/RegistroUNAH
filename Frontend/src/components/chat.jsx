import React, { useEffect, useState } from "react";
import '../cssChat.css'; // Ajusta la ruta de tu archivo CSS si es necesario
import "bootstrap/dist/css/bootstrap.min.css";
import ModalAgregarContacto from './ModalAgregarContacto'

function ChatApp() {
    const [NumCuenta, setNumCuenta] = useState("");
    const [contactos, setContactos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
      setModalOpen(!modalOpen);
      console.log("toggle modal");
    };

    useEffect(() => {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
            const userData = JSON.parse(storedData);
            const numCuenta = userData.data.NumCuenta;
            console.log(numCuenta);
            setNumCuenta(numCuenta);
            fetchContactos(numCuenta); // Obtener contactos con el NumCuenta actualizado
        }
    }, []);

    const fetchContactos = async (NumCuenta) => {
        try {
            const response = await fetch('http://localhost:5000/contactos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    NumCuenta: NumCuenta
                })
            });

            const data = await response.json();
            console.log(data);
            setContactos(data);
        } catch (error) {
            console.error('Error fetching contactos:', error);
        }
    };

    

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredContactos = contactos.filter(contacto =>
        contacto.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const spanStyle = {
        width: '200px', // Ajusta el valor según tus necesidades
      };


    return (
        <div className="container">
        
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
            <br />
            
            <div class="container">
            <div class="input-group-prepend">
            <span className="input-group-text" style={spanStyle} onClick={toggleModal}>
                <i className="fa fa-plus btn-lg"> Agregar un contacto</i>
  
            </span>
            <ModalAgregarContacto isOpen={modalOpen} onClose={toggleModal} />
            </div>
            <br />
                <div class="row clearfix">
                    <div class="col-lg-12">
                        <div class="card chat-app">
                            <div id="plist" class="people-list">
                                <div class="input-group">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Busca un contacto"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                <ul className="list-unstyled chat-list mt-2 mb-0">
                                    {searchTerm ? (
                                        filteredContactos.map(contacto => (
                                            <li key={contacto.IdEstudianteAgregado} className="clearfix">
                                                <img src={`../img/uploads/${contacto.Imagen1}`} alt="avatar" />
                                                <div className="about">
                                                    <div className="name">{contacto.Nombre}</div>
                                                    <div className="status"> <i className="fa fa-circle offline"></i>Desconectado</div>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        contactos.map(contacto => (
                                            <li key={contacto.IdEstudianteAgregado} className="clearfix">
                                                <img src={`../img/uploads/${contacto.Imagen1}`} alt="avatar" />
                                                <div className="about">
                                                    <div className="name">{contacto.Nombre}</div>
                                                    <div className="status"> <i className="fa fa-circle offline"></i>Desconectado</div>
                                                </div>
                                            </li>
                                        ))
                                        
                                    )
                                    }
                                </ul>
                                
                            </div>
                            <div class="chat">
                                <div class="chat-header clearfix">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                                            </a>
                                            <div class="chat-about">
                                                <h6 class="m-b-0">Ricardo Milos</h6>
                                                <small>En línea</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="chat-history">
                                    <ul class="m-b-0">
                                    <li class="clearfix">
                                            <div class="message-data text-left">
                                                <span class="message-data-time">10:10 AM, Hoy</span>
                                            </div>
                                            <div class="message other-message float-left"> Hola, como estas?? </div>
                                            </li>
                                            <li class="clearfix text-right">
                                            <div class="message-data">
                                                <span class="message-data-time">10:12 AM, Hoy</span>
                                            </div>
                                            <div class="message my-message">Nos reunimos hoy?</div>                                    
                                            </li>                               
                                            <li class="clearfix text-right">
                                            <div class="message-data">
                                                <span class="message-data-time">10:15 AM, Hoy</span>
                                            </div>
                                            <div class="message my-message">Creo que el proyecto se termina hoy.</div>
                                            </li>
                                    </ul>
                                </div>
                                <div class="chat-message clearfix">
                                    <div class="input-group mb-0">
                                        <input type="text" class="form-control" placeholder="Ingrese texto" />
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fa fa-send btn-lg"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatApp;

