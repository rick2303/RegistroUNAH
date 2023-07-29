import React from 'react';
import ReactDOM from 'react-dom';
import AppFechaCancelacionesSemestrales from './app/AppFechaCancelacionesSemestrales';
import AppFechaCancelaciones from './app/AppFechaCancelaciones';
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
	
	<AppFechaCancelaciones />
	</MuiPickersUtilsProvider>	

	</div>	
	<div className='mt-14'>
	<MuiPickersUtilsProvider utils={DateFnUtils} locale={esLocale}>

	<AppFechaCancelacionesSemestrales />
	</MuiPickersUtilsProvider>	

	</div>	
	</React.StrictMode>,
	document.getElementById('FechaCancelaciones')
);