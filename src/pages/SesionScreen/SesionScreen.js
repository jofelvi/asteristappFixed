import React, {Fragment, useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Alert,
  ScrollView,
  Text,
} from 'react-native';
import {Container} from 'native-base';
import FormButton from '../../components/ValidateForm/FormButton';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {cerrarSession} from '../../store/auth/actions';
import NavBar from '../../components/navbar/Navbar';
import LoginScreen from '../LoginScreen/LoginScreen';

const screenWidth = Dimensions.get('window').width;

function SesionScreen() {
  const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {width: screenWidth} = Dimensions.get('window');
  const uid = useSelector((state) => state.auth.uid);


  useEffect(() => {

  }, [auth]);

  const cerrarse = () => {

  navigation.navigate('Home');
  console.log("entro a cerrar sesion")
  dispatch(cerrarSession())

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
        <NavBar/>

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
