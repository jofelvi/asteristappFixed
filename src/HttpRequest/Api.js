import axios from "axios";

//urls
const LoginUrl = 'https://licencias.fapd.org/user/login?_format=json';
const urlDetalleNoticias = 'https://fapd.org/json-articulo?id=';
const URLenviarCorreo = 'https://licencias.fapd.org/enviaremail';
const URLLICEMAIL = 'https://licencias.fapd.org/enviaremail';
const URLgetLicenciasVigor = 'https://licencias.fapd.org/json-licencias-vigentes?_format=json';
const URLLicenciascaducadas = 'https://licencias.fapd.org/json-licencias-vigentes?_format=json';
const URLGETLISUSERCLUB = 'https://licencias.fapd.org/json-deportistas-club?_format=json';

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

export const solicitudLicenciaEmail = async (uid, SelecModalidadLic, observaciones, access_token) => {
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


//licencias en vigor
export const getLicenciasVigor = async (token) => {

  let api
  try {
    api = await axios.get(URLgetLicenciasVigor, {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    ).then((respuesta) => {
      console.log('###################### ACTION AQUI RESPUESTA API traerLicenciasVig #######################');
      return respuesta.data
    })
  } catch (e) {
    console.log(e)
  }
  return api
}

//Licencias caducadas

export const getLicCaducadas = async (token) => {

  let api
  try {
    api = await axios.get(URLLicenciascaducadas, {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    ).then((respuesta) => {
      console.log('###################### ACTION AQUI RESPUESTA API traerLicenciasCaducadas #######################');
      return respuesta.data
    });
  } catch (error) {
    console.log(error)
  }
  return api
}

//Gestion deportista
export const getDeportistas = async (token) => {
  let api
  let headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    }
  };
  try {
    api = await axios.get(URLGETLISUSERCLUB, {headers}).then((respuesta) => {
      console.log('########## ACTION AQUI RESPUESTA API TRAER_DEPORTISTAS ##############');
      return respuesta.data
    });
  } catch (error) {
    console.log('error' + error.message);

  }
  return api

};


//get club que pertenece usuario

export const getCLubsUser = async (token, uid) => {
  const URLperfil = `https://licencias.fapd.org/user/${uid}?_format=json`;
  let api
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  };
  try {
    api = axios.get(URLperfil, {headers}).then((respuesta) => {
      console.log('exito entro funcion  respuesta API TRAER PERFIL');
      const {
        roles,
        field_user_gestionclub,
      } = respuesta.data;
      if (roles.filter((e) => e.target_id === 'club').length > 0) {
        console.log(field_user_gestionclub[0].target_id);
        return field_user_gestionclub[0].target_id
      }
    });
  } catch (e) {
    console.log(e)
  }
  return api

}
//get liquidaciones
export const getLiquidaciones = async (token, nidClub, year) => {
  console.log(token + ' token ');
  console.log(JSON.stringify(nidClub) + ' nidClub ');
  console.log(year + ' year ');
  console.log('entro a traer liquidaciones');
  const URLGETLLIQUIDACIONES = `https://licencias.fapd.org/json-liquidaciones/${nidClub}/${year}?_format=json`;
  let api

  try {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    api = await axios.get(URLGETLLIQUIDACIONES, {headers}).then((respuesta) => {
      console.log('##### ACTION AQUI RESPUESTA API traerLiquidaciones###');
      return respuesta.data
    });
  } catch (error) {
    console.log('error' + error.message);
  }
  return api
};


// detalles liquidaciones de licencias

export const getDetalleLiquidacion = async (token, item) => {
  const URLLIC = `https://licencias.fapd.org/json-licencias-liquidacion/${item}?_format=json`;
  let api
  try {
    api = axios.get(URLLIC, {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    ).then((respuesta) => {
      console.log('exito entro funcion  respuesta API TRAER Licencias liquidaciones');
      console.log("respuesta api " + JSON.stringify(respuesta.data))
      return respuesta.data
      //dispatch(traerLicenciasLiquidaciones(respuesta.data))
    });
  } catch (error) {
    setIsloadin(false)
  }
  return api

}


//get Licencias por año

export const getLicByYear = async (nidClub, year, token) => {

  const URLicenciasVgYear = `https://licencias.fapd.org/json-licencias-vigentes-club/${nidClub}/${year}?_format=json`;
  let api
  try {
    api = await axios.get(URLicenciasVgYear, {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }).then((respuesta) => {
      console.log('exito entro funcion  respuesta API TRAER PERFIL');
      return respuesta.data
    });
  } catch (error) {
    console.log(error)
  }
  return api
}
