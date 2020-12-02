import React,{useState} from 'react';
import Error from './Error';

const Formulario = ({setTerminoBusqueda}) => {

    const [inputBusqueda,setInputBusqueda] = useState('');
    const [error,setError] = useState(false);

    const buscarImagenes = e => {
        e.preventDefault();
        //Validamos que no este vacio
        if(inputBusqueda.trim() === '') {
            setError(true);
            return;
        }
        setError(false);        
        //Devolvemos al componente padre
        setTerminoBusqueda(inputBusqueda);
    }

    return ( 
        <form
            onSubmit={buscarImagenes}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: futbol o café"
                        onChange={e => setInputBusqueda(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        placeholder="Buscar"
                    />
                </div>
            </div>
            { error ? <Error mensaje="Agregar un término de búsqueda"/> : null}
        </form>
     );
}
 
export default Formulario;