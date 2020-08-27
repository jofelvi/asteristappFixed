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
import {Container} from 'native-base';
import * as Yup from 'yup';
import FormInput from '../../components/ValidateForm/FormInput';
import FormButton from '../../components/ValidateForm/FormButton';
import ErrorMessage from '../../components/ValidateForm/ErrorMessage';
import {LOGO, LOGINIMG} from '../../assets/image';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {traerUsuario, resetStatus} from '../../store/auth/actions';
import Loading from '../../components/Loading/Loading';
import CookieManager from '@react-native-community/cookies';
import NavBar from '../../components/navbar/Navbar';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

  
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .label('username')
    .required('Por favor introducir un DNI'),
  password: Yup.string()
    .label('Constraseña')
    .required('Por favor introducir contraseña'),
});


function LoginScreen() {
  const [errors, setErrors] = useState({});
  const auth = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const cargando = useSelector((state) => auth.cargando);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [banderaError, setBanderaError] = useState(false);
  const {width: screenWidth} = Dimensions.get('window');
  const status = useSelector((state) => auth.status);
  const [counter, setcounter] = useState("0");


  useEffect(() => {
    //status === 400 || status === '400'? dispatch(resetStatus()) : null
    {status === 400 || status === '400' ? createTwoButtonAlert(): null}
    if (auth.usuario.access_token === null || auth.usuario.length <= 0){
      CookieManager.clearAll();
    }
    else {
      goHome();
    }
  }, [auth]);

  const resetSta = () => {
    dispatch(resetStatus());
    console.log("reset status")
    }

  const goHome = () => navigation.navigate('Home');

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setPassword(values.password);
    setUsername(values.username);
   await dispatch(traerUsuario(values.username, values.password))
  };

  const createTwoButtonAlert = () => {
    //dispatch(resetStatus());
    Alert.alert(
      'Aviso',
      'NIF/NIE O/U contraseña Invalido',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Aceptar', onPress: () => console.log('acept Pressed') }
      ],
      { cancelable: false }
    );
      resetSta()
  };

  if (cargando === true) {
    return <Loading isVisible={cargando} text={'CARGANDO...'} />;
  }
    return (
      <Container>
        <NavBar></NavBar>
        <ScrollView keyboardShouldPersistTaps="always">
          <SafeAreaView style={styles.container}>
            {console.log(status + " status en login")}
            <Formik
              initialValues={{username: '', password: ''}}
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
                  <View style={styles.logo}>
                    <Image source={LOGINIMG} style={styles.containerLogo} />
                  </View>
                  <FormInput
                    name="username"
                    value={values.username}
                    onChangeText={handleChange('username')}
                    placeholder="Introducir DNI/NIE"
                    autoCapitalize="none"
                    onBlur={handleBlur('username')}
                    iconName="ios-mail"
                    iconColor="#2C384A"
                  />
                  <ErrorMessage
                    errorValue={touched.username && errors.username}
                  />
                  <FormInput
                    name="password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder="Introducir contraseña"
                    secureTextEntry
                    onBlur={handleBlur('password')}
                    iconName="lock-closed-outline"
                    iconColor="#2C384A"
                  />
                  <ErrorMessage
                    errorValue={touched.password && errors.password}
                  />
                  <View style={styles.buttonContainer}>
                    <FormButton
                      buttonType="outline"
                      //onPress={handleSubmit}
                      onPress={() => handleSubmit()}
                      title="Iniciar Sesion"
                      buttonColor="#039BE5"
                      disabled={!isValid || cargando}
                      loading={cargando}
                    />
                  </View>
                </Fragment>
              )}
            </Formik>
          </SafeAreaView>
        </ScrollView>
      </Container>
    );
  
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    margin: 5,
  },
  logo: {
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 70,
    marginRight: 0,
    paddingRight: 0,
    position: 'relative',
    width: screenWidth,
    height: screenWidth - 200,
  },
  containerLogo: {
    marginLeft: 0,
    marginTop: 0,
    marginRight: 0,
    paddingRight: 0,
    position: 'relative',
    width: screenWidth,
    height: screenWidth - 200,
  },
});
