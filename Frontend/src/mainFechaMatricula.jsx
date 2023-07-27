import React from 'react';
import ReactDOM from 'react-dom';

import AppFechaMatricula from './app/AppFechaMatricula';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
import AppFechaMatriculaSemestral from './app/AppFechaMatriculaSemestral';
import Navbar from './components/Navbar';
ReactDOM.render(
	<React.StrictMode>
	<div className='w-full top-0' style={{ position: 'fixed', zIndex: 999  }}>
  <Navbar />
</div>
<div className='mt-40'>
	<MuiPickersUtilsProvider utils={DateFnUtils} locale={esLocale}>
	
	<AppFechaMatricula />
	</MuiPickersUtilsProvider>	
	<MuiPickersUtilsProvider utils={DateFnUtils} locale={esLocale}>
	
	<AppFechaMatriculaSemestral />
	</MuiPickersUtilsProvider>	
	</div>
	</React.StrictMode>,
	document.getElementById('FechaMatricula')
);