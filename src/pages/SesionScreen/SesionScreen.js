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
import {Container, Button} from 'native-base';
import * as Yup from 'yup';
import FormInput from '../../components/ValidateForm/FormInput';
import FormButton from '../../components/ValidateForm/FormButton';
import ErrorMessage from '../../components/ValidateForm/ErrorMessage';
import {LOGO, LOGINIMG} from '../../assets/image';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {traerUsuario, resetStatus, cerrarSession} from '../../store/auth/actions';
import Loading from '../../components/Loading/Loading';
import CookieManager from '@react-native-community/cookies';
import NavBar from '../../components/navbar/Navbar';
import LoginScreen from '../LoginScreen/LoginScreen';

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


function SesionScreen() {
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
  const uid = useSelector((state) => state.auth.uid);


  useEffect(() => {

  }, [auth]);

  const cerrarse = () => {

  console.log("entro a cerrar sesion")
  dispatch(cerrarSession())
  navigation.navigate('Home');
  
  };

  
  const createTwoButtonAlert = () => {
    Alert.alert(
      'Aviso',
      '¿Desea cerrar sesion?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Aceptar', 
        onPress: () => 
        cerrarse()
        }
      ],
      { cancelable: true }
    );
  };

  if (auth.usuario.access_token === null && uid === null || auth.usuario.access_token === "" || uid === "")  {
    return <LoginScreen></LoginScreen>
  }
    return (
      <Container>
        <NavBar></NavBar>
        <ScrollView keyboardShouldPersistTaps="always">
          <SafeAreaView style={styles.container}>
            {
              uid !== ""  || uid !== null ?  <Text>Hola usuario Numero </Text> : null
            }
         
          
            <FormButton title="cerrar sesion" onPress={() => createTwoButtonAlert() } />
     
          </SafeAreaView>
        </ScrollView>
      </Container>
    );
  
}

export default SesionScreen;

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
