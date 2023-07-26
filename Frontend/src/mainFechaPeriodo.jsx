import React from 'react';
import ReactDOM from 'react-dom';
import AppFechaPeriodoSemestral from './app/AppFechaPeriodoSemestral';
import AppFechaPeriodo from './app/AppFechaPeriodo';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnUtils from '@date-io/date-fns';
	@@ -20,13 +20,6 @@ ReactDOM.render(
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
