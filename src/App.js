import React, {useState,useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [terminoBusqueda,setTerminoBusqueda] = useState('');
  const [imagenes,setImagenes] = useState([]);

  useEffect(() => {

    const consultarAPI = async () => {
      if(terminoBusqueda.trim() === '') return; //que no haga la primer busqueda
      const imagenesPorPagina = 30; //enviamos por parametros al BE
      const url = `https://pixabay.com/api/?key=19353842-882f3c69e9e20f6e776bbe8b4&q=${terminoBusqueda}&per_page=${imagenesPorPagina}`;
      const resultado = await fetch(url);
      const imagenes = await resultado.json();
      setImagenes(imagenes.hits);
    }

    consultarAPI();

  },[terminoBusqueda]);

  return (
      <div className="container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imagenes</p>
          <Formulario setTerminoBusqueda={setTerminoBusqueda}/>
        </div>
        <div className="row justify-contentn-center">
          <ListadoImagenes imagenes={imagenes}/>
        </div>
      </div>
  );
}

export default App;
