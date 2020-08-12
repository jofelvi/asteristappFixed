import {
  TRAER_PUBLICIDADES,
  CARGANDO,
  ERROR2,
  TRAER_DETALLE_PUBLICIDAD
} from "./Constants";
import axios from 'axios';
const session_url = 'https://licencias.fapd.org/user/login?_format=json';
const urlDetallePublicidad = 'https://fapd.org/json-publicidad=';


export const traerPublicidades = (page) => async (dispatch) => {
  dispatch({
    type: CARGANDO
  });
  try {
    const respuesta =
      axios.get(`https://fapd.org/json-noticias?page=` + page)
        .then(respuesta => {
          console.log("###################### ENtro funtion  action traerNoticias #######################")
          return dispatch({
            type: TRAER_PUBLICIDADES,
            payload: respuesta.data,
          })
        })
  } catch (error) {
    console.log("error" + error.message)
    dispatch({
      type: ERROR2,
      payload: error.message,
    })
  }
}

export const traerDetallePublicidad = (item) => async (dispatch) => {
  dispatch({
    type: CARGANDO
  });
  try {
    axios.get(urlDetallePublicidad + item)
      .then(respuesta => {
        console.log("###################### ENtro respuesta ok #######################")
        return dispatch({
          type: TRAER_DETALLE_PUBLICIDAD,
          payload: respuesta.data,
        })
      })
  } catch (error) {
    //console.log("error" + error.message)
    dispatch({
      type: ERROR2,
      payload: error.message,
    })
  }
}




