import React from 'react';
import ReactDOM from 'react-dom';
import './FechaMatricula.css';
import AppFechaMatricula from './app/AppFechaMatricula';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";

ReactDOM.render(
	<React.StrictMode>
	
	<MuiPickersUtilsProvider utils={DateFnUtils} locale={esLocale}>
	
	<AppFechaMatricula />
	</MuiPickersUtilsProvider>	
		
	
	</React.StrictMode>,
	document.getElementById('FechaMatricula')
);