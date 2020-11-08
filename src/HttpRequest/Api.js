import {
  CARGANDO,
  CSRF_TOKEN,
  ERROR2, INFO,
  LOGOUT_TOKEN,
  ROLES_USER, STATUS,
  TOKEN,
  TRAER_USUARIO,
  UID
} from "../store/auth/Constants";
import axios from "axios";

const LoginUrl = 'https://licencias.fapd.org/user/login?_format=json';

export const LoginRedux = (username, password) => async (dispatch) => {

  const respuestaApi = await axios({
    method: 'post',
    url: LoginUrl,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      name: `${username}`,
      pass: `${password}`,
    },
  }).then((respuesta) => {
    console.log('Redux login');
    const {
      current_user,
      csrf_token,
      access_token,
      logout_token,
    } = respuesta.data;
    const {roles, uid} = current_user;
    dispatch({
      type: INFO,
      payload: {
        csrf_token:csrf_token ,
        access_token: access_token ,
        logout_token: logout_token,
        uid: uid,
        nombre: current_user.name,
        roles: roles
      },
    })
  }).catch(function (error) {
      console.log(error.response.status + 'status error aqui');
      dispatch({
        type: ERROR2,
        payload: error,
      });
      dispatch({
        type: STATUS,
        payload: error.response.status,
      });
    });

  return respuesta
};
