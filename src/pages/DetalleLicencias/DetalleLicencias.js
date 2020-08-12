import React, { Fragment, useState, useEffect, Component } from 'react'
import { StyleSheet, SafeAreaView, View, Image, Dimensions, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import * as usuarioActions from '../../store/auth/actions'
import * as licenciasActions from '../../store/licencias/actions'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import ListLicencias from '../../components/ListLicencias/ListLicencias';
import NavBar from '../../components/navbar/Navbar';
import { useNavigation } from '@react-navigation/native';

const URL = 'https://licencias.fapd.org/json-licencias-vigentes?_format=json';

const { width: screenWidth } = Dimensions.get('window');

class DetalleLicencias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: false
        }
    };
    componentDidMount() {
        
     
    }

   

    render() {
        //const auth = useSelector((state) => state.auth);
        if (!this.state.admin) {


            return (

                <View style={styles.container}>
                    <NavBar></NavBar>
                    <Text style={styles.TxtoTituloNew} > LICENCIAS VIGENTES: </Text>

                    {
                        this.props.licencias.licenciasVig.map((item) => (

                            <ListLicencias
                                club={item.club}
                                categoria={item.categoria}
                                esPrimera={item.es_primera}
                                fechaEmision={item.fecha_emision}
                                importe={item.importe}
                                modalidad={item.modalidad}
                                nid={item.nid}
                                numeroLicencia={item.numero_licencia}
                                year={item.year}
                            />

                        ))
                    }
                </View >

            );
        } else {

            return (

                <View style={styles.container}>

                    <Text style={styles.TxtoTituloNew} > LICENCIAS VIGENTES: </Text>

                    {
                        this.props.licencias.licenciasVigRoles.map((item) => (

                            <ListLicencias
                                club={item.club}
                                categoria={item.categoria}
                                esPrimera={item.es_primera}
                                fechaEmision={item.fecha_emision}
                                importe={item.importe}
                                modalidad={item.modalidad}
                                nid={item.nid}
                                numeroLicencia={item.numero_licencia}
                                year={item.year}
                            />

                        ))
                    }
                </View >

            );
        }
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
export default connect(mapStateToProps, mapDispatchToProps)(DetalleLicencias);
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



