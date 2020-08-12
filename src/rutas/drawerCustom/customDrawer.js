import React, {useState, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import * as RootNavigation from '../RootNavigation';

Icon2.loadFont();

const myIcon3 = <Icon name="chevron-back-outline" size={40} color="#0053C9" />;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawer({...props}) {
  const [isDeportista, setIsDeportista] = useState(true);
  const [isAdmin, setisAdmin] = useState(true);
  const [isGestor, setisGestor] = useState(true);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      
      {isGestor && <RutasGestorClub />}
      {/* {isAdmin && <RutasAdminClub />}
{isDeportista && <RutasDeportistas />}       */}
    </DrawerContentScrollView>
  );
}

function RutasAdminClub({...props}) {
  return (
    <Fragment>
      <DrawerItem
        label="pantalla1"
        icon={({color, size}) => (
          <Icon name="home" style={{fontSize: size, color: color}} />
        )}
        onPress={() => RootNavigation.navigate('PantallaOculta',null)}
      />
      <DrawerItem
        label="pantalla2"
        icon={({color, size}) => {
          myIcon3;
        }}
        onPress={() => RootNavigation.navigate('Home' , null)}
        icon={({color, size}) => (
          <Icon name="home" style={{fontSize: size, color: color}} />
        )}
      />
      <DrawerItem
        onPress={() => RootNavigation.navigate('PantallaOculta' ,null)}
        label="pantalla3"
        icon={({color, size}) => (
          <Icon name="home" style={{fontSize: size, color: color}} />
        )}
      />
    </Fragment>
  );
}

function RutasGestorClub({...props}) {
  return (
    <Fragment>
      <DrawerItem
        label="Gestión de deportistas"
        icon={({color, size}) => {
          myIcon3;
        }}
        onPress={() => RootNavigation.navigate('GestiónDeportistas', null)}
      />
      <DrawerItem
        label="PantallaOculta"
        icon={({color, size}) => (
          <Icon name="home" style={{fontSize: size, color: color}} />
        )}
        onPress={() => RootNavigation.navigate('PantallaOculta',  null)}
      />

     <DrawerItem
        label="Liquidaciones Club"
        icon={({color, size}) => (
          <Icon name="home" style={{fontSize: size, color: color}} />
        )}
        onPress={() => RootNavigation.navigate('LiquidacionesScreen',  null)}
      />
    </Fragment>
  );
}
function RutasDeportistas({...props}) {
  return (
    <Fragment>
      <DrawerItem
        label="Deportistas"
        icon={({color, size}) => {
          myIcon3;
        }}
      />
      <DrawerItem
        label="Solicitud de Licencia"
        icon={({color, size}) => {
          myIcon3;
        }}
        onPress={() => RootNavigation.navigate('SolicitudLic', null)}
      />
      <DrawerItem
        label="Ficha Tecnica"
        icon={({color, size}) => {
          myIcon3;
        }}
        onPress={() => RootNavigation.navigate('FormPerfilScreen' , null)}
      />

     <DrawerItem
        label="Licencias en Vigor"
        icon={({color, size}) => {
          myIcon3;
        }}
        onPress={() => RootNavigation.navigate('LicenciasActivas' , null)}
      />

      <DrawerItem
        label="Licencias en Caducadas"
        icon={({color, size}) => {
          myIcon3;
        }}
        onPress={() => RootNavigation.navigate('LicenciasCaducadas' , null)}
      />

    </Fragment>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});

export default CustomDrawer;
