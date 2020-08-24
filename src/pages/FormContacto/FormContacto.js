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
import { Modal, Portal, Provider } from 'react-native-paper';
import {Overlay } from 'react-native-elements';

const {width: screenWidth} = Dimensions.get('window');

function FormContacto({route}) {
  const cargando = useSelector((state) => state.auth.cargando);
  const status = useSelector((state) => state.licencias.status);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [checkAvisoLegal, setCheckAvisoLegal] = useState(false);
  const [checkPromociones, setCheckPromociones] = useState(false);
  const [checkPersonalizado, setCheckPersonalizado] = useState(false);
  const [bandera, setBandera] = useState(false);
  const [nombre, setnombre] = useState('');
  const [asunto, setasunto] = useState('');
  const [mensaje, setmensaje] = useState('');
  const [email, setemail] = useState('');
  const [isModalVisible, setModalVisible] = useState(true);
  const inputRef = React.createRef();


  useEffect(() => {
    dispatch(resetStatus());
     
  }, [status]);

  const handleSubmit = (values) => {
    let listCheck = [checkAvisoLegal, checkPromociones, checkPersonalizado];
    let respuesta = dispatch(
      enviarCorreo(
        values.nombre,
        values.email,
        values.asunto,
        values.mensaje,
        listCheck,
      ),
    );
    //inputRef.current.clear();
    //return resetValues();
  };

  const createThreeButtonAlert = () => {
    Alert.alert(
      'Aviso',
      'Su correo fue enviado Satisfactoriamente',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Aceptar', onPress: () => navigation.navigate('Home') }
      ],
      { cancelable: false }
    );

    dispatch(resetStatus());
    }
  
  return (
    <Container>
      {    status === 200 || status === '200' ? createThreeButtonAlert() : null
}
      <SafeAreaView style={{flex: 1, paddingTop: 0, marginTop: 0}}>
        <NavBar />
        <ScrollView>
    
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
                      style={{
                        marginTop: 25,
                        fontSize: 17,
                        textAlign: 'center',
                        marginBottom: 15,
                        fontWeight: 'bold',
                      }}>
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
                    <Text style={styles.textalign}>Acepta condiciones</Text>
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
                    <Text style={styles.textalign}>Acepto comunicaciones</Text>
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
                    <Text style={styles.textalign}>
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
        {/* <Button
          style={styles.botonAbajo}
          title="Volver"
          onPress={() => navigation.goBack()}
        /> */}
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


const ModalTest = (props) => {
  const [visible, setVisible] = React.useState(props.visible);
  
    const toggleOverlay = () => {
      setVisible(!visible);
    };

  return (
    <View>
      <Button onPress={toggleOverlay} />

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text>{props.titulo}</Text>
        <Text>{props.mensaje}</Text>

        <Button onPress={toggleOverlay} >

          {props.mensajeBoton}
        </Button>
      </Overlay>
    </View>
  );
};