import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/pages/HomeScreen/HomeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FormPerfilScreen from './src/pages/FormPerfilScreen/FormPerfilScreen';
import LoginScreen from './src/pages/LoginScreen/LoginScreen';
import DetailsScreen from './src/pages/DetailNoticia/DetalleNoticia';
import ListaNoticiasScreen from './src/pages/ListaNoticiasScreen/ListaNoticiasScreen';
import PerfilScreen from './src/pages/PerfilScreen/PerfilScreen';
import {ICONMENU, LOGOHERE} from './src/assets/image';
import {ICONMENU2} from './src/assets/image';
import Publicidad from './src/components/Publicidad/Publicidad';
import PoliticasCookiesScreen from './src/pages/PoliticasCookiesScreen/PoliticaCookiesScreen';
import PoliticasPrivacidadScreen from './src/pages/PoliticasPrivacidadScreen/PoliciticasPrivacidadScreen';
import AvisoLegalScreen from './src/pages/AvisoLegalScreen/AvisoLegalScreen';
import DetailNoticiaSlider from './src/pages/DetailNoticiaSlider/DetailNoticiaSlider';
import LicenciasActivas from './src/pages/LicenciasActivas/LicenciasActivas';
//import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store} from './src/store';
import DetailPublicidad from './src/pages/DetailPublicidad/DetailPublicidad';
import SolicitudLicScreen from './src/pages/SolicitudLicScreen/SolicitudLicScreen';
import LicenciasCaducadas from './src/pages/LicenciasCaducadas/LicenciasCaducadas';
import {useDispatch, useSelector} from 'react-redux';
import {traerUsuario} from './src/store/auth/actions';
import CookieManager from '@react-native-community/cookies';
import ListLicencias from './src/components/ListLicencias/ListLicencias';
import GestiónDeportistas from './src/pages/GestiónDeportistas/GestiónDeportistas';
import EditDeportista from './src/pages/EditDeportista/EditDeportista';
import FormContacto from './src/pages/FormContacto/FormContacto';
import EstadisticasScreen from './src/pages/EstadisticasScreen/EstadisticasScreen';
import stackNavInvitados from './src/rutas/invitados/RutasInvitados';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import IconFont5 from 'react-native-vector-icons/MaterialCommunityIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import CustomDrawer from './src/rutas/drawerCustom/customDrawer';
import  {navigationRef} from './src/rutas/RootNavigation'
import DetailsLicencias from './src/pages/DetailsLicencias/DetailsLicencias';
import LiquidacionesScreen from './src/pages/LiquidacionesScreen/LiquidacionesScreen';
import DetalleLicLiquidacion from './src/pages/DetalleLicLiquidacion/DetalleLicLiquidacion';

Icon.loadFont();
Icon2.loadFont();
IconFont5.loadFont();
IconOcticons.loadFont();
const Stack = createStackNavigator();
const StackPescador = createStackNavigator();

const Drawer = createDrawerNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <AppDrawer />
      </NavigationContainer>
    </Provider>
  );
}

export default App;

function StackPescadorFun() {
  return (
    <StackPescador.Navigator initialRouteName="Home">

      <StackPescador.Screen
        name="Home"
        component={ListaNoticiasScreen}
        options={{headerShown: false}}
      />

      <StackPescador.Screen
        name="GestiónDeportistas"
        component={GestiónDeportistas}
        options={{headerShown: false}}
      />
      <StackPescador.Screen
        name="EditDeportista"
        component={EditDeportista}
        options={{headerShown: false}}
      />
      <StackPescador.Screen
        name="FormContacto"
        component={FormContacto}
        options={{headerShown: false}}
      />

      <StackPescador.Screen
        name="Estadisticas"
        component={EstadisticasScreen}
        options={{headerShown: false}}
      />

      <StackPescador.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <StackPescador.Screen
        name="DetailsLicencias"
        component={DetailsLicencias}
        options={{headerShown: false}}
      />
      <StackPescador.Screen
        name="FormPerfilScreen"
        component={FormPerfilScreen}
        options={{headerShown: false}}
      />

      <StackPescador.Screen
        name="DetailNew"
        component={DetailsScreen}
        options={{headerShown: false}}
      />

      <StackPescador.Screen
        name="LicenciasCaducadas"
        component={LicenciasCaducadas}
        options={{headerShown: false}}
      />

      <StackPescador.Screen
        name="SolicitudLic"
        component={SolicitudLicScreen}
        options={{headerShown: false}}
      />

      <StackPescador.Screen
        name="Publicidad"
        component={Publicidad}
        options={{headerShown: false}}
      />

 
      <StackPescador.Screen
        name="DetailNoticiaSlider"
        component={DetailNoticiaSlider}
        options={{headerShown: false}}
      />
      <StackPescador.Screen
        name="DetailPublicidad"
        component={DetailPublicidad}
        options={{headerShown: false}}
      />
      <StackPescador.Screen
        name="LicenciasActivas"
        component={LicenciasActivas}
        options={{headerShown: false}}
      />
      <StackPescador.Screen
        name="LiquidacionesScreen"
        component={LiquidacionesScreen}
        options={{headerShown: false}}
      />

    <StackPescador.Screen
        name="DetalleLicLiquidacion"
        component={DetalleLicLiquidacion}
        options={{headerShown: false}}
      />

    </StackPescador.Navigator>
  );
}

function AppDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={StackPescadorFun}
        options={{
          headerShown: false,
          drawerLabel: 'Home',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="home" size={30} color="0053C9" />
          ),
        }}
      />

      <Drawer.Screen
        name="LoginScreen"
        component={LoginScreen}
        onPress={() => props.navigation.navigate('LoginScreen')}
        options={{
          headerShown: false,
          drawerLabel: 'Login',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="sign-in" size={30} color="0053C9" />
          ),
        }}
      />

      <Drawer.Screen
        name="FormContacto"
        component={FormContacto}
        onPress={() => props.navigation.navigate('FormContacto')}
        options={{
          headerShown: false,
          drawerLabel: 'Contacto',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="book" size={30} color="0053C9" />
          ),
        }}
      />

      <Drawer.Screen
        name="Cookies"
        component={PoliticasCookiesScreen}
        onPress={() => props.navigation.navigate('Cookies')}
        options={{
          headerShown: false,
          drawerLabel: 'Cookies',
          drawerIcon: ({focused, color, size}) => (
            <IconFont5 name="cookie" size={30} color="0053C9" />
          ),
        }}
      />
      <Drawer.Screen
        name="Privacidad"
        component={PoliticasPrivacidadScreen}
        onPress={() => props.navigation.navigate('Privacidad')}
        options={{
          headerShown: false,
          drawerLabel: 'Privacidad',
          drawerIcon: ({focused, color, size}) => (
            <IconFont5 name="security" size={30} color="0053C9" />
          ),
        }}
      />

      <Drawer.Screen
        name="AvisoLegal"
        component={AvisoLegalScreen}
        onPress={() => props.navigation.navigate('AvisoLegal')}
        options={{
          headerShown: false,
          drawerLabel: 'Aviso Legal',
          drawerIcon: ({focused, color, size}) => (
            <IconOcticons name="law" size={30} color="0053C9" />
          ),
        }}
      />

      <Drawer.Screen
        name="StackPescadorFun"
        component={StackPescadorFun}
        onPress={() => props.navigation.navigate('StackPescadorFun')}
        //options={{drawerLabel: () => null}}
        options={{
          headerShown: false,
          drawerLabel: () => null,
        }}
      />
      {/* <Drawer.Screen 
        name="PantallaOculta" 
        component={PantallaOculta} 
        onPress={()=> props.navigation.navigate('RutasAdmin', {screen: 'PantallaOculta'})}
        options={{ drawerLabel: () => null }} 
        /> */}
    </Drawer.Navigator>
  );
}
