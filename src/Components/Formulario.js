import React, { Fragment, useState } from 'react'
import uuid from 'uuid/dist/v4'
import PropTypes from 'prop-types';

export default function Formulario ({crearCita}) {

     //Crear State de Citas
     const [cita, setCita] = useState ({
          mascota:'',
          propietario:'',
          fecha: '',
          hora:'',
          sintomas:''
     });

     const [error, setError] = useState(false);

     //Función que se ejecuta cada que el usuario escribe en un input
     const handleChange = e => {
          setCita({
               ...cita,
               [e.target.name]: e.target.value 
          });
     };

     //Extraer valores
     const {mascota, propietario, fecha, hora, sintomas} = cita;

     //Cuando el usuario presiona agregar cita o enviar formulario

     const submitCita = e => {
          e.preventDefault();

          //Validar
          if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''  ){
               setError(true);
               return;
          }

          //Eliminar el mensaje previo
          setError(false);

          //Asignar un ID
          cita.id = uuid();

          //Crear la cita
          crearCita(cita);

          //Reiniciar el form

          setCita({
               mascota:'',
               propietario:'',
               fecha: '',
               hora:'',
               sintomas:''
          });
     }

     return (
          <Fragment>
               <h2>Crear cita</h2>

               {error ? <p className="alerta-error">Todos los campos son obligatorios</p>: null}

               <form 
                    onSubmit={submitCita}
               >
                    <label>Nombre Mascota</label>
                    <input
                         type="text"
                         name="mascota"
                         className="u-full-width"
                         placeholder="Nombre Mascota"
                         onChange={handleChange}
                         value={mascota}
                    />
                    <label>Nombre Dueño</label>
                    <input
                         type="text"
                         name="propietario"
                         className="u-full-width"
                         placeholder="Nombre Dueño de la mascota"
                         onChange={handleChange}
                         value={propietario}
                    />
                    <label>Fecha</label>
                    <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleChange}
                    value={fecha}
                    />
                    <label>Hora</label>
                    <input
                         type="time"
                         name="hora"
                         className="u-full-width"
                         onChange={handleChange}
                         value={hora}
                    />    
                    <label>Síntomas</label>
                    <textarea
                    name="sintomas"
                    className="u-full-width"
                    onChange={handleChange}
                    value={sintomas}
                    ></textarea>
                    <button
                         type="submit"
                         className="u-full-width button-primary"
                    >Agregar Cita</button>
               </form>
          </Fragment>
     )
}

Formulario.propTypes = {
     crearCita: PropTypes.func.isRequired
}
