import React, { Fragment, Component } from 'react'
import { StyleSheet, SafeAreaView, View, Keyboard, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../../components/ValidateForm/FormInput'
import FormButton from '../../components/ValidateForm/FormButton'
import ErrorMessage from '../../components/ValidateForm/ErrorMessage'
import { Avatar } from 'react-native-elements';

const { width: screenWidth } = Dimensions.get('window');

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .label('Nombre')
        .required()
        .min(2, 'Debe tener al menos 2 letras'),
    email: Yup.string()
        .label('Email')
        .email('Introducir un Email valido')
        .required('Por favor introducir un Email'),
    password: Yup.string()
        .label('Constraseña')
        .required('La Constraseña es requerida')
        .min(4, 'La contraseña debe tener al menos 8 caracteres '),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('Constraseña')], 'La contraseña y la conformacion deben coincidir')
        .required('La confirmacion es requerida')
})

class PerfilScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    goToBack = () => this.props.navigation.goBack()

    handleSubmit = values => {
        if (values.email.length > 0 && values.password.length > 0) {
            setTimeout(() => {
                this.props.navigation.navigate('App')
            }, 3000)
        }
    }

    
    render() {
        return (

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={styles.container}>
                    <Avatar
                        size="xlarge"
                        rounded
                        source={{
                            uri:
                                'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                        }}
                        containerStyle={styles.container}
                    ></Avatar>

                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        onSubmit={values => {
                            this.handleSubmit(values)
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
                            isSubmitting
                        }) => (
                                <Fragment>

                                    <FormInput
                                        name='name'
                                        value={values.name}
                                        onChangeText={handleChange('name')}
                                        placeholder='Introducir Nombre completo'
                                        iconName='md-person'
                                        iconColor='#2C384A'
                                        onBlur={handleBlur('name')}

                                    />
                                    <ErrorMessage errorValue={touched.name && errors.name} />
                                    <FormInput
                                        name='email'
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        placeholder='Introducir E-mail'
                                        autoCapitalize='none'
                                        iconName='ios-mail'
                                        iconColor='#2C384A'
                                        onBlur={handleBlur('email')}
                                    />
                                    <ErrorMessage errorValue={touched.email && errors.email} />
                                    <FormInput
                                        name='password'
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        placeholder='Introducir contraseña'
                                        secureTextEntry
                                        iconName='ios-lock'
                                        iconColor='#2C384A'
                                        onBlur={handleBlur('password')}
                                    />
                                    <ErrorMessage errorValue={touched.password && errors.password} />
                                    <FormInput
                                        name='password'
                                        value={values.confirmPassword}
                                        onChangeText={handleChange('confirmPassword')}
                                        placeholder='Confirmar contraseña'
                                        secureTextEntry
                                        iconName='ios-lock'
                                        iconColor='#2C384A'
                                        onBlur={handleBlur('confirmPassword')}
                                    />
                                    <ErrorMessage
                                        errorValue={touched.confirmPassword && errors.confirmPassword}
                                    />
                                    <View style={styles.buttonContainer}>
                                        <FormButton
                                            buttonType='outline'
                                            onPress={handleSubmit}
                                            title='Guardar Cambios'
                                            buttonColor='#F57C00'
                                            disabled={!isValid || isSubmitting}
                                            loading={isSubmitting}
                                        />
                                    </View>
                                </Fragment>
                            )}
                    </Formik>
                    <Button
                        title='Volver'
                        onPress={this.goToBack}
                        titleStyle={{
                            color: '#039BE5'
                        }}
                        type='clear'
                    />

                </View>
            </TouchableWithoutFeedback>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    buttonContainer: {
        margin: 25
    },
    logo: {
        width: screenWidth - 60,
        height: screenWidth - 180,

    },
    containerLogo: {
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container2: {
        flex: 1,
        backgroundColor: '#fff'
    },
    buttonContainer: {
        margin: 25
    }
})

export default PerfilScreen;