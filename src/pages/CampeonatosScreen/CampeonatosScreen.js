import React, {Fragment, useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Dimensions,
  Alert,
  ScrollView,
  Text, TouchableOpacity,
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
  Picker, Card, List, ListItem,
} from 'native-base';
import DatePicker from 'react-native-datepicker';

//import { CheckBox } from 'react-native-elements'
import CheckBox from '@react-native-community/checkbox';

import {SolicitarLicencias, resetStatus} from '../../store/licencias/actions';
import NavBar from '../../components/navbar/Navbar';
import CampeonatoList from "../../components/CampeonatoList/CampeonatoList";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/FontAwesome";

const {width: screenWidth} = Dimensions.get('window');

function CampeonatosScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const cargando = useSelector((state) => state.auth.cargando);
  const licencias = useSelector((state) => state.licencias);
  const [categorias, setCategorias] = useState([{"125": "Juvenil"}, {"126": "Absoluta"}, {"127": "Dep. Bonificado"}, {"357": "Infantil"}]);
  const [provinciaByClub, setprovinciaByClub] = useState([]);
  const modalidadLicSel = useSelector(
      (state) => state.licencias.modalidadesLic,
  );

  const [apiCampeonatos, setApiCampeonatos] = useState([]);
  const [SelecModalidadLic, setSelecModalidadLic] = useState('');
  const [provinciaSelect, setProvinciaSelect] = useState("");
  const usuario = useSelector((state) => state.auth.usuario);
  const {current_user, access_token} =usuario
  //const auth = useSelector((state) => state.auth);
  const [ambitoSelect, setAmbitoSelect] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {uid} = current_user;
  const status = useSelector((state) => state.licencias.status);
  const [chosenDate, setChosenDate] = useState("");
  const [chosenDateFrom, setChosenDateFrom] = useState("");
  const [clubSelect, setclubSelect] = useState("");
  const [selectcategorias, setSelectcategorias] = useState("");
  const [clubsDeportista, setclubsDeportista] = useState("");
  const [categoriasClon, setCategoriasClon] = useState([]);

  clubsDeportista
  //const { width: screenWidth } = Dimensions.get('window');
  useEffect(() => {
    handleApiCategoria()
    //handleApiProvinciaByClub("CA")
    //handleApiInitial()
    //handleApi2(uid)
    console.log(access_token)
  }, [status]);

  const goHome = () => navigation.navigate('Home');

  const handleApiCategoria = async () => {
    const URLCatCampeoonatos = `https://licencias.fapd.org/json-categorias?_format=json`;

    let headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
    };

    let respuesta = await axios.get(URLCatCampeoonatos, {headers}).then((respuesta) => {
      console.log('exito entro funcion  respuesta API handleApiCategoria', respuesta.data);
      setCategorias(respuesta.data);
    });

  };

  const handleApiProvinciaByClub = (provincia) => {
    const URL= `https://licencias.fapd.org/json-clubs/${provincia}?_format=json`;
    setProvinciaSelect(provincia)
    console.log("provincia seleccionada",provincia)

    let headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
    };

    let respuesta = axios.get(URL, {headers}).then((respuesta) => {
      console.log('exito entro funcion  respuesta API handleApiProvinciaByClub',respuesta.data);
      setprovinciaByClub(respuesta.data);
    });
  };


/*  const CampeonatoDeportista = ()=>{

    const URLperfil = `https://licencias.fapd.org/user/${uid}?_format=json`;

    let headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token,
      },
    };

    axios.get(URLperfil, {headers}).then((respuesta) => {
      setclubsDeportista(respuesta.data.field_user_clubs.map((item) => item.target_id))
      console.log(
          'clubs deportista' +
          JSON.stringify(respuesta.data.field_user_clubs.map((item) => item.target_id)),
      );
    });
  }*/

  const _renderCategorias = categorias.map((data,index) => {
    // Object.keys(categorias)
    // .forEach(function eachKey(key) {
    //   console.log(key); // alerts key
    //   console.log(categorias[key]); // alerts value
    // });
    console.log(data, "aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii", categorias)
    var obj = data
    var key = Object.keys(obj);
    var value = obj[key];
    console.log(key)
    console.log(value)
    return <Picker.Item label={value} value={key} key={index} />;
  });

  const handleApiGetCampeonatos= () => {
    let URL
    if(clubSelect === ""){
       URL= `https://licencias.fapd.org/json-campeonatos/${ambitoSelect}/${categoriasClon}/?fecha_desde=${chosenDate}&fecha_hasta=${chosenDateFrom}&_format=json`;
    }else{
      URL= `https://licencias.fapd.org/json-campeonatos/${ambitoSelect}/${categoriasClon}/${clubSelect}?fecha_desde=${chosenDate}&fecha_hasta=${chosenDateFrom}&_format=json`;
    }

   console.log(URL)
    let headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
    };

    let respuesta = axios.get(URL, {headers}).then((respuesta) => {
      console.log('exito entro funcion  respuesta API Campeonatos',respuesta.data);
      setApiCampeonatos(respuesta.data);
    });

  };

  const _renderClub = provinciaByClub.map((item) => {
    return <Picker.Item label={item.nombre} value={item.id} key={item.id} />;
  });

  const handleSubmit = async (values) => {
    //setBandera(true);
    console.log('entro handle');
    handleApiGetCampeonatos()

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

  return (
      <Container>
        {status === 200 || status === '200' ? handleAlerta() : null}
        <NavBar/>
        <ScrollView
            keyboardShouldPersistTaps="always"
            style={{alignContent: 'center', paddingTop: 1}}>
          <SafeAreaView style={styles.container}>

                  <View style={{flex: 1, alignContent: 'center'}}>
                    <View>
                      <Text
                          style={ styles.TextEtiqutea}>
                        CAMPEONATOS
                      </Text>
                    </View>

                      <List>

                        <ListItem>

                          <Text
                            style={{
                              color: '#00183A',
                              fontSize: 15,
                              textAlign: 'left',
                              marginLeft: 20,
                              fontWeight: 'bold',
                              marginBottom: 20,
                            }}>
                            Fecha Desde:
                          </Text>

                          <Text
                            style={{
                              color: '#00183A',
                              fontSize: 15,
                              textAlign: 'left',
                              marginLeft: 60,
                              fontWeight: 'bold',
                              marginBottom: 20,
                            }}>
                            Fecha Hasta:
                          </Text>

                        </ListItem>
                      </List>

                      <List>
                        <ListItem>
                          <DatePicker
                            style={{width: 150}}
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

                          <DatePicker
                            style={{width: 150}}
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
                        </ListItem>
                      </List>

                      <List>
                        <ListItem>
                          <Text
                            style={{
                              color: '#00183A',
                              fontSize: 15,
                              textAlign: 'left',
                              marginLeft: 0,
                              fontWeight: 'bold',
                              marginBottom: 20,
                              marginRight:50
                            }}>
                            Ambito:
                          </Text>

                          <Item picker>
                            <Picker
                              mode="dropdown"
                              style={{width: '100%'}}
                              placeholder="Seleccionar Ambito"
                              placeholderStyle={{color: '#bfc6ea'}}
                              iosHeader={'Ambito'}
                              selectedValue={ambitoSelect}
                              headerBackButtonText="Volver"
                              onValueChange={(itemValue, itemIndex) =>
                                setAmbitoSelect(itemValue)
                              }>
                              <Picker.Item label="Seleccione Ambito" value="" />
                              <Picker.Item label="Autonómico" value="3" />
                              <Picker.Item label="Provincial" value="2" />
                              <Picker.Item label="Club" value="1" />
                              <Picker.Item label="Otro" value="4" />
                            </Picker>
                          </Item>
                        </ListItem>
                      </List>

                    <List>
                      <ListItem>
                        <Text
                          style={{
                            color: '#00183A',
                            fontSize: 15,
                            textAlign: 'left',
                            marginLeft: 0,
                            fontWeight: 'bold',
                            marginBottom: 20,
                            marginRight:30
                          }}>
                          Categoria:
                        </Text>

                        <Item picker>
                          <Picker
                            mode="dropdown"
                            style={{width: '100%'}}
                            placeholder="Seleccionar Categoria"
                            placeholderStyle={{color: '#bfc6ea'}}
                            iosHeader={'Categoria'}
                            selectedValue={
                              categoriasClon
                            }
                            headerBackButtonText="Volver"
                            onValueChange={(itemValue, itemIndex) =>
                              setCategoriasClon(itemValue)
                            }>
                            <Picker.Item label="Seleccione Ambito" value="0" />
                            <Picker.Item label="Juvenil" value="125" />
                            <Picker.Item label="Absoluta" value="126" />
                            <Picker.Item label="Dep. Bonificado" value="127" />
                            <Picker.Item label="Infantil" value="357" />
                            {
                              //_renderCategorias
                            }
                          </Picker>
                        </Item>
                      </ListItem>
                    </List>


                    <List>
                      <ListItem>
                        <Text
                          style={{
                            color: '#00183A',
                            fontSize: 15,
                            textAlign: 'left',
                            marginLeft: 0,
                            fontWeight: 'bold',
                            marginBottom: 20,
                            marginRight:15
                          }}>
                          Seleccione club:
                        </Text>

                        <Item picker>
                          <Picker
                            mode="dropdown"
                            style={{width: '100%'}}
                            placeholder="Seleccionar club"
                            placeholderStyle={{color: '#bfc6ea'}}
                            iosHeader={'club'}
                            selectedValue={clubSelect}
                            headerBackButtonText="Volver"
                            onValueChange={(itemValue, itemIndex) =>
                              setclubSelect(itemValue)
                            }>
                            <Picker.Item label="Seleccione club" value="" />
                            {_renderClub}
                          </Picker>
                        </Item>
                      </ListItem>
                    </List>



                    <View style={styles.buttonContainer}>
                      <FormButton
                          buttonType="outline"
                          onPress={() => handleSubmit()}
                          title="Consultar"
                          buttonColor="#039BE5"
                      />
                    </View>
                  </View>

            <View>
              <Text style={{color:"red", textAlign:"center", marginTop: 15, marginBottom:20}}> {apiCampeonatos.length <=0  ? "No hay campeonatos con esos parametros" : "LISTADO DE CAMPEONATOS" } </Text>

            <CampeonatoList
             campeonatos={apiCampeonatos}
            />
            </View>

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
  TextEtiqutea: {
    fontWeight: 'bold',
    color: '#00183A',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
});


/*
    console.log("----- ambito  ----", ambitoSelect)
    console.log("----- cartegoria  ----",categoriasClon)
    console.log("----- fecha desde  ----",chosenDate)
    console.log("----- fecha hasta  ----",chosenDateFrom)
    console.log("----- club seleccionado  ----",clubSelect)
    console.log("----- provincia seleccionada ----",provinciaSelect)
 */

