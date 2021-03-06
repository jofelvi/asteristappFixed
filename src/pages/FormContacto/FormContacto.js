import React, {Fragment, useState, useEffect, useLayoutEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import FormInput from '../../components/ValidateForm/FormInput';
import FormButton from '../../components/ValidateForm/FormButton';
import ErrorMessage from '../../components/ValidateForm/ErrorMessage';
import NavBar from '../../components/navbar/Navbar';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {traerUsuario, traerPerfil, isload} from '../../store/auth/actions';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Content,
  Form,
  Item,
  Picker,
  DatePicker,
  List,
  ListItem,
  Text,
} from 'native-base';
import {enviarCorreo, resetStatus} from '../../store/licencias/actions';
import CheckBox from '@react-native-community/checkbox';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';

const {width: screenWidth} = Dimensions.get('window');

function FormContacto({route}) {

  const cargando = useSelector((state) => state.auth.cargando);
  //const status = useSelector((state) => state.licencias.status);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [checkAvisoLegal, setCheckAvisoLegal] = useState(true);
  const [checkPromociones, setCheckPromociones] = useState(false);
  const [checkPersonalizado, setCheckPersonalizado] = useState(false);
  const [status, setstatus] = useState('');
  const [bandera, setbandera] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const inputRef = React.createRef('');
  const [nombre, setnombre] = useState('');
  const [email, setemail] = useState('');
  const [mensaje, setmensaje] = useState('');
  const [asunto, setasunto] = useState('');
  const [isloadin, setisloadin] = useState(false);

  useEffect(() => {
     
  }, []);

  const handleSubmit = (values) => {
    let listCheck = [checkAvisoLegal, checkPromociones, checkPersonalizado];
    setisloadin(true)
      enviarCorreo(
        values.nombre,
        values.email,
        values.asunto,
        values.mensaje,
        listCheck    
    );
  };

 const enviarCorreo = ( nombre1,email1, asunto1, mensaje1,listCheck1) => {
    let URLenviarCorreo = 'https://licencias.fapd.org/enviaremail';
    console.log("entro funcion")
    axios({
      method: 'post',
      url: URLenviarCorreo,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        'nombre': `${nombre1}`,
        'email': `${email1}`,
        'asunto': `${asunto1}`,
        'mensaje': `${mensaje1}`,
        'checks': `${listCheck1}`,
      },
    }).then((respuesta) => {
        console.log( '#### ACTION AQUI RESPUESTA API enviaremail ######## ',respuesta.status );
        setstatus(respuesta.status)
        setisloadin(false)
      })
    }

  // const alertaFunt = () => {
  //   Alert.alert(
  //     'Aviso',
  //     'Su correo fue enviado Satisfactoriamente',
  //     [
  //       {
  //         text: 'Cancelar',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel'
  //       },
  //       { text: 'Aceptar', onPress: () => navigation.navigate('Home') }
  //     ],
  //     { cancelable: false }
  //   );

  //   dispatch(resetStatus());
  //   }
  
  const modalOpen = () =>{
    setstatus("")
    setModalVisible(true)
   
  }

  const modalBtnAcep = () =>{
    setModalVisible(false)
    navigation.navigate('Home')
  }

  if (isloadin === true) {
    
    return (
      <Loading
        isVisible={isloadin}
        text={'ENVIANDO...'}
      />
    );
  }
  return (
    <Container>
      {    status === 200 || status === '200' ? modalOpen() : null }
      <SafeAreaView style={{flex: 1, paddingTop: 0, marginTop: 0}}>
        <NavBar />
        <ScrollView>
        <View style={styles.TextEtiqutea2}>
          <ConfirmDialog
              titleStyle= {styles.TextEtiqutea2}
              title={ `INFORMACION `}
              visible={isModalVisible}
              onTouchOutside={() => setModalVisible(false)}
              positiveButton={{
                  title: "aceptar",
                  onPress: () => modalBtnAcep()
              }} >
              <View>
                 <Text style={styles.TextEtiqutea2}>Su Peticion se envio Satisfactoriamente</Text>
              </View>
          </ConfirmDialog>
          </View> 
          <Formik
            initialValues={{
              nombre: nombre,
              email: email,
              asunto: mensaje,
              mensaje: asunto,
            }}
            enableReinitialize = { true } 
            onSubmit={ (values, { resetForm }) => {
              handleSubmit(values)
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
              resetForm
            }) => (
              <Fragment>
                <View style={{flex: 1, alignContent: 'center'}}>
                  <View>
                    <Text
                      style={styles.TextEtiqutea}>
                      FORMULARIO DE CONTACTO
                    </Text>
                  </View>
                </View>
                <FormInput
                  name="nombre"
                  value={values.nombre}
                  onChangeText={handleChange('nombre')}
                  placeholder="Introducir nombre"
                  onBlur={handleBlur('nombre')}
                />
                <ErrorMessage errorValue={touched.nombre && errors.nombre} />
                <FormInput
                  name="email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder="Correo Electronico"
                  onBlur={handleBlur('email')}
                />
                <ErrorMessage errorValue={touched.email && errors.email} />

                <FormInput
                  name="asunto"
                  multiline={true}
                  value={values.asunto}
                  onChangeText={handleChange('asunto')}
                  placeholder="Introducir Asunto"
                  onBlur={handleBlur('asunto')}
                />
                <ErrorMessage errorValue={touched.asunto && errors.asunto} />
                <FormInput
                  name="mensaje"
                  multiline={true}
                  value={values.mensaje}
                  onChangeText={handleChange('mensaje')}
                  placeholder="Introducir Mensaje"
                  onBlur={handleBlur('mensaje')}
                />
                    <ErrorMessage errorValue={touched.mensaje && errors.mensaje} />
                <List>
                  <ListItem>
                    <CheckBox
                      disabled={false}
                      value={checkAvisoLegal}
                      onValueChange={() =>
                        checkAvisoLegal
                          ? setCheckAvisoLegal(false)
                          : setCheckAvisoLegal(true)
                      }
                    />
                    <Text style={styles.TextEtiqutea2}>Acepta condiciones</Text>
                  </ListItem>

                  <ListItem>
                    <CheckBox
                      disabled={false}
                      value={checkPromociones}
                      onValueChange={() =>
                        checkPromociones
                          ? setCheckPromociones(false)
                          : setCheckPromociones(true)
                      }
                    />
                    <Text style={styles.TextEtiqutea2}>Acepto comunicaciones</Text>
                  </ListItem>

                  <ListItem>
                    <CheckBox
                      disabled={false}
                      value={checkPersonalizado}
                      onValueChange={() =>
                        checkPersonalizado
                          ? setCheckPersonalizado(false)
                          : setCheckPersonalizado(true)
                      }
                    />
                    <Text style={styles.TextEtiqutea2}>
                      Acepto comunicaciones Personalizadas
                    </Text>
                  </ListItem>
                </List>

                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonType="outline"
                    //onPress={handleSubmit}
                    onPress={() => handleSubmit()}
                    title="Enviar"
                    buttonColor="#039BE5"
                    style={{marginBottom: 15}}
                    //loading={isLoading}
                  />
                </View>
                
              </Fragment>
            )}
          </Formik>

        </ScrollView>
      </SafeAreaView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  buttonContainer: {
    margin: 5,
  },
  logo: {
    width: screenWidth - 60,
    height: screenWidth - 300,
  },
  containerLogo: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitleFont: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textalign: {
    marginLeft: Platform.OS === 'ios' ? 10 : 0,
  },
  TextLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 40,
  },
  TextEtiqutea: {
    marginLeft: Platform.OS === 'ios' ? 10 : 0,
    fontWeight: 'bold',
    color: '#00183A',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 15,  
    marginBottom:15
  },
  TextEtiqutea2: {
    fontWeight: 'bold',
    color: '#00183A',
    fontSize: 15,
    marginTop: 15,  
    marginBottom:15,
    marginLeft:10
  }
});

export default connect()(FormContacto);

const validationSchema = Yup.object().shape({
  nombre: Yup.string().label('Nombre').required('El nombre es requerido'),
  email: Yup.string()
    .email('Correo Electronico invalido')
    .required('Correo Electronico es requerido'),
  mensaje: Yup.string().label('mensaje').required('mensaje requerido'),
  asunto: Yup.string().label('asunto').required('asunto requerido'),
});