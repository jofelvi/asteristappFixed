import {
  TRAER_USUARIO,
  CARGANDO,
  ERROR2,
  TRAER_PERFIL,
  NO_CARGANDO,
  ROLES_USER,
  ISLOAD,
  APELLIDO1,
  NOISLOAD,
  TRAER_DEPORTISTAS,
  RESET_USER,
  RESET_ROLES,
  STATUS,
  TRAER_LIQUIDACIONES,
  CSRF_TOKEN,
  TOKEN,
  LOGOUT_TOKEN,
  UID,
  CLUB_ID_ENCARGADO,
  CLUB_ID,
  RESET_STATUS
} from './Constants';
import axios from 'axios';
const session_url = 'https://licencias.fapd.org/user/login?_format=json';

export const traerUsuario = (username, password) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });
const respuesta = axios({
      method: 'post',
      url: session_url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name: `${username}`,
        pass: `${password}`,
      }
    }).then((respuesta) => {
      console.log('funcion login');
      const {
        current_user,
        csrf_token,
        access_token,
        logout_token,
      } = respuesta.data;
      const {roles, uid} = current_user;
        dispatch({
          type: TRAER_USUARIO,
          payload: respuesta.data,
        })
        dispatch({
          type: ROLES_USER,
          payload: roles,
        })
        dispatch({
          type: NO_CARGANDO,
        })
        dispatch({
          type: TOKEN,
          payload: access_token,
        })
        dispatch({
          type: CSRF_TOKEN,
          payload: csrf_token,
        })
        dispatch({
          type: LOGOUT_TOKEN,
          payload: logout_token,
        })
        dispatch({
          type: UID,
          payload: uid,
        })
    }).catch(function (error) {
      console.log(error.response.status+  "status error aqui");
      dispatch({
        type: ERROR2,
        payload: error,
      })
      dispatch({
        type: NO_CARGANDO,
      })
      dispatch({
        type: STATUS,
        payload: error.response.status,
      })
      console.log("final" )
    });

};
export const cerrarSession = (username, password) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });
        dispatch({
          type: TRAER_USUARIO,
          payload: [],
        })
        dispatch({
          type: ROLES_USER,
          payload: [],
        })
        dispatch({
          type: NO_CARGANDO,
        })
        dispatch({
          type: TOKEN,
          payload: "",
        })
        dispatch({
          type: CSRF_TOKEN,
          payload: "",
        })
        dispatch({
          type: LOGOUT_TOKEN,
          payload: "",
        })
        dispatch({
          type: UID,
          payload: "",
        })

};
export const traerPerfil = (uid, token) => (dispatch) => {
  dispatch({
    type: CARGANDO,
  });
  dispatch({
    type: ISLOAD,
  });
  const URLperfil = `https://licencias.fapd.org/user/${uid}?_format=json`;
  let headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  };
  try {
    axios.get(URLperfil, {headers}).then((respuesta) => {
      console.log('exito entro funcion  respuesta API TRAER PERFIL');
      const {
        field_user_apellido1,
        field_user_clubs,
        roles,
        field_user_gestionclub,
      } = respuesta.data;
      
       dispatch({
        type: TRAER_PERFIL,
        payload: respuesta.data,
      }),
        dispatch({
          type: APELLIDO1,
          payload: String(field_user_apellido1[0].value),
        }),
        dispatch({
          type: CLUB_ID,
          payload: field_user_clubs[0].target_id,
        }),
        dispatch({
          type: NO_CARGANDO,
        });
      if (roles.filter((e) => e.target_id === 'club').length > 0) {
        console.log('rol club');
        console.log(field_user_gestionclub[0].target_id);
        dispatch({
          type: CLUB_ID_ENCARGADO,
          payload: field_user_gestionclub[0].target_id,
        });
      }
    });
  } catch (error) {
    console.log('error API TRAER PERFIL' + error.message);
    dispatch({
      type: ERROR2,
      payload: error.message,
    }),
      dispatch({
        type: NO_CARGANDO,
      });
  }
  dispatch({
    type: NOISLOAD,
  });
};

export const traerPerfilInicial = (uid, token) => (dispatch) => {
  const URLperfil = `https://licencias.fapd.org/user/${uid}?_format=json`;
  const headersToken = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };
  try {
    axios.get(URLperfil, {headersToken}).then((respuesta) => {
      console.log('exito entro funcion  respuesta API TRAER PERFIL');
      const {
        field_user_apellido1,
        field_user_clubs,
        roles,
        field_user_gestionclub,
      } = respuesta.data;

      dispatch({
        type: TRAER_PERFIL,
        payload: respuesta.data,
      }),
        dispatch({
          type: APELLIDO1,
          payload: String(field_user_apellido1[0].value),
        }),
        dispatch({
          type: CLUB_ID,
          payload: field_user_clubs[0].target_id,
        }),
        dispatch({
          type: NO_CARGANDO,
        });
      if (roles.filter((e) => e.target_id === 'club').length > 0) {
        console.log('rol club');
        console.log(field_user_gestionclub[0].target_id);
        dispatch({
          type: CLUB_ID_ENCARGADO,
          payload: field_user_gestionclub[0].target_id,
        });
      }
    });
  } catch (error) {
    console.log('error API TRAER PERFIL' + error.message);
    dispatch({
      type: ERROR2,
      payload: error.message,
    });
  }
};
export const isload = () => (dispatch) => {
  dispatch({
    type: ISLOAD,
  });
};

export const editarPerfil = (uid, token, data) => (dispatch) => {
  console.log(token);
  const URLperfil = `https://licencias.fapd.org/user/${uid}?_format=json`;

  try {
    console.log('entro try');
    axios(
      {
        method: 'patch',
        url: URLperfil,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        data: data,
      },
      console.log('antes then'),
    ).then((respuesta) => {
      console.log('exito entro funcion  respuesta API editarPerfil');
      console.log(respuesta.status);
      return (
        dispatch({
          type: STATUS,
          payload: respuesta.status,
        }),
        dispatch({
          type: NO_CARGANDO,
        })
      );
    });
  } catch (error) {
    console.log('error API TRAER PERFIL' + error.message);
    dispatch({
      type: ERROR2,
      payload: error.message,
    });
  }
};

export const traerDeportistas = (token) => (dispatch) => {
  console.log('entro a traer deportista');
  const URLGETLISUSERCLUB ='https://licencias.fapd.org/json-deportistas-club?_format=json';

    dispatch({
      type: CARGANDO,
    });
  try {
    let headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };
    axios.get(URLGETLISUSERCLUB, {headers}).then((respuesta) => {
      console.log(
        '###################### ACTION AQUI RESPUESTA API TRAER_DEPORTISTAS #######################',
      );
      dispatch({
        type: TRAER_DEPORTISTAS,
        payload: respuesta.data,
      })
      dispatch({
        type: NO_CARGANDO,
      })
    });
  } catch (error) {
    console.log('error' + error.message);
    dispatch({
      type: ERROR2,
      payload: error.message,
    })
    dispatch({
      type: NO_CARGANDO,
    })
  }
};

export const traerLiquidaciones = (token, nidClub, year) => (dispatch) => {
  console.log(token + ' token ');
  console.log('entro a traer liquidaciones');
  const URLGETLLIQUIDACIONES = `https://licencias.fapd.org/json-liquidaciones/${nidClub}/${year}?_format=json`;

  try {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };
    axios.get(URLGETLLIQUIDACIONES, {headers}).then((respuesta) => {
      console.log(
        '###################### ACTION AQUI RESPUESTA API traerLiquidaciones #######################',
      );
      console.log(respuesta.data);
      dispatch({
        type: TRAER_LIQUIDACIONES,
        payload: respuesta.data,
      });
    });
  } catch (error) {
    console.log('error' + error.message);
    dispatch({
      type: ERROR2,
      payload: error.message,
    });
  }
};


export const resetStatus = () => async (dispatch) => {
  dispatch({
    type: RESET_STATUS,
  });
};
