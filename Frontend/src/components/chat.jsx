import React from 'react';
import '../cssChat.css'; // You might need to adjust the path for your CSS file
import "bootstrap/dist/css/bootstrap.min.css";


function ChatApp() {
    return (
        <div className="container">
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
<br />
<div class="container">
<div class="row clearfix">
    <div class="col-lg-12">
        <div class="card chat-app">
            <div id="plist" class="people-list">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-search btn-lg"></i></span>
                    </div>
                    <input type="text" class="form-control" placeholder="Busca un contacto"/>
                </div>
                <ul class="list-unstyled chat-list mt-2 mb-0">
                    <li class="clearfix">
                        <img src="" alt="avatar"/>
                        <div class="about">
                            <div class="name">Vincente Portelass</div>
                            <div class="status"> <i class="fa fa-circle offline"></i> ultima vez hace 7m </div>                                            
                        </div>
                    </li>
                    <li class="clearfix active">
                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar"/>
                        <div class="about">
                            <div class="name">Ricardo Milos</div>
                            <div class="status"> <i class="fa fa-circle online"></i> En linea </div>
                        </div>
                    </li>
                    <li class="clearfix">
                        <img src="" alt="avatar"/>
                        <div class="about">
                            <div class="name">Miguel Ramirez</div>
                            <div class="status"> <i class="fa fa-circle online"></i> En linea </div>
                        </div>
                    </li>                                    
                    <li class="clearfix">
                        <img src="" alt="avatar"/>
                        <div class="about">
                            <div class="name">Christian</div>
                            <div class="status"> <i class="fa fa-circle offline"></i> ultima vez hace 2h </div>
                        </div>
                    </li>
                    <li class="clearfix">
                        <img src="" alt="avatar"/>
                        <div class="about">
                            <div class="name">Monica Raquel</div>
                            <div class="status"> <i class="fa fa-circle online"></i> En linea </div>
                        </div>
                    </li>
                    <li class="clearfix">
                        <img src="" alt="avatar"/>
                        <div class="about">
                            <div class="name">Guillermo</div>
                            <div class="status"> <i class="fa fa-circle offline"></i> ultima vez Oct28 </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="chat">
                <div class="chat-header clearfix">
                    <div class="row">
                        <div class="col-lg-6">
                            <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar"/>
                            </a>
                            <div class="chat-about">
                                <h6 class="m-b-0">Ricardo Milos</h6>
                                <small>En linea</small>
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
                       
                        <input type="text" class="form-control" placeholder="Ingrese texto"/>  
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
