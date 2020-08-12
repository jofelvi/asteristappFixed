import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./auth/reducer";
import noticiasReducer from "./noticias/reducer"
import licenciasReducer from "./licencias/reducer"
import publicidadesReducer from "./publicidad/reducer"
import estadisticasReducer from "./estadisticas/reducer"

//import categories from "./Categories/reducer";
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'; // this is for debugging with React-Native-Debugger, you may leave it out

const reducers = combineReducers({
    auth: authReducer,
    noticias: noticiasReducer,
    licencias: licenciasReducer,
    publicidades: publicidadesReducer,
    estadisticas: estadisticasReducer
    //categories: categories,
});
//let middleware = [];
//middleware = [...middleware, thunk, logger]

//export const store = createStore(reducers, {}, applyMiddleware(...middleware));
export const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);