import React from 'react';
import ReactDOM from 'react-dom';
import AppFechaPeriodoSemestral from './app/AppFechaPeriodoSemestral';
import AppFechaPeriodo from './app/AppFechaPeriodo';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
import Navbar from './components/Navbar';

ReactDOM.render(
	<React.StrictMode>
   <div className='w-full top-0' style={{ position: 'fixed', zIndex: 999  }}>
  <Navbar />
</div>

	
	<div className='mt-40'>
	<MuiPickersUtilsProvider utils={DateFnUtils} locale={esLocale}>
	
	<AppFechaPeriodo />
	</MuiPickersUtilsProvider>	
		
	</div>
	<div className='mt-20'>
	<MuiPickersUtilsProvider utils={DateFnUtils} locale={esLocale}>
	
	<AppFechaPeriodoSemestral />
	</MuiPickersUtilsProvider>	
		
	</div>

	
	</React.StrictMode>,
	document.getElementById('FechaPeriodo')
);