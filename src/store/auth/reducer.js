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
} from './Constants';

export const INITIAL_STATE = {
  usuario: [],
  cargando: false,
  error2: '',
  perfil: [],
  rolesUser: ['invitado'],
  isLoad: false,
  mail: '',
  field_user_apellido1: '',
  field_user_apellido2: '',
  field_user_baja: '',
  field_user_clubs: '',
  field_user_codpostal: '',
  field_user_codpostal_alter: '',
  field_user_fechanac: '',
  field_user_gestionclub: '',
  field_user_nif: '',
  field_user_nombre: '',
  field_user_nomcompleto: '',
  field_user_pais: '',
  field_user_pais_alter: '',
  field_user_poblacion: '',
  field_user_poblacion_alter: '',
  field_user_provincia: '',
  field_user_provincia_alter: '',
  field_user_sexo: '',
  field_user_telefono1: '',
  field_user_telefono2: '',
  field_user_tutor_nif: '',
  field_user_tutor_nombre: '',
  field_user_tutor_observaciones: '',
  listDeportistas: [],
  status: '',
  listLiquidaciones: [],
  csrf_token: '',
  access_token: '',
  logout_token: '',
  uid: '',
  clubId: ['0'],
  clubIdEncargado: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CARGANDO:
      return {
        ...state,
        cargando: true,
      };
    case NO_CARGANDO:
      return {
        ...state,
        cargando: false,
      };
    case TRAER_USUARIO:
      return {...state, usuario: action.payload};
    case TRAER_PERFIL:
      return {...state, perfil: action.payload};
    case ERROR2:
      return {...state, error2: action.payload};
    case ROLES_USER:
      return {...state, rolesUser: action.payload};
    case ISLOAD:
      return {...state, isLoad: true};
    case NOISLOAD:
      return {...state, isLoad: false};
    case TRAER_DEPORTISTAS:
      return {...state, listDeportistas: action.payload};
    case APELLIDO1:
      return {...state, field_user_apellido1: action.payload};
    case RESET_ROLES:
      return {...state, rolesUser: ['invitado']};
    case RESET_USER:
      return {...state, usuario: []};
    case STATUS:
      return {...state, status: action.payload};
    case TRAER_LIQUIDACIONES:
      return {...state, listLiquidaciones: action.payload};
    case CSRF_TOKEN:
      return {...state, csrf_token: action.payload};
    case TOKEN:
      return {...state, access_token: action.payload};
    case UID:
      return {...state, uid: action.payload};
    case LOGOUT_TOKEN:
      return {...state, logout_token: action.payload};
    case CLUB_ID_ENCARGADO:
      return {...state, clubIdEncargado: action.payload};
    case CLUB_ID:
      return {...state, clubId: action.payload};
    default:
      return state;
  }
};
