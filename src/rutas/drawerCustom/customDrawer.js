import React, {useState, Fragment, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  Dimensions,
  BackHandler,
} from 'react-native';

import {
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
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon5 from 'react-native-vector-icons/Entypo';
import * as RootNavigation from '../RootNavigation';
import {traerUsuario, cerrarSession} from '../../store/auth/actions';
import {useDispatch, useSelector} from 'react-redux';
import {Header, Body, Container} from 'native-base';
import {LOGONORMAL, LOGINIMG, LOGO} from '../../assets/image';
import {Avatar} from 'react-native-paper';
import axios from "axios";
import {ERROR2, NOMBRE} from "../../store/auth/Constants";

Icon2.loadFont();
Icon3.loadFont();
Icon4.loadFont();
Icon5.loadFont();

const myIcon3 = <Icon name="chevron-back-outline" size={40} color="#0053C9" />;

const {width} = Dimensions.get('window');
const height = width * 0.5;

function CustomDrawer({...props}) {
  const auth = useSelector((state) => state.auth);
  const perfil = useSelector((state) => state.auth.perfil );
  const nombres = useSelector((state) => state.auth.nombre );

  const [isDeportista, setIsDeportista] = useState(true);
  const [isAdmin, setisAdmin] = useState(true);
  const [isGestor, setisGestor] = useState(true);
  const [isCampeonato, setisCampeonato] = useState(true);
  const rolesUser = useSelector((state) => state.auth.rolesUser);
  const uid = useSelector((state) => state.auth.uid);
  const usuario = useSelector((state) => state.auth.usuario);
  const {access_token} = usuario;
  const [isload, setisload] = useState(true);
  const dispatch = useDispatch();
  let nombre
    console.log(JSON.stringify(nombres))
    console.log(perfil !== [])
    console.log(perfil.length >= 1)


  useEffect(() => {

    if (!rolesUser.includes('invitado')) {
      rolesUser.includes('deportista')
        ? setIsDeportista(true)
        : setIsDeportista(false);
      rolesUser.includes('club') ? setisGestor(true) : setisGestor(false);
      rolesUser.includes('directiva') ? setisAdmin(true) : setisAdmin(false);
      rolesUser.includes('campeonato') ? setisCampeonato(true) : setisCampeonato(false);
    } else {
      setisGestor(false);
      setisAdmin(false);
      setIsDeportista(false);
    }
  }, [auth]);

  const traernombre = ()=>{

      if (uid !== '' &&  isload === true ){
          console.log("........--------------")
          traerNombre(uid, access_token)

      }
     return setisload(true)
  }
  const cerrarSe = () => {
    //RootNavigation.openDrawer();
    RootNavigation.navigate('Home');
    cerrarSe2()
  };

  const traerNombre = (uid, token) => {

      setisload(false)
      const URLperfil = `https://licencias.fapd.org/user/${uid}?_format=json`;
        console.log("--------------------traerNombre---------------". uid, token)
        let headers = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        };

        axios.get(URLperfil, {headers}).then((respuesta) => {
                const {
                    field_user_nombre
                } = respuesta.data;
                console.log("-----------",String(field_user_nombre[0].value))
                dispatch({
                    type: NOMBRE,
                    payload: field_user_nombre[0].value
                })
            });
        }



  const cerrarSe2 = () => {
    //RootNavigation.openDrawer();
    RootNavigation.navigate('Home');
    dispatch(cerrarSession());
  };

  return (
    <Container style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <Header style={styles.drawerHeader}>
          <Image
            style={styles.drawerImage}
            source={LOGONORMAL}
            resizeMode="contain"
          />
          {/* <Image source={LOGONORMAL} style={styles.drawerImage} resizeMode="contain"/> */}

          {uid != '' ? (
            <Text style={{marginTop:2, }}> Bienvenido {nombres}</Text>
          ) : null}

        </Header>

        <DrawerItemList {...props} />

        {isGestor && <RutasGestorClub />}
        {isAdmin && <RutasAdminClub />}
        {isDeportista && <RutasDeportistas />}
        {isCampeonato &&<RutasCampeonato/>}

      </DrawerContentScrollView>
    </Container>
  );
}

function RutasAdminClub({...props}) {
  return (
    <Fragment>
      <DrawerItem
        labelStyle={{
          color: 'black',
          textTransform: 'uppercase',
          fontWeight: 'bold',
        }}
        label="Menu Gestion"
        icon={({color, size}) => (
          <Icon4 name="fish" size={30} color="#0053C9" />
        )}
      />
      <DrawerItem
        onPress={() => RootNavigation.navigate('PantallaOculta', null)}
        label="pantalla3"
        icon={({color, size}) => (
          <Icon3 name="areachart" size={30} color="#0053C9" />
        )}
      />
    </Fragment>
  );
}

function RutasCampeonato({...props}) {
    return (
        <Fragment>
            <DrawerItem
                labelStyle={{
                    color: 'black',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                }}
                label="Menu Campeontao"
                icon={({color, size}) => (
                    <Icon4 name="fish" size={30} color="#0053C9" />
                )}
            />

            <DrawerItem
                label="Campeonatos"
                icon={({focused, color, size}) => (
                    <Icon name="money" size={30} color="#0053C9" />
                )}
                onPress={() => RootNavigation.navigate('CampeonatosScreen', null)}
            />

        </Fragment>
    );
}

function RutasGestorClub({...props}) {
  return (
    <Fragment>
      <DrawerItem
        labelStyle={{
          color: 'black',
          textTransform: 'uppercase',
          fontWeight: 'bold',
        }}
        label="Menu Gestion"
        icon={({focused, color, size}) => (
          <Icon4 name="fish" size={30} color="#0053C9" />
        )}
      />
      <DrawerItem
        label="Gestión de deportistas"
        icon={({focused, color, size}) => (
          <Icon3 name="addusergroup" size={30} color="#0053C9" />
        )}
        onPress={() => RootNavigation.navigate('GestiónDeportistas', null)}
      />
      <DrawerItem
        label="Liquidaciones Club"
        icon={({focused, color, size}) => (
          <Icon name="money" size={30} color="#0053C9" />
        )}
        onPress={() => RootNavigation.navigate('LiquidacionesScreen', null)}
      />
      <DrawerItem
        label="Licencias Por Ejercicio"
        icon={({focused, color, size}) => (
          <Icon name="money" size={30} color="#0053C9" />
        )}
        onPress={() => RootNavigation.navigate('LicenciasVigenYear', null)}
      />
      <DrawerItem
        label="Estadisticas del Club"
        icon={({focused, color, size}) => (
          <Icon name="money" size={30} color="#0053C9" />
        )}
        onPress={() => RootNavigation.navigate('Estadisticas', null)}
      />
      
      <DrawerItem
        label="Campeonatos"
        icon={({focused, color, size}) => (
          <Icon name="money" size={30} color="#0053C9" />
        )}
        onPress={() => RootNavigation.navigate('CampeonatosScreen', null)}
      />

    </Fragment>
  );
}
function RutasDeportistas({...props}) {
  return (
    <Fragment>
      <DrawerItem
        labelStyle={{
          color: 'black',
          textTransform: 'uppercase',
          fontWeight: 'bold',
        }}
        label="Menu Deportistas"
        icon={({focused, color, size}) => (
          <Icon4 name="fish" size={30} color="#0053C9" />
        )}
      />
      <DrawerItem
        label="Solicitud de Licencia"
        icon={({focused, color, size}) => (
          <Icon3 name="addfile" size={30} color="#0053C9" />
        )}
        onPress={() => RootNavigation.navigate('SolicitudLic', null)}
      />
      <DrawerItem
        label="Ficha Tecnica"
        icon={({focused, color, size}) => (
          <Icon3 name="form" size={30} color="#0053C9" />
        )}
        onPress={() => RootNavigation.navigate('FormPerfilScreen', null)}
      />

      <DrawerItem
        label="Licencias en Vigor"
        icon={({focused, color, size}) => (
          <Icon3 name="carryout" size={30} color="#0053C9" />
        )}
        onPress={() => RootNavigation.navigate('LicenciasActivasDeportista', null)}
      />

      <DrawerItem
        label="Licencias Caducadas"
        icon={({focused, color, size}) => (
          <Icon4 name="card-bulleted-off-outline" size={30} color="#0053C9" />
        )}
        onPress={() => RootNavigation.navigate('LicenciasCaducadas', null)}
      />

      <DrawerItem
        label="Campeonatos"
        icon={({focused, color, size}) => (
          <Icon name="money" size={30} color="#0053C9" />
        )}
        onPress={() => RootNavigation.navigate('CampeonatosScreen', null)}
      />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  drawerHeader: {
    height: 150,
    backgroundColor: '#f3f0ec',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  drawerImage: {
    borderColor: '#f3f0ec',
    backgroundColor: 'transparent',
  },
  imagen: {width: '70%', height},
});

export default CustomDrawer;
