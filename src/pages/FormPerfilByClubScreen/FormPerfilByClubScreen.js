import React, {Component, Fragment} from 'react';
import * as usuarioActions from '../../store/auth/actions';
import * as licenciasActions from '../../store/licencias/actions';
import NavBar from '../../components/navbar/Navbar';
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View,} from 'react-native';
import {Button} from 'react-native-elements';
import FormInput from '../../components/ValidateForm/FormInput';
import FormButton from '../../components/ValidateForm/FormButton';
import ErrorMessage from '../../components/ValidateForm/ErrorMessage';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Container, Item, List, ListItem, Picker,} from 'native-base';
import {Switch} from 'react-native-paper';
import DatePicker from 'react-native-datepicker';
import axios from 'axios'
import {getDataPerfil} from "../../HttpRequest/Api";

const {width: screenWidth} = Dimensions.get('window');

class FormPerfilByClubScreen2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            perfil: [],
            fecha: '',
            selectSexo: '',
            clubs: [],

        };
    }
    async componentDidMount() {

        console.log("fomulario clase aqui test")

        const access_token = this.props.auth.usuario.access_token;
        const {current_user} = this.props.auth.usuario;
        const {uid} = current_user;
        const {item} = this.props.route.params ? this.props.route.params : "";

        this.handleApi(item, access_token)
    }

    handleApi = async (itemNuevo, access_token) => {

        let respuesta = await getDataPerfil(itemNuevo,access_token)

        this.setState({perfil: respuesta.perfil, fecha: respuesta.fecha })

    }


    callback = (newDate) => {
        console.log('entro callback2 ' + newDate);
        var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
        let fechaParse = newDate.replace(pattern, '$3-$2-$1');
        this.setState({fecha: fechaParse});
    };

    handleSubmit = (values) => {
        const {item} = this.props.route.params ? this.props.route.params : "";
        const access_token = this.props.auth.usuario.access_token;
        console.log("handle submit")
        console.log(JSON.stringify(values))
        const data = {
            uid: [
                {
                    value: item
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
                    value: `${values.name}  ${values.apellido}  ${values.apellido2}`,
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
                    value: `${this.state.selectSexo}`,
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
        console.log(JSON.stringify(data))
        this.editarPerfil(item, access_token, data);
    };

    editarPerfil = (uid, token, data) => {

        console.log("entro editar")


        try {
            fetch(`https://licencias.fapd.org/user/${uid}?_format=json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: data
            }).then((respuesta) => {
                console.log('exito entro funcion  respuesta API editarPerfil');
                console.log(respuesta.status);

            });

        } catch (error) {
            console.log(error)
        }
    }
    setFirstValue = (value) => {
        if (this.state.selectSexo === '' || this.state.selectSexo === null) {
            let clubsIds = JSON.stringify(this.state.perfil.field_user_clubs.map((item) => item.target_id))
            this.setState({
                selectSexo: value,
                clubs: clubsIds
            });
        }
    }

    renderClubs = () => {
        console.log(this.state.clubs)
    }

    render() {

        if (this.state.perfil.length <= 0) {
            return null

        }
        let perfil = this.state.perfil
        let fechaVar = this.state.fecha
        console.log(" FECHA ANTES RETURN ", fechaVar)
        return (
            <Container>
                <SafeAreaView style={{flex: 1, paddingTop: 0, marginTop: 0}}>
                    <NavBar/>
                    <ScrollView>
                        <SafeAreaView style={styles.container}>
                            <Formik
                                initialValues={{
                                    dni: String(perfil.field_user_nif[0].value),
                                    usuario: String(JSON.stringify(perfil.uid[0].value)),
                                    name: typeof perfil.field_user_nombre[0] === 'undefined' ? "" : String(perfil.field_user_nombre[0].value),
                                    apellido: typeof perfil.field_user_apellido1[0] === 'undefined' ? "" : String(perfil.field_user_apellido1[0].value),
                                    apellido2: typeof perfil.field_user_apellido2[0] === 'undefined' ? "" : String(perfil.field_user_apellido2[0].value),
                                    email: typeof perfil.mail[0] === 'undefined' ? "" : String(perfil.mail[0].value),
                                    telefono1: typeof perfil.field_user_telefono1[0] === 'undefined' ? "" : String(perfil.field_user_telefono1[0].value),
                                    telefono2: typeof perfil.field_user_telefono2[0] === 'undefined' ? "" : String(perfil.field_user_telefono2[0].value),
                                    fechaNac: typeof perfil.field_user_fechanac[0] === 'undefined' ? "" : String(perfil.field_user_fechanac[0].value),
                                    direccion: typeof perfil.field_user_via[0] === 'undefined' ? "" : String(perfil.field_user_via[0].value),
                                    direccion2: typeof perfil.field_user_via_alter[0] === 'undefined' ? "" : String(perfil.field_user_via_alter[0].value),

                                    codPostal: typeof perfil.field_user_codpostal[0] === 'undefined' ? "" : String(perfil.field_user_codpostal[0].value),
                                    codPostal2: typeof perfil.field_user_codpostal_alter[0] === 'undefined' ? "" : String(perfil.field_user_codpostal_alter[0].value),
                                    poblacion: typeof perfil.field_user_poblacion[0] === 'undefined' ? "" : String(perfil.field_user_poblacion[0].value),
                                    poblacion2: typeof perfil.field_user_poblacion_alter[0] === 'undefined' ? "" : String(perfil.field_user_poblacion_alter[0].value),
                                    provincia: typeof perfil.field_user_provincia[0] === 'undefined' ? "" : String(perfil.field_user_provincia[0].value),
                                    provincia2: typeof perfil.field_user_provincia_alter[0] === 'undefined' ? "" : String(perfil.field_user_provincia_alter[0].value),
                                    pais: typeof perfil.field_user_pais[0] === 'undefined' ? "" : String(perfil.field_user_pais[0].value),
                                    pais2: typeof perfil.field_user_pais_alter[0] === 'undefined' ? "" : String(perfil.field_user_pais_alter[0].value),
                                    tutorNif: typeof perfil.field_user_tutor_nif[0] === 'undefined' ? "" : String(perfil.field_user_tutor_nif[0].value),
                                    tutorNombre: typeof perfil.field_user_tutor_nombre[0] === 'undefined' ? "" : String(perfil.field_user_tutor_nombre[0].value),
                                    tutorObs: typeof perfil.field_user_tutor_observaciones[0] === 'undefined' ? "" : String(perfil.field_user_tutor_observaciones[0].value),

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
                                        <Text style={styles.TextEtiqutea}> DATOS USUARIO </Text>
                                        {this.setFirstValue(typeof perfil.field_user_sexo[0] === 'undefined' ? "" : String(perfil.field_user_sexo[0].value))}
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

                                        <ErrorMessage errorValue={touched.dni && errors.dni}/>

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
                                        <ErrorMessage errorValue={touched.name && errors.name}/>

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
                                        <ErrorMessage errorValue={touched.email && errors.email}/>

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
                                        <Text style={styles.TextEtiqutea2}>FECHA DE NACIMIENTO</Text>

                                        <DatePicker
                                            style={{width: 200}}
                                            date={fechaVar}
                                            mode="date"
                                            locale="es"
                                            placeholder={fechaVar}
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

                                        <ErrorMessage/>

                                        {/*<Text>Fecha: {fechaVar}</Text> */}
                                        <Text style={styles.TextEtiqutea2}>GENERO </Text>
                                        <Item picker>
                                            <Picker
                                                mode="dropdown"
                                                style={{width: undefined}}
                                                iosHeader={'Seleccione Sexo'}
                                                placeholder="Seleccione Sexo"
                                                placeholderStyle={{color: '#bfc6ea'}}
                                                placeholderIconColor="#007aff"
                                                headerBackButtonText="Volver"
                                                selectedValue={this.state.selectSexo}
                                                onValueChange={(itemValue) =>
                                                    this.setState({selectSexo: itemValue})
                                                }>
                                                <Picker.Item label="Hombre" value="1"/>
                                                <Picker.Item label="Mujer" value="2"/>
                                            </Picker>
                                        </Item>
                                        <ErrorMessage/>

                                        <List>
                                            <ListItem>
                                                <Switch
                                                    value={
                                                        !perfil.field_user_baja[0].value

                                                    }
                                                    //onValueChange={onToggleSwitch}
                                                    disabled={true}
                                                />
                                                <Text style={styles.textalign}>
                                                    {
                                                        !perfil.field_user_baja[0].value === false ? ' No Activo' : 'Activo'
                                                    }
                                                </Text>
                                            </ListItem>
                                        </List>
                                        <ErrorMessage/>

                                        <Item picker>
                                            <Picker
                                                mode="dropdown"
                                                style={{width: undefined}}
                                                placeholder="clubs"
                                                placeholderStyle={{color: '#bfc6ea'}}
                                                placeholderIconColor="#007aff"
                                                //selectedValue={this.setState.clubs}
                                                //onValueChange={(event) => this.setState({clubs: event})}
                                            >
                                                <Picker.Item label="w" value="key0"/>

                                            </Picker>
                                        </Item>

                                        <ErrorMessage/>

                                        <FormInput
                                            label="CALLE"
                                            name="direccion"
                                            value={values.direccion}
                                            onChangeText={handleChange('direccion')}
                                            placeholder="direccion"
                                            onBlur={handleBlur('direccion')}
                                        />
                                        <ErrorMessage/>

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
                                            label="CODIGO POSTAL ALTERNATIVO"
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
                        </SafeAreaView>
                    </ScrollView>
                    <Button
                        style={styles.botonAbajo}
                        title="Volver"
                        onPress={() => this.props.navigation.goBack()}
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
export default connect(mapStateToProps, mapDispatchToProps)(FormPerfilByClubScreen2);

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


