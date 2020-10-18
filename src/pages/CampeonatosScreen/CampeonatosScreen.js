<script src="http://192.168.1.128:8097"></script>;
import React, {Fragment, useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Dimensions,
  Alert,
  ScrollView,
  Text,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FormInput from '../../components/ValidateForm/FormInput';
import FormButton from '../../components/ValidateForm/FormButton';
import ErrorMessage from '../../components/ValidateForm/ErrorMessage';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {traerUsuario} from '../../store/auth/actions';
import {solicitarModalidades} from '../../store/licencias/actions';
import axios from 'axios'
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Picker,
  DatePicker,
} from 'native-base';
//import { CheckBox } from 'react-native-elements'
import CheckBox from '@react-native-community/checkbox';

import {SolicitarLicencias, resetStatus} from '../../store/licencias/actions';
import NavBar from '../../components/navbar/Navbar';

const {width: screenWidth} = Dimensions.get('window');

function CampeonatosScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const cargando = useSelector((state) => state.auth.cargando);
  const licencias = useSelector((state) => state.licencias);
  const [categorias, setCategorias] = useState([]);
  const [provinciaByClub, setprovinciaByClub] = useState([]);
  const modalidadLicSel = useSelector(
    (state) => state.licencias.modalidadesLic,
  );
  const [SelecModalidadLic, setSelecModalidadLic] = useState('');
  const [provinciaSelect, setProvinciaSelect] = useState("");
  const usuario = useSelector((state) => state.auth.usuario);
  const {access_token} = usuario;
  const currenUser = useSelector((state) => state.auth.usuario.current_user);
  //const auth = useSelector((state) => state.auth);
  const [ambitoSelect, setAmbitoSelect] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const status = useSelector((state) => state.licencias.status);
  const [chosenDate, setChosenDate] = useState(new Date());
  const [chosenDateFrom, setChosenDateFrom] = useState(new Date());

  //const { width: screenWidth } = Dimensions.get('window');
  useEffect(() => {
    handleApiCategoria()
    handleApiProvinciaByClub("CA")
    console.log(access_token)
  }, [status]);

  const goHome = () => navigation.navigate('Home');

  const handleApiCategoria = () => {
    const URLCategoria = `https://licencias.fapd.org/json-categorias?_format=json`;

    let headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
    };

    let respuesta = axios.get(URLCategoria, {headers}).then((respuesta) => {
      console.log('exito entro funcion  respuesta API handleApiCategoria');
      setCategorias(respuesta.data);
    });

  };

  const handleApiProvinciaByClub = (provincia) => {
    const URL= `https://licencias.fapd.org/json-clubs/${provincia}?_format=json`;

    let headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
    };

    let respuesta = axios.get(URL, {headers}).then((respuesta) => {
      console.log('exito entro funcion  respuesta API handleApiProvinciaByClub');
      console.log('exito entro funcion  respuesta API handleApiProvinciaByClub',respuesta.data);
      setprovinciaByClub(respuesta.data);
    });

  };

  const _renderCategorias = categorias.map((data,index) => {
    // Object.keys(categorias)
    // .forEach(function eachKey(key) { 
    //   console.log(key); // alerts key 
    //   console.log(categorias[key]); // alerts value
    // });

    var obj = data
    var key = Object.keys(obj)[0];
    var value = obj[key];

   console.log(key)
   console.log(value)
    return <Picker.Item label={value} value={key} key={index} />;
  });

  const handleSubmit = async (values) => {
    //setBandera(true);
    const {uid} = currenUser;
    console.log('entro handle');
    await dispatch(
      SolicitarLicencias(
        access_token,
        SelecModalidadLic,
        values.observaciones,
        uid,
      ),
    );
  };

  const handleAlerta = () => {
    Alert.alert(
      'Completado',
      'Su solicitud se envio con exito',
      [{text: 'Aceptar', onPress: () => goHome()}],
      {cancelable: true},
    );
    dispatch(resetStatus());
  };


  const callback = ((newDate) => {
    console.log("entro callback2 "+ newDate )
    var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
    let fechaParse = (""+newDate).replace(pattern, '$3-$2-$1');
    setChosenDate(fechaParse);

  });

  const callback2 = ((newDate) => {
    console.log("entro callback2 "+ newDate )
    var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
    let fechaParse = (""+newDate).replace(pattern, '$3-$2-$1');
    setChosenDateFrom(fechaParse);

  });

  const handleLTokenExpired = (value) => {};

  return (
    <Container>
      {status === 200 || status === '200' ? handleAlerta() : null}
      {status === 403 || status === '403' ? handleLTokenExpired() : null}
      <NavBar></NavBar>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{alignContent: 'center', paddingTop: 1}}>
        <SafeAreaView style={styles.container}>
          <Formik
            initialValues={{observaciones: ''}}
            onSubmit={async (values, {resetForm}) => {
              await handleSubmit(values);
              resetForm();
            }}
            validationSchema={validationSchema}>
            {({
              handleChange,
              values,
              handleSubmit,
              errors,
              isValid,
              touched,
              handleBlur,
              isSubmitting,
            }) => (
              <View style={{flex: 1, alignContent: 'center'}}>
                <View>
                  <Text
                    style={{
                      marginTop: 25,
                      fontSize: 17,
                      textAlign: 'center',
                      marginBottom: 15,
                      fontWeight: 'bold',
                    }}>
                    CAMPEONATOS
                  </Text>
                </View>
                <View style={{marginBottom: 30, marginTop: 20}}>
                  <Text
                    style={{
                      fontSize: 18,
                      textAlign: 'left',
                      marginLeft: 20,
                      fontWeight: 'bold',
                      marginBottom: 20,
                    }}>
                  Fecha Desde:
                  </Text>

                  <DatePicker
              style={{width: 200}}
              date={chosenDate}
              mode="date"
              locale="es"
              placeholder={chosenDate}
              format="DD-MM-YYYY"
              minDate="01-01-1900"
              maxDate="01-01-2022"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(event) => callback(event)}
            />
                </View>
                <View style={{marginBottom: 30, marginTop: 20}}>
                  <Text
                    style={{
                      fontSize: 18,
                      textAlign: 'left',
                      marginLeft: 20,
                      fontWeight: 'bold',
                      marginBottom: 20,
                    }}>
                  Fecha Hasta:
                  </Text>

                  <DatePicker
              style={{width: 200}}
              date={chosenDateFrom}
              mode="date"
              locale="es"
              placeholder={chosenDateFrom}
              format="DD-MM-YYYY"
              minDate="01-01-1900"
              maxDate="01-01-2022"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(event) => callback2(event)}
            />
                </View>
             
                <View style={{marginBottom: 30, marginTop: 20}}>
                  <Text
                    style={{
                      fontSize: 18,
                      textAlign: 'left',
                      marginLeft: 20,
                      fontWeight: 'bold',
                      marginBottom: 20,
                    }}>
                  Ambito:
                  </Text>

                  <Item picker>
                    <Picker
                      mode="dropdown"
                      style={{width: '100%', marginLeft: 5}}
                      placeholder="Seleccionar Categoria"
                      placeholderStyle={{color: '#bfc6ea'}}
                      iosHeader={'Categoria'}
                      selectedValue={ambitoSelect}
                      headerBackButtonText="Volver"
                      onValueChange={(itemValue, itemIndex) =>
                        setAmbitoSelect(itemValue)
                      }>
                      <Picker.Item label="Seleccione Categoria" value="" />                  
                      <Picker.Item label="Autonómico" value="Autonómico" /> 
                      <Picker.Item label="Provincial" value="Provincial" /> 
                      <Picker.Item label="Club" value="Club" /> 
                      <Picker.Item label="Otro" value="Otro" /> 
                    </Picker>
                  </Item>
                </View>
                <View style={{marginBottom: 50, marginTop: 50}}>
                  <Text
                    style={{
                      fontSize: 18,
                      textAlign: 'left',
                      marginLeft: 20,
                      fontWeight: 'bold',
                      marginBottom: 20,
                    }}>
                  Categoria de Campeonatos:
                  </Text>

                  <Item picker>
                    <Picker
                      mode="dropdown"
                      style={{width: '100%', marginLeft: 5}}
                      placeholder="Seleccionar Categoria"
                      placeholderStyle={{color: '#bfc6ea'}}
                      iosHeader={'Categoria'}
                      selectedValue={SelecModalidadLic}
                      headerBackButtonText="Volver"
                      onValueChange={(itemValue, itemIndex) =>
                        setSelecModalidadLic(itemValue)
                      }>
                      <Picker.Item label="Seleccione Categoria" value="" />                  
                      {_renderCategorias}
                    </Picker>
                  </Item>
                </View>

                <View style={{marginBottom: 50, marginTop: 50}}>
                  <Text
                    style={{
                      fontSize: 18,
                      textAlign: 'left',
                      marginLeft: 20,
                      fontWeight: 'bold',
                      marginBottom: 20,
                    }}>
                    Seleccione Modalidad de Licencia:
                  </Text>

                  <Item picker>
                    <Picker
                      mode="dropdown"
                      style={{width: '100%', marginLeft: 5}}
                      placeholder="Seleccionar Modalidad"
                      placeholderStyle={{color: '#bfc6ea'}}
                      iosHeader={'Modalidad'}
                      selectedValue={provinciaSelect}
                      headerBackButtonText="Volver"
                      onValueChange={(itemValue, itemIndex) =>
                        setProvinciaSelect(itemValue)
                      }>

                      <Picker.Item label="Seleccione" value="" />
                      <Picker.Item label="A Coruña" value="C" />
                      <Picker.Item label="Álava" value="VI" />
                      <Picker.Item label="Albacete" value="AB" />
                      <Picker.Item label="Alicante" value="A" />
                      <Picker.Item label="Almería" value="AL" />
                      <Picker.Item label="Asturias" value="O" />
                      <Picker.Item label="Ávila" value="AV" />
                      <Picker.Item label="Badajoz" value="BA" />
                      <Picker.Item label="Barcelona" value="B" />
                      <Picker.Item label="Burgos" value="BU" />
                      <Picker.Item label="Cáceres" value="CC" />
                      <Picker.Item label="Cádiz" value="CA" />
                      <Picker.Item label="Cantabria" value="S" />
                      <Picker.Item label="Castellón" value="CS" />
                      <Picker.Item label="Ciudad Real" value="CR" />
                      <Picker.Item label="Córdoba" value="CO" />
                      <Picker.Item label="Cuenca" value="CU" />
                      <Picker.Item label="Girona" value="GI" />
                      <Picker.Item label="Granada" value="GR" />
                      <Picker.Item label="Guadalajara" value="GU" />
                      <Picker.Item label="Guipúzcoa" value="SS" />
                      <Picker.Item label="Huelva" value="H" />
                      <Picker.Item label="Huesca" value="HU" />
                      <Picker.Item label="Jaén" value="J" />
                      <Picker.Item label="La Rioja" value="LO" />
                      <Picker.Item label="León" value="LE" />
                      <Picker.Item label="Lleida" value="L" />
                      <Picker.Item label="Lugo" value="LU" />
                      <Picker.Item label="Madrid" value="M" />
                      <Picker.Item label="Málaga" value="MA" />
                      <Picker.Item label="Murcia" value="MU" />
                      <Picker.Item label="Navarra" value="NA" />
                      <Picker.Item label="Ourense" value="OR" />
                      <Picker.Item label="Palencia" value="P" />
                      <Picker.Item label="Pontevedra" value="PO" />
                      <Picker.Item label="Salamanca" value="SA" />
                      <Picker.Item label="Segovia" value="SG" />
                      <Picker.Item label="Sevilla" value="SE" />
                      <Picker.Item label="Soria" value="SO" />
                      <Picker.Item label="Tarragona" value="T" />
                      <Picker.Item label="Teruel" value="TE" />
                      <Picker.Item label="Toledo" value="TO" />
                      <Picker.Item label="Valencia" value="V" />
                      <Picker.Item label="Valladolid" value="VA" />
                      <Picker.Item label="Vizcaya" value="BI" />
                      <Picker.Item label="Zamora" value="ZA" />
                      <Picker.Item label="Zaragoza" value="Z" />
                      <Picker.Item label="Ceuta" value="CE" />
                      <Picker.Item label="Melilla" value="ML" />
                      <Picker.Item label="Baleares" value="PM" />
                      <Picker.Item label="Las Palmas" value="GC" />
                      <Picker.Item label="Santa Cruz de Tenerife" value="TF" />

                      
                      {_renderCategorias}
                    </Picker>
                  </Item>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'left',
                    marginLeft: 20,
                    fontWeight: 'bold',
                    marginBottom: 20,
                  }}>
                  Observaciones:
                </Text>
                <FormInput
                  multiline={true}
                  name="observaciones"
                  value={values.observaciones}
                  onChangeText={handleChange('observaciones')}
                  placeholder="Agregar observaciones"
                  onBlur={handleBlur('observaciones')}
                />
                <ErrorMessage
                  errorValue={touched.observaciones && errors.observaciones}
                />
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonType="outline"
                    //onPress={handleSubmit}
                    onPress={() => handleSubmit()}
                    title="Enviar Solicitud"
                    buttonColor="#039BE5"
                    //loading={isLoading}
                  />
                </View>
              </View>
            )}
          </Formik>
        </SafeAreaView>
      </ScrollView>
    </Container>
  );
}

export default CampeonatosScreen;

const validationSchema = Yup.object().shape({
  observaciones: Yup.string().required('Por favor introducir observaciones'),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 5,
    marginTop: 30,
  },
  logo: {
    marginLeft: 10,
    marginTop: 30,
    marginBottom: 100,
    width: screenWidth - 60,
    height: screenWidth - 300,
  },
  containerLogo: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/*

setIsLoading(true)

        axios({
                        method: 'post',
            url: session_url,
            headers: {
                        'Content-Type': 'application/json',
            },
            data: {
                        name: username,
                pass: password
            }
        }).then(res => {
                        console.log("###################### AQUI RESPUESTA API #######################");
            //datasplit = res.data.splice(0, 10);
            //console.log(res.data);
            setResApi(res.data)
            const {access_token, current_user, logout_token} = res.data;
            setIsLoading(false)
            navigation.navigate('Home', {
                        token: access_token,
                name: current_user.name,
                uid: current_user.uid,
                tokenLogout: logout_token

            })
        }).catch(err => {
                        console.log("Error", err);
            handleCleanCookies();

            setIsLoading(false)
            Alert("usuario y/o contraseña equivocado")
        });



        axios({
                        method: 'post',
            url: session_url,
            headers: {
                        'Content-Type': 'application/json',
            },
            data: {
                        name: '51080866M',
                pass: '5108$$$'
            }
        }).then(res => {
                        console.log("funcion login")
            const {access_token, current_user, logout_token} = res.data;
            const usuariologueado = {
                        token: access_token,
                name: current_user.name,
                uid: current_user.uid,
                tokenLogout: logout_token
            }
            dispatch(signIn())
        }).catch((err) => {
                        console.log(user)
            console.log(pass)
            Alert.alert('Error en el servidor volver a intentar');
            console.log(err);
        })


        */
