import React, {useState} from 'react';
import Formulario from './components/Formulario';

function App() {

  const [terminoBusqueda,setTerminoBusqueda] = useState('');

  return (
      <div className="container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imagenes</p>
          <Formulario setTerminoBusqueda={setTerminoBusqueda}/>
        </div>
      </div>
  );
}

export default App;
