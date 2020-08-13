import {
  TRAER_NOTICIAS,
  CARGANDO,
  ERROR2,
  TRAER_DETALLE_NOTICIAS,
  NO_CARGANDO,
  RESET_DETALLE_NOTICIA,
  TRAER_CATEGORIAS,
  TRAER_ETIQUETAS
} from "./Constants";
import axios from 'axios';

const session_url = 'https://licencias.fapd.org/user/login?_format=json';
const urlDetalleNoticias = 'https://fapd.org/json-articulo?id=';
const URL_CATEGORIAS = 'https://fapd.org/json-categorias?_format=json';
const URL_ETIQUETAS = 'https://fapd.org/json-etiquetas?_format=json'


export const traerNoticias = (page) => async (dispatch) => {
  dispatch({
    type: CARGANDO
  });
  try {
    axios.get(`https://fapd.org/json-noticias?page=` + page)
      .then(respuesta => {
        console.log("###################### ENtro funtion  action traerNoticias #######################")
        return (
          dispatch({
            type: TRAER_NOTICIAS,
            payload: respuesta.data,
          }),
          dispatch({
            type: NO_CARGANDO
          })
        )
      });
  } catch (error) {
    console.log("error" + error.message)
    return (
      dispatch({
        type: ERROR2,
        payload: error.message,
      }),
      dispatch({
        type: NO_CARGANDO
      })
    )
  }
}
export const traerDetalleNoticia = (item) => async (dispatch) => {
  dispatch({
    type: NO_CARGANDO
  })
  dispatch({
    type: CARGANDO
  });
  try {
    axios.get(urlDetalleNoticias + item)
      .then(respuesta => {
        console.log("###################### ENtro respuesta ok #######################")
        return (
          dispatch({
            type: TRAER_DETALLE_NOTICIAS,
            payload: respuesta.data,
          }),
          dispatch({
            type: NO_CARGANDO
          })
        )
      })
  } catch (error) {
    return (
      dispatch({
        type: ERROR2,
        payload: error.message,
      }),
      dispatch({
        type: NO_CARGANDO
      })
    )
  }
}

export const resetDetalleNoticia = () => async (dispatch) => {
  dispatch({
    type: NO_CARGANDO
  }),
    dispatch({
      type: RESET_DETALLE_NOTICIA
    })


}

export const traerCategorias = () => async (dispatch) => {
  dispatch({
    type: CARGANDO
  })

  try {
    axios.get(URL_CATEGORIAS)
      .then(respuesta => {
        const arr = Object.keys(respuesta.data).map((i) => {
          respuesta.data[i].id = i;
          return respuesta.data[i];
        })
        return (
          dispatch({
            type: TRAER_CATEGORIAS,
            payload: arr,
          }),
          dispatch({
            type: NO_CARGANDO
          })
        )
      })
  } catch (error) {
    console.log(JSON.stringify(error) + "###################### ENtro Traer categorias  error #######################")
    return (
      dispatch({
        type: ERROR2,
        payload: error.message,
      }),
      dispatch({
        type: NO_CARGANDO
      })
    )
  }
}


export const traerEtiquetas = () => async (dispatch) => {
  dispatch({
    type: CARGANDO
  })
  try {
    axios.get(URL_ETIQUETAS)
      .then(respuesta => {
        const arr = Object.keys(respuesta.data).map((i) => {
          respuesta.data[i].id = i;
          return respuesta.data[i];
        })
        return (
          dispatch({
            type: TRAER_ETIQUETAS,
            payload: arr,
          }),
          dispatch({
            type: NO_CARGANDO
          })
        )
      })
  } catch (error) {
    console.log(JSON.stringify(error) + "###################### ENtro Traer categorias  error #######################")
    return (
      dispatch({
        type: ERROR2,
        payload: error.message,
      }),
      dispatch({
        type: NO_CARGANDO
      })
    )
  }
}




export const FiltarNoticias = (page) => async (dispatch) => {
  dispatch({
    type: CARGANDO
  });
  try {
    axios.get(`https://fapd.org/json-noticias?page=` + page)
      .then(respuesta => {
        console.log("###################### ENtro funtion  action traerNoticias #######################")
        return (
          dispatch({
            type: TRAER_NOTICIAS,
            payload: respuesta.data,
          }),
          dispatch({
            type: NO_CARGANDO
          })
        )
      });
  } catch (error) {
    console.log("error" + error.message)
    return (
      dispatch({
        type: ERROR2,
        payload: error.message,
      }),
      dispatch({
        type: NO_CARGANDO
      })
    )
  }
}