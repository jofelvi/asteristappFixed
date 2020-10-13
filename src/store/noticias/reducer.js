import {
  TRAER_DETALLE_NOTICIAS,
  CARGANDO,
  ERROR2,
  TRAER_NOTICIAS,
  NO_CARGANDO,
  RESET_DETALLE_NOTICIA,
  TRAER_CATEGORIAS,
  TRAER_ETIQUETAS
} from "./Constants";

export const INITIAL_STATE = {
  noticias: [],
  detalleNoticia: [],
  cargando: false,
  error2: "",
  categoriasNoticias: [],
  etiquetasNoticias: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CARGANDO:
      return {
        ...state,
        cargando: action.payload
      }
    case NO_CARGANDO:
      return {
        ...state,
        cargando: action.payload
      }
    case TRAER_NOTICIAS:
      return {
        ...state,
        noticias: action.payload,
      };
    case TRAER_DETALLE_NOTICIAS:
      return {
        ...state,
        detalleNoticia: action.payload,
      };
    case RESET_DETALLE_NOTICIA:
      return {
        ...state,
        detalleNoticia: [],
      };
    case TRAER_CATEGORIAS:
      return {
        ...state,
        categoriasNoticias: action.payload,
      };
    case TRAER_ETIQUETAS:
      return {
        ...state,
        etiquetasNoticias: action.payload,
      };
    case ERROR2:
      return {
        ...state,
        error2: action.payload,
      };
    default:
      return state;
  }
};
