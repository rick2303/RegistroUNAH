import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import StudentModal from './StudentModal';

const AppEstadoCuenta = () => {
  return (
    <div>
      <StudentModal />
    </div>
  );
};

ReactDOM.render(<AppEstadoCuenta />, document.getElementById('estadocuenta'));