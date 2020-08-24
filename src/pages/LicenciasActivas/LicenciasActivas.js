import React, { Fragment, useState, useEffect, Component } from 'react'
import { StyleSheet, SafeAreaView, View, Image, Dimensions, Alert, ScrollView, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import * as usuarioActions from '../../store/auth/actions'
import * as licenciasActions from '../../store/licencias/actions'
import ListLicencias from '../../components/ListLicencias/ListLicencias';
import NavBar from '../../components/navbar/Navbar';
import { useNavigation } from '@react-navigation/native';
import { LICENCIAICON } from '../../assets/image';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button ,Card} from 'native-base';
import { parseZone } from 'moment';
import Loading from '../../components/Loading/Loading';



const { width: screenWidth } = Dimensions.get('window');

class LicenciasActivas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: false
        }
        this.GetItem = this.GetItem.bind(this);

    };

    componentDidMount() {
        const access_token = this.props.auth.usuario.access_token
        const { current_user } = this.props.auth.usuario
        const { uid} = current_user
        const { roles } = this.props.auth.rolesUser
        const detalleLicenciasVig = this.props.licencias.detalleLicenciasVig   
        let rol = this.props.auth.usuario.current_user.roles
        
        if (rol.includes('authenticated') && rol.includes('contabilidad') || rol.includes('gestión') || rol.includes('directiva') || rol.includes('club')) {

            this.props.traerLicenciasVigRoles(uid, access_token);
            console.log("entro traerLicenciasVigRoles" )
        } else {
            this.props.traerLicenciasVig(access_token);
            console.log("entro")
        }
        console.log("arreglo licencias " + detalleLicenciasVig.length >=0 )
    }
    GetItem(item) {
        //Function for click on an item
        this.props.navigation.navigate('DetailsLicencias', {
            item: item
        });
        //Alert.alert(item);
    }


    render_text = () => {
       
            return <Text style={{ paddingTop: 25, paddingLeft: 5 }}>
                Lo siento su usuario {this.props.auth.usuario.current_user.name} no tiene licencias activas
                 </Text>
        
    }
    render() {
        if (this.props.auth.cargando === true) {
            return <Loading isVisible={this.props.auth.cargando} text={'CARGANDO...'} />;
        }
        if (!this.state.admin) {
            return (

                <View style={styles.container}>
                    <NavBar></NavBar>
                    <Text style={styles.TxtoTituloNew} > LICENCIAS EN VIGOR: </Text>
                    {this.props.licencias.licenciasVig.length <= 0 ? this.render_text() : null }
                    {

                        this.props.licencias.licenciasVig.map((item) => (
                            <TouchableOpacity onPress={()=>this.GetItem(item)}>
                                    <Card style={{marginTop: 20}}>
                                    <View style={styles.newsListContainer}>
                                    <Thumbnail source={LICENCIAICON} />
                                    <View style={styles.newsInfo}>                                               
                                     <Text style={styles.textBodyFont}>CLUB: {item.club}</Text>
                                                <Text 
                                                note 
                                                numberOfLines={1}
                                                >
                                                    Categoria: {item.categoria}
                                                </Text>
                                                <Text note>Fecha Emision: {item.fechaEmision}</Text>
                                                <Text note>Importe: {item.importe}</Text>
                                                <Text note>Modalidad: {item.modalidad}</Text>
                                                <Text note>Año: {item.year}</Text>
                                            </View>
                                              
                                        </View>
                                    </Card>
                            </TouchableOpacity>
            ))
                    }
                </View >

            );
        } else {

            return (

                <View style={styles.container}>

                    <Text style={styles.TxtoTituloNew} > LICENCIAS VIGENTES: </Text>
                    {console.log( this.props.licencias.licenciasVigRoles.length <= 0 )}
                    { this.props.licencias.licenciasVigRoles.length <= 0 || this.props.licencias.licenciasVigRoles === []? this.render_text(): null}
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
export default connect(mapStateToProps, mapDispatchToProps)(LicenciasActivas);

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
    newsListContainer: {
        width: "100%",
        marginBottom: 4,
        padding: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    newsImage: {
        flexBasis: "25%",
        height: "100%"
    },

    newsInfo: {
        flexBasis: "75%",
        padding: 2,
        alignSelf: "flex-start"
    },


})



/*




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
*/