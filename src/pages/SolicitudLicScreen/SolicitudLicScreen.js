import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View,} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FormInput from '../../components/ValidateForm/FormInput';
import FormButton from '../../components/ValidateForm/FormButton';
import ErrorMessage from '../../components/ValidateForm/ErrorMessage';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {solicitarModalidades} from '../../store/licencias/actions';
import {Container, Item, Picker,} from 'native-base';
import NavBar from '../../components/navbar/Navbar';
import Loading from '../../components/Loading/Loading';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import {solicitudLicenciaEmail} from "../../HttpRequest/Api";

const {width: screenWidth} = Dimensions.get('window');


function SolicitudLicScreen() {
  const [isLoading, setIsLoading] = useState(false);
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
  const [isModalVisible, setisModalVisible] = useState();
  const [respStatus, setrespStatus] = useState('');
  //const { width: screenWidth } = Dimensions.get('window');
  useEffect(() => {

    dispatch(solicitarModalidades(access_token));

  }, []);

  const goHome = () => navigation.navigate('Home');

  const _renderCategorias = modalidadLicSel.map((data, index) => {
    return <Picker.Item label={data.modalidad} value={index}/>;
  });

  const handleSubmit = async (values) => {
    const {uid} = currenUser;

    setIsLoading(true)
    console.log('entro handle');
    //await dispatch(SolicitarLicencias( access_token, SelecModalidadLic, values.observaciones,uid));
    let api = await solicitudLicenciaEmail(uid, SelecModalidadLic, values.observaciones, access_token)
    setrespStatus(api)
  };

  const modalOpen = () => {
    setrespStatus("")
    setisModalVisible(true)

  }

  const modalBtnAcep = () => {
    setisModalVisible(false)
    navigation.navigate('Home')
  }

  if (isLoading === true) {
    return (
      <Loading
        isVisible={isLoading}
        text={'ENVIANDO...'}
      />
    );
  }

  return (
    <Container>
      {respStatus === 200 || respStatus === '200' ? modalOpen() : null}

      <NavBar/>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{alignContent: 'center', paddingTop: 1}}
      >

        <SafeAreaView style={styles.container}>
          <View style={styles.TextEtiqutea2}>
            <ConfirmDialog
              //style={styles.TextEtiqutea2}
              title={`INFORMACION `}
              titleStyle={styles.TextEtiqutea2}
              visible={isModalVisible}
              onTouchOutside={() => setisModalVisible(false)}
              positiveButton={{
                title: "Aceptar",
                onPress: () => modalBtnAcep()
              }}>
              <View>
                <Text style={styles.TextEtiqutea2}>Su Solicitud para una nueva licencia se envio
                  Satisfactoriamente</Text>
              </View>
            </ConfirmDialog>
          </View>
          <Formik
            initialValues={{observaciones: ''}}
            onSubmit={async (values, {resetForm}) => {
              await handleSubmit(values)
              await resetForm()
              await setIsLoading(false)
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
                    style={styles.TextEtiqutea}>
                    SOLICITUD LICENCIA NUEVA
                  </Text>
                </View>
                <View style={{marginBottom: 20, marginTop: 20}}>
                  <Text
                    style={styles.TextEtiqutea2}>
                    Seleccione Modalidad de Licencia:
                  </Text>

                  <Item picker>

                    <Picker
                      mode="dropdown"
                      style={{width: '100%'}}
                      placeholder="Seleccionar Modalidad"
                      placeholderStyle={{
                        fontWeight: 'bold',
                        color: '#00183A',
                        fontSize: 15,
                        marginTop: 15,
                        marginBottom: 15,
                        marginLeft: 10
                      }}
                      iosHeader={'Modalidad'}
                      selectedValue={SelecModalidadLic}
                      headerBackButtonText="Volver"
                      onValueChange={(itemValue, itemIndex) =>
                        setSelecModalidadLic(itemValue)
                      }>

                      <Picker.Item label="Seleccione Modalidad Licencia" value=""/>

                      {_renderCategorias}

                    </Picker>
                  </Item>
                </View>

                <Text
                  style={styles.TextEtiqutea2}>
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
  },
  buttonContainer: {
    margin: 5,
    marginTop: 30
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
    marginBottom: 15
  },
  TextEtiqutea2: {
    fontWeight: 'bold',
    color: '#00183A',
    fontSize: 15,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10
  }
});

