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

export const INITIAL_STATE = {
  licenciasVig: [],
  detalleLicenciasVig: [],
  cargando: false,
  error2: '',
  licenciasVigRoles: [],
  solicitarLic: [],
  solicitarLicCadu: [],
  modalidadesLic: [],
  status: '1',
  licenciasLiquidaciones: [],
  licenciasYears: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CARGANDO:
      return {
        ...state,
        cargando: action.payload
      };
      
    case TRAER_LICENCIAS_VIGENTES:
      return {
        ...state,
        licenciasVig: action.payload
      };
    case TRAER_LICENCIAS_VIGENTES_ROLES:
      return {
        ...state,
        licenciasVigRoles: action.payload
      };
    case SOLICITAR_LICENCIAS:
      return {
        ...state,
        solicitarLic: action.payload
      };
    case TRAER_DETALLE_LICENCIAS_VIGENTES:
      return {
        ...state,
        detalleLicenciasVig: action.payload
      };
    case TRAER_LICENCIAS_CADUCADAS:
      return {
        ...state,
        solicitarLicCadu: action.payload
      };

    case ERROR2:
      return {
        ...state,
        error: action.payload,
      };
    case STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case RESET_STATUS:
      return {
        ...state,
        status: '1',
      };
    case MODALIDAD_LICENCIA:
      return {
        ...state,
        modalidadesLic: action.payload,
      };
    case TRAER_LICENCIAS_VIGENTES_LIQUI:
      return {
        ...state,
        licenciasLiquidaciones: action.payload,
      };
    case TRAER_LICENCIAS_VIGENTES_YEARS:
      return {
        ...state,
        licenciasYears: action.payload,
      };

    default:
      return state;
  }
};
