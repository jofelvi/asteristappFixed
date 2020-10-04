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
  Text,
} from 'react-native';

import {Button} from 'react-native-elements';
import FormInput from '../../components/ValidateForm/FormInput';
import FormButton from '../../components/ValidateForm/FormButton';
import ErrorMessage from '../../components/ValidateForm/ErrorMessage';
import {LOGO} from '../../assets/image';
import {CheckBox} from 'react-native-elements';
import NavBar from '../../components/navbar/Navbar';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  traerUsuario,
  traerPerfil,
  isload,
  editarPerfil,
  resetPerfilByclub,
} from '../../store/auth/actions';
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
import { resetDetalleNoticia } from '../../store/noticias/actions';


const {width: screenWidth} = Dimensions.get('window');

function FormPerfilScreen({ route }) {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const inputRef = React.createRef();
  const cargando = useSelector((state) => state.auth.cargando);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.usuario);
  const {current_user, access_token} = auth;
  const {uid, name} = current_user;
  const [uid1, setUid1] = useState(uid);
  const [nombre1, setNombre1] = useState(name);
  const [select2, setSelect2] = useState('');
  const [chosenDate, setChosenDate] = useState(new Date());
  const [initDate, setInitDate] = useState(new Date());

  const [checked, setChecked] = useState(false);
  const load = useSelector((state) => state.auth.isLoad);
  const field_user_apellido1 = useSelector(
    (state) => state.auth.field_user_apellido1,
  );
  const { item } = route.params;

  const navigation = useNavigation();

  useEffect(() => {

    const unsubscribe = navigation.addListener('blur', () => {
      console.log("entro useEffect blur")
      dispatch(resetPerfilByclub())
      
  });
  
    const { item } = route.params;
    //dispatch(traerPerfil(uid, access_token));
    console.log( item , " item id aqui2 ")
    dispatch(traerPerfil(item, access_token));
    //testCallback(item);
    unsubscribe
  }, [item]);

  const callback = React.useCallback((newDate) => {
    console.log("entro callback2 "+ newDate )
    var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
    let fechaParse = newDate.replace(pattern, '$3-$2-$1');
    setChosenDate(fechaParse);

  }, []);

  const testCallback = React.useCallback((itemUid) => {
    dispatch(traerPerfil(itemUid, access_token));
  }, []);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const goLogin = () => navigation.navigate('Login');

  const setDate = (newDate) => {
    console.log("evento que trae la fecha "+ newDate )
    
    setChosenDate(newDate);
  };

  const setearFechaNa = (date) => {
    (date) => {
      return moment(date).format('DD-MM-YYYY');
    };
  };
  const onValueChange2 = (event) => {
    event.preventDefault();
    setSelect2(event.target.value);
  };

  const handleSubmit = async (values) => {
    console.log('entro handle');
    const data = {
      uid:[
        {
           value: uid
        }
     ],
      field_user_nif: [
        {
          value: `${values.dni}`,
        },
      ],
      field_user_nombre: [
        {
          value: `${values.name}`,
        },
      ],
      field_user_apellido1: [
        {
          value: `${values.apellido}`,
        },
      ],
      field_user_apellido2: [
        {
          value: `${values.apellido2}`,
        },
      ],
      field_user_nomcompleto: [
        {
          value: `${values.name} + ${values.apellido} + ${values.apellido2}`,
        },
      ],
      mail: [
        {
          value: `${values.email}`,
        },
      ],
      field_user_telefono1: [
        {
          value: `${values.telefono1}`,
        },
      ],
      field_user_telefono2: [
        {
          value: `${values.telefono2}`,
        },
      ],
      field_user_sexo: [
        {
          value: `${select2}`,
        },
      ],
      field_user_via: [
        {
          value: `${values.direccion}`,
        },
      ],
      field_user_codpostal: [
        {
          value: `${values.codPostal}`,
        },
      ],
      field_user_poblacion: [
        {
          value: `${values.poblacion}`,
        },
      ],
      field_user_provincia: [
        {
          value: `${values.provincia}`,
        },
      ],
      field_user_pais: [
        {
          value: `${values.pais}`,
        },
      ],
      field_user_via_alter: [
        {
          value: `${values.direccion2}`,
        },
      ],
      field_user_codpostal_alter: [
        {
          value: `${values.codPostal2}`,
        },
      ],
      field_user_poblacion_alter: [
        {
          value: `${values.poblacion2}`,
        },
      ],
      field_user_provincia_alter: [
        {
          value: `${values.provincia2}`,
        },
      ],
      field_user_pais_alter: [
        {
          value: `${values.pais2}`,
        },
      ],
      field_user_tutor_nif: [
        {
          value: `${values.tutorNif}`,
        },
      ],
      field_user_tutor_nombre: [
        {
          value: `${values.tutorNombre}`,
        },
      ],
      field_user_tutor_observaciones: [
        {
          value: `${values.tutorObs}`,
        },
      ]
    };
   console.log(data)
    await dispatch(editarPerfil(uid, access_token, data));
  };

  const clearFields = () => handleSubmit();

  const perfil = useSelector((state) => state.auth.perfil);

  const _render = () => {
    const fechaNac =
      typeof perfil.field_user_fechanac[0] !== 'undefined'
        ? perfil.field_user_fechanac[0].value
        : '';
    const sexo =
      typeof perfil.field_user_sexo[0] !== 'undefined'
        ? perfil.field_user_sexo[0].value
        : '';
    const sexoInitial = () => {
      sexo === '1' ? setSelect2('Hombre') : setSelect2('MUJER');
    };

    //console.log("sexo inicial es " + sexo)

    let activo = perfil.field_user_lopd_aceptacion[0].value;
    let calle1 =
      typeof perfil.field_user_via[0] !== 'undefined'
        ? perfil.field_user_via[0].value
        : '';
    let calle2 =
      typeof perfil.field_user_via_alter[0] !== 'undefined'
        ? perfil.field_user_via_alter[0].value
        : '';
    let codPostal =
      typeof perfil.field_user_codpostal[0] !== 'undefined'
        ? perfil.field_user_codpostal[0].value
        : '';
    let codPostal2 =
      typeof perfil.field_user_codpostal_alter[0] !== 'undefined'
        ? perfil.field_user_codpostal_alter[0].value
        : '';
    let poblacion =
      typeof perfil.field_user_poblacion[0] !== 'undefined'
        ? perfil.field_user_poblacion[0].value
        : '';
    let poblacion2 =
      typeof perfil.field_user_poblacion_alter[0] !== 'undefined'
        ? perfil.field_user_poblacion_alter[0].value
        : '';
    let provincia =
      typeof perfil.field_user_provincia[0] !== 'undefined'
        ? perfil.field_user_provincia[0].value
        : '';
    let provincia2 =
      typeof perfil.field_user_provincia_alter[0] !== 'undefined'
        ? perfil.field_user_provincia_alter[0].value
        : '';
    let pais =
      typeof perfil.field_user_pais[0] !== 'undefined'
        ? perfil.field_user_pais[0].value
        : '';
    let pas2 =
      typeof perfil.field_user_pais_alter[0] !== 'undefined'
        ? perfil.field_user_pais_alter[0].value
        : '';

    let tutorNif =
      typeof perfil.field_user_tutor_nif[0] !== 'undefined'
        ? perfil.field_user_tutor_nif[0].value
        : '';
    let tutorNombre =
      typeof perfil.field_user_tutor_nombre[0] !== 'undefined'
        ? perfil.field_user_tutor_nombre[0].value
        : '';
    let tutorObs =
      typeof perfil.field_user_tutor_observaciones[0] !== 'undefined'
        ? perfil.field_user_tutor_observaciones[0].value
        : '';

    console.log(fechaNac + ' fecha estado ');
    console.log(
      'clubs' +
        JSON.stringify(perfil.field_user_clubs.map((item) => item.target_id)),
    );

    const setFirstValue = (value) => {
      if (select2 == '' || select2 == null) {
        setSelect2(value);
      }
       var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
       var fechaParse = fechaNac.replace(pattern, '$3-$2-$1');

        setChosenDate(Date.parse(fechaParse));
        
        console.log('fecha parse ' + fechaParse);
        console.log('fecha state ' + chosenDate);
      }
      console.log('select2 ' + select2);
    
    return (
      <Formik
        initialValues={{
          dni: uid1,
          usuario: nombre1,
          name:
            typeof perfil.field_user_nombre[0] !== 'undefined'
              ? perfil.field_user_nombre[0].value
              : '',
          apellido:
            typeof perfil.field_user_apellido1[0] !== 'undefined'
              ? perfil.field_user_apellido1[0].value
              : '',
          apellido2:
            typeof perfil.field_user_apellido2[0] !== 'undefined'
              ? perfil.field_user_apellido2[0].value
              : '',
          email:
            typeof perfil.mail[0] !== 'undefined' ? perfil.mail[0].value : '',
          telefono1:
            typeof perfil.field_user_telefono1[0] !== 'undefined'
              ? perfil.field_user_telefono1[0].value
              : '',
          telefono2:
            typeof perfil.field_user_telefono2[0] !== 'undefined'
              ? perfil.field_user_telefono2[0].value
              : '',
          fechaNac:
            typeof perfil.field_user_fechanac[0] !== 'undefined'
              ? perfil.field_user_fechanac[0].value
              : '',
          direccion: calle1,
          direccion2: calle2,
          codPostal: codPostal,
          codPostal2: codPostal2,
          poblacion: poblacion,
          poblacion2: poblacion2,
          provincia: provincia,
          provincia2: provincia2,
          pais: pais,
          pais2: pais,
          tutorNif: tutorNif,
          tutorNombre: tutorNombre,
          tutorObs: tutorObs,
        }}
        onSubmit={(values) => {
          handleSubmit(values);
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
            <Text style={styles.TextEtiqutea}> DATOS USUARIO </Text>
            {setFirstValue(sexo)}
            <FormInput
              ref={inputRef}
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
            <ErrorMessage errorValue={touched.apellido && errors.apellido} />

            <FormInput
              label="SEGUNDO APELLIDO"
              name="apellido2"
              value={values.apellido2}
              onChangeText={handleChange('apellido2')}
              placeholder="Introducir Segundo Apellido"
              autoCapitalize="none"
              onBlur={handleBlur('apellido2')}
            />
            <ErrorMessage errorValue={touched.apellido2 && errors.apellido2} />

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
            <ErrorMessage errorValue={touched.telefono1 && errors.telefono1} />

            <FormInput
              label="TELEFONO ALTERNATIVO"
              value={values.telefono2}
              onChangeText={handleChange('telefono2')}
              placeholder="Introducir Numero de telefono alternativo"
              onBlur={handleBlur('telefono2')}
            />
            <ErrorMessage errorValue={touched.telefono2 && errors.telefono2} />
            <Text style={styles.TextEtiqutea2}>FECHA DE NACIMIENTO</Text>

            <DatePicker
              style={{width: 200}}
              date={chosenDate}
              mode="date"
              locale="es"
              placeholder={chosenDate}
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
              onDateChange={(event) => callback(event)}
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
                selectedValue={select2}
                onValueChange={(itemValue) => setSelect2(itemValue)}>
                <Picker.Item label="Hombre" value="1" />
                <Picker.Item label="Mujer" value="2" />
              </Picker>
            </Item>
            <ErrorMessage />

            <List>
              <ListItem>
                <Switch
                  value={activo}
                  //onValueChange={onToggleSwitch}
                  disabled={true}
                />
                <Text style={styles.textalign}>
                  {activo === '0' ? ' No Activo' : 'Activo'}
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
                selectedValue={select2}
                onValueChange={(event) => onValueChange2(event)}>
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

            <Text style={styles.TextEtiqutea}> DIRECCION ALTERNATIVA </Text>

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
            <Text style={styles.TextEtiqutea}>DATOS DEL TUTOR</Text>

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
                  handleSubmit();
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
    );
  };

  if (field_user_apellido1 === '') {
    return null;
  } else {
    return (
      <Container>
        <SafeAreaView style={{flex: 1, paddingTop: 0, marginTop: 0}}>
          <NavBar />
          <ScrollView>
            <SafeAreaView style={styles.container}>
              {perfil != null && _render()}
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
  TextEtiqutea: {
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

export default FormPerfilScreen;

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

/*


let dni = values.dni;
    let usuario =  values.usuario;
    let name= values.name
    let apellido= values.apellido
    let apellido2= values.apellido2
    let email= values.email
    let telefono1= values.telefono1
    let telefono2= values.telefono2

    let direccion= values.direccion
    let direccion2= values.direccion2

    let codPostal= values.codPostal
    let codPostal2= values.codPostal2

    let poblacion= values.poblacion
    let poblacion2= values.poblacion2

    let provincia= values.provincia
    let provincia2= values.provincia2

    let pais= values.pais
    let pais2= values.pais2

    let tutorNif= values.tutorNif
    let tutorNombre= values.tutorNombre
    let tutorObs= values.tutorObs


     let data  =  {
      'field_user_nif': `${values.dni}`,
      'field_user_nombre': `${values.name}`,
      'field_user_apellido1': `${values.apellido}`,
      'field_user_apellido2': `${values.apellido2}`,
      'field_user_nomcompleto': `${values.name} ${values.apellido} ${values.apellido2}`,
      'mail': `${values.email}`,
      'field_user_telefono1': `${values.telefono1}`,
      'field_user_telefono2': `${values.telefono2}`,
      'field_user_fechanac': `${setearFechaNa()}`,
      'field_user_sexo': `${select2}`,
      'field_user_lopd_aceptacion': `${true}`,
      'field_user_clubs': `${["password"]}`,

      'field_user_via': `${values.direccion}`,
      'field_user_codpostal': `${values.codPostal}`,
      'field_user_poblacion': `${values.poblacion}`,
      'field_user_provincia': `${values.provincia}`,
      'field_user_pais': `${values.pais}`,

      'field_user_via_alter': `${values.direccion2}`,
      'field_user_codpostal_alter': `${values.codPostal2}`,
      'field_user_poblacion_alter': `${values.poblacion2}`,
      'field_user_provincia_alter': `${values.provincia2}`,
      'field_user_pais_alter': `${values.pais2}`,

      'field_user_tutor_nif': `${values.tutorNif}`,
      'field_user_tutor_nombre': `${values.tutorNombre}`,
      'field_user_tutor_observaciones': `${values.tutorObs}`,
    }


           <DatePicker
              defaultDate={new Date()}
              minimumDate={new Date(1900, 1, 1)}
              maximumDate={new Date(2021, 12, 31)}
              formatChosenDate={(date) => {
                return moment(date).format('DD-MM-YYYY');
              }}
              //formatChosenDate={date => {return setChosenDate(date).format('YYYY-MM-DD');}}
              locale={'es'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'default'}
              placeHolderText={fechaNac}
              textStyle={{color: 'black'}}
              placeHolderTextStyle={{color: 'black'}}
              onDateChange={(event) => setDate(event)}
              disabled={false}
            />
*/
