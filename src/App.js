import React, { Fragment, useState, useEffect} from 'react';
import Formulario from './Components/Formulario';
import Cita from './Components/Cita';

function App() {

  //Citas en Local Storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  //Arreglo de Citas

  const [citas, setCitas] = useState (citasIniciales);

  // Use Effect para realizar ciertas operaciones cuando el state cambia
  
  useEffect ( () => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales])

  // Función que tome las citas actuales y agregue las nuevas 

  const crearCita = cita => {
    setCitas ([
      ...citas,
      cita
    ]);
  }


  //Función para eliminar una cita por su ID
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    setCitas(nuevasCitas);
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';


  return (
    <Fragment>

        <h1>Administrador de pacientes</h1>

        <div className="container">

          <div className="row">
            <div className="one-half column">
              <Formulario
              crearCita={crearCita} 
              />
            </div>
            <div className="one-half column">
              <h2>{titulo}</h2>
              {citas.map(cita => (
                <Cita 
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))}
            </div>
          </div>

        </div>
    </Fragment>
  );
}

export default App;
