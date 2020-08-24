import React, { Fragment, useState, useEffect, Component } from 'react'
import { StyleSheet, SafeAreaView, View, Image, Dimensions, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import * as usuarioActions from '../../store/auth/actions'
import * as licenciasActions from '../../store/licencias/actions'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import ListLicencias from '../../components/ListLicencias/ListLicencias';
import NavBar from '../../components/navbar/Navbar';


const URL = 'https://licencias.fapd.org/json-licencias-vigentes?_format=json';

const { width: screenWidth } = Dimensions.get('window');

class LicenciasCaducadas extends Component {
    constructor(props) {
        super(props);

    };
    componentDidMount() {
        const { roles } = this.props.auth.usuario.current_user
        if (this.props.auth.usuario.access_token !== null) {
            var token = this.props.auth.usuario.access_token;
            this.props.traerLicenciasCadu(token);
            console.log("test aqui")
            console.log(this.props.auth.usuario.current_user.uid); // de esta misma forma .roles traemos los roles y con la linea de abajo sabes si incluye el rol
        }
    }

    render_text = () => {
            return <Text style={{ paddingTop: 25, paddingLeft: 5 }}>
                el usuario {this.props.auth.usuario.current_user.name} No tiene licencias caducadas
            </Text>
        
    }
    render() {
        //const auth = useSelector((state) => state.auth);

        return (
            <Container >
            <NavBar></NavBar>
                            <ScrollView keyboardShouldPersistTaps='always'>
                                <SafeAreaView style={styles.container}>
            <View style={styles.container}>
            <Text style={styles.TxtoTituloNew} > LICENCIAS CADUCADAS: </Text>
                {this.props.licencias.solicitarLicCadu.length <= 1 || this.props.licencias.solicitarLicCadu === []? this.render_text(): null}
                {
                    this.props.licencias.solicitarLicCadu.map((item) => (

                        <ListLicencias
                            club={item.club}
                            categoria={item.categoria}
                            esPrimera={item.es_primera}
                            fechaEmision={item.fecha_emision}
                            importe={item.importe}
                            modalidad={item.modalidad}
                            nid={item.nid}
                            //numeroLicencia={item.numero_licencia}
                            year={item.year}
                            caducada={true}
                        />

                    ))
                }
            </View >
            </SafeAreaView>
                </ScrollView>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth, licencias }) => {
    return {
        auth,
        licencias
    }
};
const mapDispatchToProps = {
    ...licenciasActions,
    ...usuarioActions
}
export default connect(mapStateToProps, mapDispatchToProps)(LicenciasCaducadas);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    buttonContainer: {
        margin: 5
    },
    containerLogo: {
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    newsImage: {
        flexBasis: "25%",
        height: "100%"
    },
    TxtoTituloNew: {
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 18

    },
    textTitle: {
        marginTop: 10,
        marginLeft: 0,


    },
    textTitleFont: {
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },

    textBodyFont: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 15,
        textAlign: 'justify'
    },
    textCategoria: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14
    },

})



