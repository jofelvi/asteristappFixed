import {
  TRAER_DETALLE_PUBLICIDAD,
  CARGANDO,
  ERROR2,
  TRAER_PUBLICIDADES
} from "./Constants";

export const INITIAL_STATE = {
  publicidades: [],
  detallePublicidad: [],
  cargando: false,
  error2: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CARGANDO:
      return {
        ...state,
        cargando: true
      }
    case TRAER_PUBLICIDADES:
      return {
        ...state,
        publicidades: action.payload,
        cargando: false
      };
    case TRAER_DETALLE_PUBLICIDAD:
      return {
        ...state,
        detallePublicidad: action.payload,
        cargando: false
      };
    case ERROR2:
      return {
        ...state,
        error2: action.payload,
        cargando: false
      };

    default:
      return state;
  }
};
