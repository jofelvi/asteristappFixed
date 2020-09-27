import React, {Fragment, useState, useEffect, Component} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as usuarioActions from '../../store/auth/actions';
import * as licenciasActions from '../../store/licencias/actions';
import ListLicencias from '../../components/ListLicencias/ListLicencias';
import NavBar from '../../components/navbar/Navbar';
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
import {LOGO} from '../../assets/image';
import {CheckBox} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Content,
  Form,
  Item,
  Picker,
  List,
  ListItem,
} from 'native-base';
import moment from 'moment';
import {Switch} from 'react-native-paper';
import DatePicker from 'react-native-datepicker';
import { TRAER_PERFIL } from '../../store/auth/Constants';
import axios from 'axios'
const {width: screenWidth} = Dimensions.get('window');

class FormPerfilScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perfil: [],
      fecha: Date.now,
      select2: '',
    };
  }

 async componentDidMount() {

      
      const access_token = this.props.auth.usuario.access_token;
      const {current_user} = this.props.auth.usuario;
      const {uid} = current_user;
      this.handleapiPerfil(uid, access_token)
      //this.props.traerPerfil(uid, access_token);
    
     await this.props.traerPerfilSave()
  }


   handleapiPerfil= (uid, token) =>{
    const URLperfil = `https://licencias.fapd.org/user/${uid}?_format=json`;
    
    
    let headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };
    
      let respuesta = axios.get(URLperfil, {headers}).then((respuesta) => {
        console.log('exito entro funcion  respuesta API TRAER PERFIL');
        const {field_user_clubs, field_user_apellido1, field_user_apellido2} = respuesta.data
       this.setState({perfil: respuesta.data})

 

        //this.props.traerPerfilSave(respuesta.data)
        // if (roles.filter((e) => e.target_id === 'club').length > 0) {
        //   console.log(field_user_gestionclub[0].target_id);
        //   clubId = field_user_gestionclub[0].target_id
        //   this.setState({clubId:clubId})
        //   const year3 = new Date().getFullYear();
        //   this.getlicencias(year3,clubId)
        // }

      });
  }

  
  callback = (newDate) => {
    console.log('entro callback2 ' + newDate);
    var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
    let fechaParse = newDate.replace(pattern, '$3-$2-$1');
    this.setState({fecha: fechaParse});
  };

  handleSubmit = (values) => {
    this.props.editarPerfil(uid, access_token, data);
  };


  render() {
   
   if (this.state.perfil.length <= 0){
    return (
      <SafeAreaView style={{flex: 1, paddingTop: 0, marginTop: 0}}> 
      <NavBar />
      <ScrollView>
      <Text>
      PERFIL  NO EXISTE 
    </Text>
    </ScrollView>
    </SafeAreaView>
    )
   }

   const ValuesInitialFun =()=>{
  let perfil = this.state.perfil
  let keys = Object.keys(perfil).filter(k=>perfil[k]===value);


   }

    return (
      <Container>
        <SafeAreaView style={{flex: 1, paddingTop: 0, marginTop: 0}}>
          <NavBar />
          <ScrollView>
            <SafeAreaView style={styles.container}>
              <Formik
                initialValues={{
                  dni: 'perfil.nie',
                  usuario: 'thi',
                  name: '',
                  apellido: '',
                  apellido2: '',
                  email: '',
                  telefono1: '',
                  telefono2: '',
                  fechaNac: '',
                  direccion: 'field_user_via',
                  direccion2: 'calle2',
                  codPostal: 'codPostal',
                  codPostal2: 'codPostal2',
                  poblacion: 'poblacion',
                  poblacion2: 'poblacion2',
                  provincia: 'provincia',
                  provincia2: 'provincia2',
                  pais: 'pais',
                  pais2: 'pais',
                  tutorNif: 'tutorNif',
                  tutorNombre: 'tutorNombre',
                  tutorObs: 'tutorObs',
                }}
                onSubmit={(values) => {
                  this.handleSubmit(values);
                  console.log('submit');
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
                    <Text>
                      {' '}
                      PERFIL DE USUARIO 
                    </Text>
                    <Text>
                      {' '}
                      Datos Personales: 
                    </Text>
                    <FormInput
                      label="USUARIO"
                      name="dni"
                      labelStyle={styles.TextLabel}
                      inputStyle={styles.TextInput}
                      value={values.dni}
                      onChangeText={handleChange('dni')}
                      placeholder="Introducir DNI"
                      autoCapitalize="none"
                      onBlur={handleBlur('dni')}
                    />

                    <ErrorMessage errorValue={touched.dni && errors.dni} />

                    <FormInput
                      label="DNI / NIE"
                      name="usuario"
                      value={values.usuario}
                      onChangeText={handleChange('usuario')}
                      placeholder="usuario"
                      onBlur={handleBlur('usuario')}
                    />
                    <ErrorMessage
                      style={styles.TextLError}
                      errorValue={touched.usuario && errors.usuario}
                    />

                    <FormInput
                      label="PRIMER NOMBRE"
                      name="name"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      placeholder="Introducir Nombre"
                      autoCapitalize="none"
                      onBlur={handleBlur('name')}
                    />
                    <ErrorMessage errorValue={touched.name && errors.name} />

                    <FormInput
                      label="PRIMER APELLIDO"
                      name="apellido1"
                      value={values.apellido}
                      onChangeText={handleChange('apellido')}
                      placeholder="Introducir Primer Apellido"
                      autoCapitalize="none"
                      onBlur={handleBlur('apellido')}
                    />
                    <ErrorMessage
                      errorValue={touched.apellido && errors.apellido}
                    />

                    <FormInput
                      label="SEGUNDO APELLIDO"
                      name="apellido2"
                      value={values.apellido2}
                      onChangeText={handleChange('apellido2')}
                      placeholder="Introducir Segundo Apellido"
                      autoCapitalize="none"
                      onBlur={handleBlur('apellido2')}
                    />
                    <ErrorMessage
                      errorValue={touched.apellido2 && errors.apellido2}
                    />

                    <FormInput
                      label="CORREO ELECTRONICO"
                      name="email"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      placeholder="Introducir Correo Electronico"
                      onBlur={handleBlur('email')}
                    />
                    <ErrorMessage errorValue={touched.email && errors.email} />

                    <FormInput
                      label="TELEFONO"
                      name="telefono1"
                      value={values.telefono1}
                      onChangeText={handleChange('telefono1')}
                      placeholder="Introducir Numero de telefono"
                      onBlur={handleBlur('telefono1')}
                    />
                    <ErrorMessage
                      errorValue={touched.telefono1 && errors.telefono1}
                    />

                    <FormInput
                      label="TELEFONO ALTERNATIVO"
                      value={values.telefono2}
                      onChangeText={handleChange('telefono2')}
                      placeholder="Introducir Numero de telefono alternativo"
                      onBlur={handleBlur('telefono2')}
                    />
                    <ErrorMessage
                      errorValue={touched.telefono2 && errors.telefono2}
                    />
                    <Text>Fecha de nacimiento</Text>

                    <DatePicker
                      style={{width: 200}}
                      date={this.setState.fecha}
                      mode="date"
                      locale="es"
                      placeholder={this.setState.fecha}
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
                      onDateChange={(event) => this.callback(event)}
                    />

                    <ErrorMessage />

                    {/* <Text>Fecha: {chosenDate.toString().substr(4, 12)}</Text> */}

                    <Item picker>
                      <Picker
                        mode="dropdown"
                        style={{width: undefined}}
                        iosHeader={'Seleccione Sexo'}
                        placeholder="Seleccione Sexo"
                        placeholderStyle={{color: '#bfc6ea'}}
                        placeholderIconColor="#007aff"
                        headerBackButtonText="Volver"
                        selectedValue={this.state.select2}
                        onValueChange={(itemValue) =>
                          this.setState({select2: itemValue})
                        }>
                        <Picker.Item label="Hombre" value="1" />
                        <Picker.Item label="Mujer" value="2" />
                      </Picker>
                    </Item>
                    <ErrorMessage />

                    <List>
                      <ListItem>
                        <Switch
                          value={
                            false
                            //activo
                          }
                          //onValueChange={onToggleSwitch}
                          disabled={true}
                        />
                        <Text style={styles.textalign}>
                          {
                            //activo === '0' ? ' No Activo' : 'Activo'
                          }
                        </Text>
                      </ListItem>
                    </List>
                    <ErrorMessage />

                    <Item picker>
                      <Picker
                        mode="dropdown"
                        style={{width: undefined}}
                        placeholder="clubs"
                        placeholderStyle={{color: '#bfc6ea'}}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.select2}
                        //onValueChange={(event) => onValueChange2(event)}
                      >
                        <Picker.Item label="Hombre" value="key0" />
                      </Picker>
                    </Item>

                    <ErrorMessage />

                    <FormInput
                      label="CALLE"
                      name="direccion"
                      value={values.direccion}
                      onChangeText={handleChange('direccion')}
                      placeholder="direccion"
                      onBlur={handleBlur('direccion')}
                    />
                    <ErrorMessage />

                    <FormInput
                      label="CODIGO POSTAL"
                      name="codPostal"
                      value={values.codPostal}
                      onChangeText={handleChange('codPostal')}
                      placeholder="Codigo postal direccion principal"
                      onBlur={handleBlur('codPostal')}
                    />

                    <FormInput
                      label="POBLACION"
                      name="poblacion"
                      value={values.poblacion}
                      onChangeText={handleChange('poblacion')}
                      placeholder="poblacion"
                      onBlur={handleBlur('poblacion')}
                    />

                    <FormInput
                      label="PROVINCIA"
                      name="provincia"
                      value={values.provincia}
                      onChangeText={handleChange('provincia')}
                      placeholder="Provincia"
                      onBlur={handleBlur('provincia')}
                    />

                    <FormInput
                      label="PAIS"
                      name="pais"
                      value={values.pais}
                      onChangeText={handleChange('pais')}
                      placeholder="pais"
                      onBlur={handleBlur('pais')}
                    />

                    <Text> Direccion alternativa </Text>

                    <FormInput
                      label="CALLE"
                      name="direccion2"
                      value={values.direccion2}
                      onChangeText={handleChange('direccion2')}
                      placeholder="calle"
                      onBlur={handleBlur('direccion2')}
                    />
                    <FormInput
                      label="CODIGO POSTAL"
                      name="codPostal2"
                      value={values.codPostal2}
                      onChangeText={handleChange('codPostal2')}
                      placeholder="codigo postal direcion alternativa"
                      onBlur={handleBlur('codPostal2')}
                    />
                    <FormInput
                      label="POBLACION"
                      name="poblacion2"
                      value={values.poblacion2}
                      onChangeText={handleChange('poblacion2')}
                      placeholder="Poblacion direccion alternativa"
                      onBlur={handleBlur('poblacion2')}
                    />

                    <FormInput
                      label="PROVINCIA"
                      name="provincia2"
                      value={values.provincia2}
                      onChangeText={handleChange('provincia2')}
                      placeholder="provincia direccion alternativa"
                      onBlur={handleBlur('provincia2')}
                    />
                    <FormInput
                      label="PAIS"
                      name="pais2"
                      value={values.pais2}
                      onChangeText={handleChange('pais2')}
                      placeholder="Pais"
                      onBlur={handleBlur('pais2')}
                    />
                    <Text>Datos del Tutor</Text>

                    <FormInput
                      label="TUTOR NIF/NIE"
                      name="tutorNif"
                      value={values.tutorNif}
                      onChangeText={handleChange('tutorNif')}
                      placeholder="Usuario tutor"
                      onBlur={handleBlur('tutorNif')}
                    />
                    <FormInput
                      label="TUTOR NOMBRE"
                      name="tutorNombre"
                      value={values.tutorNombre}
                      onChangeText={handleChange('tutorNombre')}
                      placeholder="Nombre Tutor"
                      onBlur={handleBlur('tutorNombre')}
                    />
                    <FormInput
                      label="OBSERVACIONES DEL TUTOR"
                      name="tutorObs"
                      value={values.tutorObs}
                      onChangeText={handleChange('tutorObs')}
                      placeholder="Tutor Observaciones"
                      onBlur={handleBlur('tutorObs')}
                    />

                    <View style={styles.buttonContainer}>
                      <FormButton
                        buttonType="outline"
                        //onPress={handleSubmit}
                        onPress={() => {
                          console.log('click function');
                          this.handleSubmit();
                        }}
                        title="Guardar cambios"
                        buttonColor="#039BE5"
                        //disabled={!isValid}
                        //loading={isLoading}
                      />
                    </View>
                  </Fragment>
                )}
              </Formik>
            </SafeAreaView>
          </ScrollView>
          <Button
            style={styles.botonAbajo}
            title="Volver"
            //onPress={() => navigation.goBack()}
          />
        </SafeAreaView>
      </Container>
    );
  }
}

const mapStateToProps = ({auth, licencias}) => {
  return {
    auth,
    licencias,
  };
};
const mapDispatchToProps = {
  ...licenciasActions,
  ...usuarioActions,
};
export default connect(mapStateToProps, mapDispatchToProps)(FormPerfilScreen);

const validationSchema = Yup.object().shape({
  usuario: Yup.string().label('usuario').required('usuario es requerido'),
  dni: Yup.string().label('DNI/NIE').required('NIE/DNI es requerido'),
  name: Yup.string().label('Nombre').required('Nombre es requerido'),
  apellido: Yup.string()
    .label('Primer Apellido')
    .required('Primer Apellido es requerido'),
  apellido2: Yup.string()
    .label('Segundo Apellido')
    .required('Segundo Apellido es requerido'),
  email: Yup.string()
    .label('Email')
    .email('Introducir un Email valido')
    .required('Por favor introducir un Email'),
  telefono1: Yup.string().label('telefono1'),
  telefono2: Yup.string().label('telefono2'),
  direccion: Yup.string().label('direccion'),
  codPostal: Yup.string().label('codPostal'),
  poblacion: Yup.string().label('poblacion'),
  provincia: Yup.string().label('provincia'),
  pais: Yup.string().label('pais'),
  direccion2: Yup.string().label('direccion2'),
  codPostal2: Yup.string().label('codPostal2'),
  poblacion2: Yup.string().label('poblacion2'),
  provincia2: Yup.string().label('provincia2'),
  pais2: Yup.string().label('pais2'),
  tutorNif: Yup.string().label('tutorNif'),
  tutorNombre: Yup.string().label('tutorNombre'),
  Tutorobser: Yup.string().label('pais'),
});

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
  TextLabel: {
    fontWeight: 'bold',
    color: 'black',
  },
  TextInput: {
    //fontSize: 17,
    //marginLeft: Platform.OS === 'ios' ? -15 : -18,
  },
  TextLError: {
    marginTop: 0,
    paddingTop: 0,
  },
});
