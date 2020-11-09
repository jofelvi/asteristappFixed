import {ERROR2, INFO, STATUS} from "../store/auth/Constants";
import axios from "axios";

const LoginUrl = 'https://licencias.fapd.org/user/login?_format=json';
const urlDetalleNoticias = 'https://fapd.org/json-articulo?id=';
let URLenviarCorreo = 'https://licencias.fapd.org/enviaremail';
const URLLICEMAIL = 'https://licencias.fapd.org/enviaremail';

//LOGIN


//HOME LISTA NOTICIAS
export const getNoticias = async (page) => {
  console.log("get noticias")
  let api
  try {
    api = await axios.get(`https://fapd.org/json-noticias?page=` + page)
      .then(respuesta => {
        console.log("###################### Entro funtion Action get noticias #######################")
        return respuesta.data
      });
  } catch (error) {
    console.log("error" + error.message)
  }

  return api
}

//FILTRAR NOTICAS
export const getFiltrarNoticias = async (categoria, etiqueta) => {

  let URLNOTICIASFILTER = `https://fapd.org/json-noticias?categorias=${categoria}&etiquetas=${etiqueta}`
  let api

  try {
    api = await axios.get(URLNOTICIASFILTER)
      .then(respuesta => {
        console.log("###################### Entro funtion Action get noticias #######################")
        return respuesta.data
      });
  } catch (error) {
    console.log("error" + error.message)
  }

  return api
};

//GET PUBLICIDAD
export const getPublicidad = async () => {
  let api
  try {
    api = await axios
      .get(`https://fapd.org/json-publicidad`)
      .then((res) => {
        return res.data
      })
  } catch (error) {
    console.log("error" + error.message)
  }
  return api
};

//get details noticias
export const getDetalleNoticia = (item) => async (dispatch) => {
  let api
  try {
    api = axios.get(urlDetalleNoticias + item)
      .then(respuesta => {
        console.log("###################### ENtro respuesta ok #######################")
        return respuesta.data
      })
  } catch (error) {
    console.log(error)
  }
  return api
}

//api enviar correo
export const enviarCorreo = (nombre1, email1, asunto1, mensaje1, listCheck1) => {
  let api
  try {
    api = axios({
      method: 'post',
      url: URLenviarCorreo,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        'nombre': `${nombre1}`,
        'email': `${email1}`,
        'asunto': `${asunto1}`,
        'mensaje': `${mensaje1}`,
        'checks': `${listCheck1}`,
      },
    }).then((respuesta) => {
      console.log('#### ACTION AQUI RESPUESTA API enviaremail ######## ', respuesta.status);
      //setstatus(respuesta.status)
      return respuesta.status
    })
  } catch (e) {
    console.log(e)
  }
  return api
}

//solicitud Nueva licencia

export const solicitudLicenciaEmail = async (uid,SelecModalidadLic,observaciones, access_token) => {
  let api
  try {
   api = await axios({
      method: 'post',
      url: URLLICEMAIL,
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
      console.log('###### ACTION AQUI RESPUESTA API SolicitarLicencias ######### Status:', respuesta.status);
      return respuesta.status;
    });

  } catch (error) {
    console.log(error)
  }
  return api
};
