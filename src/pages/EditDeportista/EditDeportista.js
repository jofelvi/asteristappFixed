import React, {Fragment, useState, useEffect,useLayoutEffect} from 'react';
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
  Text,
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
} from 'native-base';

const {width: screenWidth} = Dimensions.get('window');

function EditDeportista({route}) {
  
const cargando = useSelector((state) => state.auth.cargando);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.usuario);
  const {current_user, access_token} = auth;
  const {uid, name} = current_user;
  const [uid1, setUid1] = useState(uid);
  const [nombre1, setNombre1] = useState(name);
  const field_user_apellido1 = useSelector((state) => state.auth.field_user_apellido1);
  const navigation = useNavigation();
  const { item } = route.params;

  useEffect(() => {
       dispatch(traerPerfil(uid, access_token));
       const timer = setTimeout(() => {
        dispatch(isload())
      }, 3000);
  }, []);

  const goLogin = () => navigation.navigate('Login');

  const setDate = (newDate) => {
    setChosenDate(newDate);
  };
  const onValueChange2 = (event) => {
    setSelect2(event.target.value);
  };

  const handledispath = () => {
    dispatch(isload())
  };

  const handleSubmit =(values) => {
    
    respuesta =  dispatch(traerUsuario(values.dni, values.nombreFull, values.uid, values.telefono1,values.telefono2, values.poblacion , values.provincia)).then(setIsLoading(false))
}

  return (
      <Container>

    <SafeAreaView style={{ flex: 1, paddingTop: 0, marginTop: 0 }}>
    <NavBar/>
    <ScrollView>
     
      
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={{
              nombre: item.nif, 
              email: item.nombre_completo, 
              asunto: item.uid, 
              mensaje: item.telefono1
            }}
          onSubmit={(values) => {
            handleSubmit(values);
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
            <Fragment>
              <Text> EDITAR PERFIL DE USUARIO {name}: </Text>
              <Text > Datos Personales: {name}: </Text>
              <FormInput
                name="nombre"
                value={values.nombre}
                onChangeText={handleChange('nombre')}
                placeholder="introducir nombre"
                onBlur={handleBlur('nombre')}
              />
              <ErrorMessage errorValue={touched.nombre && errors.nombre} />
              <FormInput
                name="email"
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder="Nombre completo"
                onBlur={handleBlur('email')}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <FormInput
                name="mensaje"
                multiline={true}
                value={values.mensaje}
                onChangeText={handleChange('mensaje')}
                placeholder="Introducir mensaje"
                onBlur={handleBlur('mensaje')}
              />
              <ErrorMessage errorValue={touched.mensaje && errors.mensaje} />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType="outline"
                  //onPress={handleSubmit}
                  onPress={() => handleSubmit()}
                  title="Guardar cambios"
                  buttonColor="#039BE5"
                  disabled={isValid}
                  //loading={isLoading}
                />
              </View>

            </Fragment>
          )}
        </Formik>
      </SafeAreaView>
    </ScrollView>
                        <Button style={styles.botonAbajo} title="Volver" onPress={() => navigation.goBack()} />
                        </SafeAreaView>
    </Container>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default connect()(EditDeportista);

const validationSchema = Yup.object().shape({
    nombre: Yup.string().label('Nombre').required('El nombre es requerido'),
    email: Yup.string().label('Correo Electronico').required('Correo Electronico es requerido'),
    mensaje: Yup.string().label('UID').required('UID requerido')
  
});
