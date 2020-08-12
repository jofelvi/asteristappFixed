import {
  CARGANDO,
  ERROR2,
  NO_CARGANDO,
  TRAER_ESTADISTICAS
} from './Constants';

export const INITIAL_STATE = {
  tablaEstadisticas: [],
  cargando: false,
  error2: ''  
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
    case TRAER_ESTADISTICAS:
      return {...state, tablaEstadisticas: action.payload};
    case ERROR2:
      return {...state, error2: action.payload};
    default:
      return state;
  }
};
