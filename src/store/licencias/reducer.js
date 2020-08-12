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
  TRAER_LICENCIAS_VIGENTES_LIQUI
} from "./Constants";

export const INITIAL_STATE = {
  licenciasVig: [],
  detalleLicenciasVig: [],
  cargando: false,
  error2: "",
  licenciasVigRoles: [],
  solicitarLic: [],
  solicitarLicCadu: [],
  modalidadesLic:[],
  status:"1",
  licenciasLiquidaciones:[]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CARGANDO:
      return {
        ...state,
        cargando: true
      }
    case NO_CARGANDO:
      return {
        ...state,
        cargando: false
      }
    case TRAER_LICENCIAS_VIGENTES:
      return {
        ...state,
        licenciasVig: action.payload,
        cargando: false
      };
    case TRAER_LICENCIAS_VIGENTES_ROLES:
      return {
        ...state,
        licenciasVigRoles: action.payload,
        cargando: false
      };
    case SOLICITAR_LICENCIAS:
      return {
        ...state,
        solicitarLic: action.payload,
        cargando: false
      };
    case TRAER_DETALLE_LICENCIAS_VIGENTES:
      return {
        ...state,
        detalleLicenciasVig: action.payload,
        cargando: false
      };
    case TRAER_LICENCIAS_CADUCADAS:
      return {
        ...state,
        solicitarLicCadu: action.payload,
        cargando: false
      };

    case ERROR2:
      return {
        ...state,
        error: action.payload
      };
      case STATUS:
        return {
          ...state,
          status: action.payload
        };
        case RESET_STATUS:
          return {
            ...state,
            status: "1"
          };
      case MODALIDAD_LICENCIA:
        return {
          ...state,
          modalidadesLic: action.payload
        };
        case TRAER_LICENCIAS_VIGENTES_LIQUI:
          return {
            ...state,
            licenciasLiquidaciones: action.payload
          };
        

        
    default:
      return state;
  }
};
