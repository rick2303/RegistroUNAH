import React, { useEffect, useState, useRef } from "react";
import '../cssChat.css'; // Ajusta la ruta de tu archivo CSS si es necesario
import "bootstrap/dist/css/bootstrap.min.css";
import ModalAgregarContacto from './ModalAgregarContacto'
import ModalSolicitudesAmistad from './ModalSolicitudesAmistad'
import socketIOClient from "socket.io-client";
import io from 'socket.io-client';

function ChatApp() {
    const [NumCuenta, setNumCuenta] = useState("");
    const [contactos, setContactos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [showSolicitudesModal, setShowSolicitudesModal] = useState(false);
    const [socket, setSocket] = useState(null); // Estado para almacenar la instancia de socket
    const [selectedContact, setSelectedContact] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [messageInput, setMessageInput] = useState(""); // Estado para almacenar el mensaje ingresado
    const chatHistoryRef = useRef(null);
    const [autoScroll, setAutoScroll] = useState(true);




    const handleSendMessage = (message) => {
        if (message.trim() !== "") {
            sendMessage(message);
            setMessageInput('')
        }
    };

    const toggleSolicitudesModal = () => {
        setShowSolicitudesModal(!showSolicitudesModal);
    };

    const handleContactSelect = (contacto) => {
        setSelectedContact(contacto);
        setAutoScroll(true);
        fetchChatHistory(NumCuenta, contacto.IdEstudianteAgregado);

    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
        console.log("toggle modal");
    };

    useEffect(() => {
        if (socket) {
            socket.on('userConnected', ({ userId, isOnline }) => {
                if (selectedContact && selectedContact.IdEstudianteAgregado === userId) {
                    setSelectedContact((prevContact) => ({
                        ...prevContact,
                        IsOnline: isOnline
                    }));
                }
            });
            socket.on('userDisconnected', ({ userId, isOnline }) => {
                if (selectedContact && selectedContact.IdEstudianteAgregado === userId) {
                    setSelectedContact((prevContact) => ({
                        ...prevContact,
                        IsOnline: isOnline
                    }));
                }
            });
        }
    }, [socket, selectedContact]);
    
    useEffect(() => {
        if (autoScroll && chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
            setAutoScroll(false);
            console.log(autoScroll)
            fetchChatHistory(NumCuenta, selectedContact.IdEstudianteAgregado)
        }
        if (selectedContact != null) {
            fetchChatHistory(NumCuenta, selectedContact.IdEstudianteAgregado)
        }

    }, [chatHistory, autoScroll]);


    useEffect(() => {
        if (selectedContact) {
            fetchChatHistory(NumCuenta, selectedContact.IdEstudianteAgregado);
        }
    }, [selectedContact, autoScroll]);


    useEffect(() => {
        const socket = socketIOClient("http://localhost:9000"); // Cambia la URL por la dirección de tu servidor de Socket.IO
        setSocket(socket);

        return () => {
            socket.disconnect(); // Desconecta el socket al desmontar el componente
        };
    }, []);



    useEffect(() => {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
            const userData = JSON.parse(storedData);
            const numCuenta = userData.data.NumCuenta;

            const socket = io.connect('http://localhost:9000');
            socket.on('connect', () => {
                socket.emit('userConnectRequest', { userId: numCuenta }); // Enviar el ID al servidor
            });
            console.log(numCuenta);
            console.log(selectedContact)
            setNumCuenta(numCuenta);
            fetchContactos(numCuenta); // Obtener contactos con el NumCuenta actualizado

        }

    }, []);

    useEffect(() => {
        if (NumCuenta) {
            fetchContactos(NumCuenta);
        }
    }, [contactos]);


    const sendMessage = async (message) => {
        try {
            const currentDate = new Date();
            const response = await fetch("http://localhost:5000/mandarMensajes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    emisorId: NumCuenta,
                    receptorId: selectedContact.IdEstudianteAgregado,
                    mensaje: message,
                    fechaMensaje: currentDate
                }),
            });

            if (response.ok) {
                console.log("Mensaje enviado exitosamente");
                await fetchChatHistory(NumCuenta, selectedContact.IdEstudianteAgregado); // Esperar a que se actualice el historial de chat
                setAutoScroll(true); // Establecer autoscroll después de actualizar el historial
            } else {
                console.error("Error al enviar el mensaje");
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };
    const imagenExiste = (path) => {
        const img = new Image();
        img.src = path;
        return img.complete || img.width > 0 || img.height > 0;
    };
    


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
            //console.log(data);
            setContactos(data);
        } catch (error) {
            console.error('Error fetching contactos:', error);
        }

    };

    const fetchChatHistory = async (emisorId, receptorId) => {
        try {
            const response = await fetch('http://localhost:5000/historialChat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emisorId: emisorId,
                    receptorId: receptorId,
                })
            });

            const data = await response.json();
            //console.log('Historial:',data);

            setChatHistory(data);
        } catch (error) {
            console.error('Error fetching contactos:', error);
        }

    };


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    function FormatoTiempo(dateString) {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "p.m." : "a.m.";

        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    const filteredContactos = contactos.filter(contacto => {

        return contacto.Nombre.toLowerCase().includes(searchTerm.toLowerCase());
    });


    const spanStyle = {
        width: '200px', // Ajusta el valor según tus necesidades
    };


    return (
        <div className="container">

            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
            <br />

            <div class="container">
                <div class="input-group-prepend">

                    <button className="btn btn-link" onClick={toggleSolicitudesModal}>
                        <i className="fa fa-eye btn-lg"> Ver solicitudes</i>
                    </button>

                    <ModalSolicitudesAmistad isOpen={showSolicitudesModal} onClose={toggleSolicitudesModal} />




                    <button className="btn btn-link ml-6" onClick={toggleModal}>
                        <i className="fa fa-plus btn-lg"> Agregar un contacto</i>
                    </button>

                    <ModalAgregarContacto isOpen={modalOpen} onClose={toggleModal} />
                </div>
                <br />
                <div class="row clearfix">
                    <div class="col-lg-12">
                        <div class="card chat-app" >
                            <div id="plist" class="people-list"  >
                                <div class="input-group">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Busca un contacto"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                <div className="contact-list-container mt-3">
                                <ul className="list-unstyled chat-list mt-2 mb-0" >
                                        {searchTerm ? (
                                            filteredContactos.map((contacto) => (
                                                <li key={contacto.IdEstudianteAgregado} className="clearfix" onClick={() => handleContactSelect(contacto)}  >
                                                    <img 
                                                    src={`../img/uploads/${contacto.Imagen1}`} alt="avatar" />
                                                    <div className="about">
                                                        <div className="name">{contacto.Nombre} {contacto.Apellido[0]}</div>
                                                        <div className="status">
                                                            {contacto.IsOnline === true ? (
                                                                <i className="fa fa-circle online"></i>
                                                            ) : (
                                                                <i className="fa fa-circle offline"></i>
                                                            )}
                                                            {contacto.IsOnline === true ? "En línea" : "Desconectado"}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                            contactos.map((contacto) => (
                                                <li key={contacto.IdEstudianteAgregado} className="clearfix" onClick={() => handleContactSelect(contacto)}>
                                                {imagenExiste(`../img/uploads/${contacto.Imagen1}`) ? (
                                                    <img src={`../img/uploads/${contacto.Imagen1}`} alt="avatar" style={{ height: '45px' }}/>
                                                ) : (
                                                    <img src={`../img/uploads/1688323336413-804346209-64572.png`} alt="imagen por defecto" style={{ height: '45px' }}/>//Recuerden que deben cambiar la ruta de la imagen por defecto, segun donde las tengan o si se llaman distinto
                                                )}
                                                    <div className="about">
                                                        <div className="name">{contacto.Nombre} {contacto.Apellido[0]}</div>
                                                        <div className="status">
                                                            {contacto.IsOnline === true ? (
                                                                <i className="fa fa-circle online"></i>
                                                            ) : (
                                                                <i className="fa fa-circle offline"></i>
                                                            )}
                                                            {contacto.IsOnline === true ? "En línea" : "Desconectado"}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div class="chat" style={{ height: '750px' }}>
                                {selectedContact && (
                                    <div class="chat-header clearfix">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                {selectedContact && (
                                                    <>
                                                    {imagenExiste(`../img/uploads/${selectedContact.Imagen1}`) ? (
                                                        <img src={`../img/uploads/${selectedContact.Imagen1}`} alt="avatar" style={{ height: '40px' }}/>
                                                    ) : (
                                                        <img src={`../img/uploads/1688323336413-804346209-64572.png`} alt="imagen por defecto" style={{ height: '40px' }}/>
                                                    )}
                                                        <div class="chat-about">
                                                            <h6 class="m-b-0">{selectedContact.Nombre} {selectedContact.Apellido}</h6>
                                                            <small>{selectedContact.IsOnline ? "En línea" : "Desconectado"}</small>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedContact && (
                                    <div class="chat-history" style={{ maxHeight: '600px', overflowY: 'auto' }} ref={chatHistoryRef}>
                                        <ul class="m-b-0">
                                            {chatHistory.map((message) => (
                                                <li
                                                    key={message.Id_Historial} 
                                                    className={message.EmisorId === NumCuenta ? "clearfix text-right" : "clearfix text-left"} 
                                                >
                                                    <div class="message-data">
                                                        <span className="message-data-time">
                                                            {FormatoTiempo(message.fecha_Mensaje)}
                                                        </span>
                                                    </div>
                                                    <div className={message.EmisorId === NumCuenta ? "message my-message float-right" : "message other-message float-left"}> 
                                                        {message.mensaje}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {selectedContact && (
                                    <div class="chat-message clearfix" >
                                        <div class="input-group mb-0">
                                            <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Ingrese texto"
                                                value={messageInput}
                                                onChange={(event) => setMessageInput(event.target.value)}
                                                onKeyDown={(event) => {
                                                    if (event.key === 'Enter') {
                                                        handleSendMessage();
                                                    }
                                                }}
                                            />
                                            <div class="input-group-prepend">
                                                <button class="input-group-text" onClick={() => handleSendMessage(messageInput)}>
                                                    <i class="fa fa-send btn-lg"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatApp;

