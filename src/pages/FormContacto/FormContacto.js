import React, {Fragment, useState, useEffect, useLayoutEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,

  ScrollView,

  Platform,

} from 'react-native';
import FormInput from '../../components/ValidateForm/FormInput';
import FormButton from '../../components/ValidateForm/FormButton';
import ErrorMessage from '../../components/ValidateForm/ErrorMessage';
import NavBar from '../../components/navbar/Navbar';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  Container,
  List,
  ListItem,
  Text,
} from 'native-base';
import CheckBox from '@react-native-community/checkbox';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import Loading from '../../components/Loading/Loading';
import {enviarCorreo} from "../../HttpRequest/Api";

const {width: screenWidth} = Dimensions.get('window');

function FormContacto({route}) {

  const navigation = useNavigation();
  const [checkAvisoLegal, setCheckAvisoLegal] = useState(true);
  const [checkPromociones, setCheckPromociones] = useState(false);
  const [checkPersonalizado, setCheckPersonalizado] = useState(false);
  const [status, setstatus] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [nombre, setnombre] = useState('');
  const [email, setemail] = useState('');
  const [mensaje, setmensaje] = useState('');
  const [asunto, setasunto] = useState('');
  const [isloadin, setisloadin] = useState(false);


  const handleSubmit = async (values) => {
    let listCheck = [checkAvisoLegal, checkPromociones, checkPersonalizado];
    setisloadin(true)
     let api = await enviarCorreo(
        values.nombre,
        values.email,
        values.asunto,
        values.mensaje,
        listCheck
    );
    setstatus(api)
    setisloadin(false)
  };

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
                  title: "Aceptar",
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
            onSubmit={async (values, { resetForm }) => {
              await  handleSubmit(values)
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
