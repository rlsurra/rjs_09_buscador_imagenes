import React, {useState,useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [terminoBusqueda,setTerminoBusqueda] = useState('');
  const [imagenes,setImagenes] = useState([]);
  const [paginaActual,setPaginaActual] = useState(1);
  const [paginasTotales,setPaginasTotales] = useState(1);

  useEffect(() => {

    const consultarAPI = async () => {
      //Que NO haga la primera busqueda
      if(terminoBusqueda.trim() === '') return;
      //Consumo la API
      const imagenesPorPagina = 30; //enviamos por parametros al BE
      const url = `https://pixabay.com/api/?key=19353842-882f3c69e9e20f6e776bbe8b4&q=${terminoBusqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
      const resultado = await fetch(url);
      const imagenes = await resultado.json();
      //Seteo states
      setImagenes(imagenes.hits);
      setPaginasTotales(Math.ceil(imagenes.totalHits/imagenesPorPagina));
      //Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'});
    }

    consultarAPI();

  },[terminoBusqueda,paginaActual]);

  const paginaAnterior = () => {
    if(paginaActual != 1){
      setPaginaActual(paginaActual-1);
    }
  };

  const paginaSiguiente = () => {
    if(paginaActual != paginasTotales){
      setPaginaActual(paginaActual+1);
    }
  };



  return (
      <div className="container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imagenes</p>
          <Formulario setTerminoBusqueda={setTerminoBusqueda}/>
        </div>
        <div className="row justify-content-center">
          <ListadoImagenes imagenes={imagenes}/>

        {(paginaActual === 1) ? null :
          <button
            type="button"
            className="btn btn-info mr-1 text-center"
            onClick={paginaAnterior}
            >
            &laquo; Anterior
          </button>
        }

        {(paginaActual === paginasTotales) ? null :
        
          <button
            type="button"
            className="btn btn-info mr-1 text-center"
            onClick={paginaSiguiente}
            >
            Siguiente &raquo;
          </button>
        
        }
        </div>
      </div>
  );
}

export default App;
