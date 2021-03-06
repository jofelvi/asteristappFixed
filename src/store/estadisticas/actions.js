import {
  CARGANDO,
  ERROR2,
  TRAER_ESTADISTICAS,
  NO_CARGANDO,
} from "./Constants";
import axios from 'axios';

export const traerEstadisticas = (token) =>  (dispatch) => {
  dispatch({
    type: CARGANDO,
    payload: true
  });

  const URLperfil = 'https://licencias.fapd.org/json-estadisticas-club';
  const headers = {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": "Bearer " + token
    }
  }
  try {
    
   axios.get(URLperfil, { headers })
      .then(respuesta => {
        console.log("exito entro funcion  respuesta API traerEstadisticas")
        //console.log(respuesta.data)
        dispatch({
          type: TRAER_ESTADISTICAS,
          payload:  respuesta.data,
      
        })
        dispatch({
          type: CARGANDO,
          payload: false
        });
      })
  } catch (error) {
    console.log("error API TRAER PERFIL" + error.message)
    dispatch({
      type: ERROR2,
      payload: error.message
    })
    dispatch({
      type: CARGANDO,
      payload: false
    });
  }
}
