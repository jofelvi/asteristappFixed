import {
  TRAER_LICENCIAS_VIGENTES,
  CARGANDO,
  ERROR2,
  TRAER_DETALLE_LICENCIAS_VIGENTES,
  TRAER_LICENCIAS_VIGENTES_ROLES,
  SOLICITAR_LICENCIAS,
  TRAER_LICENCIAS_CADUCADAS,
  NO_CARGANDO,
  MODALIDAD_LICENCIA,
  STATUS,
  RESET_STATUS,
  TRAER_LICENCIAS_VIGENTES_LIQUI,
  TRAER_LICENCIAS_VIGENTES_YEARS,
} from './Constants';
import axios from 'axios';
const URL_LIC_CADU =
  'https://licencias.fapd.org/json-licencias-caducadas?_format=json';
const URL = 'https://licencias.fapd.org/json-licencias-vigentes?_format=json';
const urlDetalleNoticias = 'https://fapd.org/json-articulo?id=';

export const traerLicenciasVig = (token) => async (dispatch) => {
 

  try {

    dispatch({
      type: CARGANDO,
      payload: true
    })

    let headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    axios.get(URL, {headers}).then((respuesta) => {

      console.log('###################### ACTION AQUI RESPUESTA API traerLicenciasVig #######################');
    
        dispatch({
          type: TRAER_LICENCIAS_VIGENTES,
          payload: respuesta.data,
        })

        dispatch({
          type: CARGANDO,
          payload: false  
        })
      
    });
  } catch (error) {
    console.log("esta en error")
    console.log('error' + error.message);
    dispatch({
      type: ERROR2,
      payload: error.message,
    })
    dispatch({
      type: CARGANDO,
      payload: false
    });
  }
  dispatch({
    type: CARGANDO,
    payload: false
  });
};

export const traerLicenciasVigRoles = (uid, token) => async (dispatch) => {

  const URLicenciasVgRoles = `https://licencias.fapd.org/json-licencias-vigentes-deportista/${uid}?_format=json`;

  dispatch({
    type: CARGANDO,
    payload: true
  });

  try {

    let headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    axios.get(URLicenciasVgRoles, {headers}).then((respuesta) => {
      console.log(
        'ACTION AQUI RESPUESTA API traerLicenciasVigRoles NUEVO',
      );
      
        dispatch({
          type: TRAER_LICENCIAS_VIGENTES_ROLES,
          payload: respuesta.data,
        })

      dispatch({
          type: CARGANDO,
          payload: false
        });
      
    })
  } catch (error) {
    console.log('error' + error.message);
    dispatch({
      type: ERROR2,
      payload: error.message,
    }),
    dispatch({
      type: CARGANDO,
      payload: false
    });
  }
};

export const traerLicenciasCadu = (token) => async (dispatch) => {

  dispatch({
    type: CARGANDO,
    payload: true
  });

  try {
    let headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };
    axios.get(URL_LIC_CADU, {headers}).then((respuesta) => {
      console.log(
        '###################### ACTION AQUI RESPUESTA API traerLicenciasCadu #######################',
      );
      
        dispatch({
          type: TRAER_LICENCIAS_CADUCADAS,
          payload: respuesta.data,
        })

        dispatch({
        type: CARGANDO,
        payload: false
      })
      
    });
  } catch (error) {
    console.log('error' + error.message);
    dispatch({
      type: ERROR2,
      payload: error.message,
    }),
    dispatch({
      type: CARGANDO,
      payload: false
    });
  }
};

export const SolicitarLicencias = (
  access_token,
  SelecModalidadLic,
  observaciones,
  uid,
) => async (dispatch) => {
  const URLSOLICITARLICENCIA = 'https://licencias.fapd.org/enviaremail';

  dispatch({
    type: CARGANDO,
    payload: true
  });

  try {
    axios({
      method: 'post',
      url: URLSOLICITARLICENCIA,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token,
      },
      data: {
        uid: `${uid}`,
        modalidad: `${SelecModalidadLic}`,
        observaciones: `${observaciones}`,
      },
    }).then((respuesta) => {

      console.log('###### ACTION AQUI RESPUESTA API SolicitarLicencias #########');

       dispatch({
        type: STATUS,
        payload: respuesta.status,
      })

      dispatch({
        type: CARGANDO,
        payload: false
      })

    });
  } catch (error) {
    console.log('error' + error.message);
    dispatch({
      type: ERROR2,
      payload: error.message,
    }),
    dispatch({
      type: CARGANDO,
      payload: false
    });
  }
};

export const traerDetalleNoticia = (item) => async (dispatch) => {

  dispatch({
    type: CARGANDO,
    payload: true
  });

  try {
    const respuesta = axios.get(urlDetalleNoticias + item).then((respuesta) => {
      console.log('exito entro funcion  respuesta detalle noticia');

       dispatch({
        type: TRAER_DETALLE_NOTICIAS,
        payload: respuesta.data,
      })

      dispatch({
        type: CARGANDO,
        payload: false
      })

    });
  } catch (error) {
    console.log('error' + error.message);
    dispatch({
      type: ERROR2,
      payload: error.message,
    })

    dispatch({
      type: CARGANDO,
      payload: false
    });
  }
};

export const solicitarModalidades = (token) => async (dispatch) => {
  const URLGETMODALIDADES = `https://licencias.fapd.org/json-modalidades?_format=json`;
  dispatch({
    type: CARGANDO,
    payload: true
  })

  try {
    let headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };
    axios.get(URLGETMODALIDADES, {headers}).then((respuesta) => {
      console.log('###################### ACTION AQUI RESPUESTA API solicitarModalidades #######################');
      
        dispatch({
          type: MODALIDAD_LICENCIA,
          payload: respuesta.data,
        })
        dispatch({
          type: CARGANDO,
          payload: false
        });
     
    });
  } catch (error) {
    console.log('error' + error.message);
    dispatch({
      type: ERROR2,
      payload: error.message,
    })  
    dispatch({
      type: CARGANDO,
      payload: false
    });
  }
};

export const enviarCorreo = (
  nombre,
  email,
  asunto,
  mensaje,
  listCheck,
) => async (dispatch) => {
  const URLenviarCorreo = 'https://licencias.fapd.org/enviaremail';

  dispatch({
    type: CARGANDO,
    payload: true
  });

  axios({
    method: 'post',
    url: URLenviarCorreo,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      nombre: `${nombre}`,
      email: `${email}`,
      asunto: `${asunto}`,
      mensaje: `${mensaje}`,
      checks: `${listCheck}`,
    },
  })
    .then((respuesta) => {
      console.log(
        '###################### ACTION AQUI RESPUESTA API enviaremail ####################### ' +
          respuesta.status,
      );
      
        dispatch({
          type: STATUS,
          payload: respuesta.status,
        })

      dispatch({
          type: CARGANDO,
          payload: false
        });
    }).catch((error) => {

      dispatch({
        type: ERROR2,
        payload: error.message,
      })

      dispatch({
        type: CARGANDO,
        payload: false
      })

    });
};

export const resetStatus = () => async (dispatch) => {
  dispatch({
    type: RESET_STATUS,
  });
};

export const traerLicenciasLiquidaciones = (respuesta) => async (dispatch) => {
  dispatch({
    type: TRAER_LICENCIAS_VIGENTES_LIQUI,
    payload: respuesta,
  });
};

export const traerLicenciasYears = (nidClub, year, token) => async (dispatch,) => {

  const URLicenciasVgYear = `https://licencias.fapd.org/json-licencias-vigentes-club/${nidClub}/${year}?_format=json`;

  dispatch({
    type: CARGANDO,
    payload: true
  });

  try {
    let headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    axios.get(URLicenciasVgYear, {headers}).then((respuesta) => {
      console.log(
        '###################### ACTION AQUI RESPUESTA API traerLicenciasYears #######################',
      );
        dispatch({
          type: TRAER_LICENCIAS_VIGENTES_YEARS,
          payload: respuesta.data,
        })
        dispatch({
          type: CARGANDO,
          payload: false
        });
    });
  } catch (error) {
    console.log('error' + error.message);
      dispatch({
        type: CARGANDO,
        payload: false
      });
  }
    dispatch({
      type: CARGANDO,
      payload: false
    });
};
