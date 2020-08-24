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


function SolicitudLicScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const cargando = useSelector((state) => state.auth.cargando);
  const licencias = useSelector((state) => state.licencias);

  const modalidadLicSel = useSelector(
    (state) => state.licencias.modalidadesLic,
  );
  const [SelecModalidadLic, setSelecModalidadLic] = useState('');
  const usuario = useSelector((state) => state.auth.usuario);
  const currenUser = useSelector((state) => state.auth.usuario.current_user);

  //const auth = useSelector((state) => state.auth);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {access_token} = usuario;
  const status = useSelector((state) => state.licencias.status);

  //const { width: screenWidth } = Dimensions.get('window');
  useEffect(() => {
    dispatch(solicitarModalidades(access_token));
  }, []);

  const goHome = () => navigation.navigate('Home');

  const _renderCategorias = modalidadLicSel.map((data, index) => {
    return <Picker.Item label={data.modalidad} value={index} />;
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

  const createThreeButtonAlert = () => {
    dispatch(resetStatus());
    console.log(status + 'status en if');

    Alert.prompt(
      'Completado',
     'Su solicitud se envio con exito',
     [
       { text: "Aceptar", onPress: ()=> goHome() }
     ],
     { cancelable: false }
     );
  };


  const handleLTokenExpired = (value) => {
    
  };

  if (cargando){

  }
  return (
    <Container>
    {status === 200 || status === '200' ? createThreeButtonAlert() : null}
    {status === 403 || status === '403' ? handleLTokenExpired() : null }
      <NavBar></NavBar>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{alignContent: 'center', paddingTop: 1}}>
        <SafeAreaView style={styles.container}>
          <Formik
            initialValues={{observaciones: ''}}
            onSubmit={async (values, { resetForm }) => {
              await handleSubmit(values)
              resetForm()
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
                    SOLICITUD LICENCIA NUEVA
                  </Text>
                </View>
             <View style={{marginBottom:50,marginTop:50}}>
             <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'left',
                    marginLeft: 20,
                    fontWeight: 'bold',
                    marginBottom: 20
                  }}>
                  Seleccione Modalidad de Licencia:
                </Text>
                <Item picker >
                  <Picker
                    mode="dropdown"
                    style={{width: '100%',marginLeft:5}}
                    placeholder="Seleccionar Modalidad"
                    placeholderStyle={{color: '#bfc6ea'}}
                    iosHeader={'Modalidad'}
                    selectedValue={SelecModalidadLic}
                    headerBackButtonText="Volver"
                    onValueChange={(itemValue, itemIndex) =>
                      setSelecModalidadLic(itemValue)
                    }>
                    <Picker.Item label="Seleccione Modalidad Licencia" value="" />
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
                    marginBottom: 20
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

export default SolicitudLicScreen;


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
    marginTop:30
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
