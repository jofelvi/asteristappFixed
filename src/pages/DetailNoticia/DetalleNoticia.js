//This is an example code for FlatList// 
import React, { useEffect, useState, Component } from 'react';
//import react in our code. 
import { StyleSheet, FlatList, Text, View, Alert, Button, TouchableWithoutFeedback, Dimensions, Image, ScrollView, Keyboard } from 'react-native';
//import all the components we are going to use. 
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import * as noticiasAction from '../../store/noticias/actions'
import { connect } from 'react-redux';
import * as usuarioActions from '../../store/auth/actions'
import * as licenciasActions from '../../store/licencias/actions'
import * as noticiasActions from '../../store/noticias/actions'

const urlDetalleNoticias = 'https://fapd.org/json-articulo?id=';
const { width: screenWidth } = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    buttonContainer: {
        margin: 5
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
    newsImage: {
        flexBasis: "25%",
        height: "100%"
    },
    imagenContainer: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 25,
        paddingBottom: 20

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




class DetailsScreen extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        //this.forceUpdate();

        //console.log(item + "parametro id")
        const { item } = this.props.route.params ? this.props.route.params : "";

        this.props.traerDetalleNoticia(item)

    };
    render() {
        const regex = /(<([^>]+)>)/ig;
        const URL = "https://fapd.org";
        const { navigation } = this.props;
        const detalle = this.props.noticias.detalleNoticia
        const { item } = this.props.route.params ? this.props.route.params : "";

        /* const data = Array.from(this.props.noticias.detalleNoticia);
         const contenido = data.map(item => item.contenido)
         const categorias = data.map(item => item.categorias)
         const id = data.map(item => item.id)*/

        const detalleNoticia = detalle.map((data) => {
            return (

                <View style={styles.imagenContainer}>
                    <View>
                        <Image
                            style={styles.newsImage}
                            source={{
                                uri:
                                    URL + data.imagen
                            }} />
                    </View>
                    <ScrollView>
                        <View style={styles.textTitle}>

                            <Card>
                                <CardItem >
                                    <Text style={styles.textTitleFont}>{data.titulo}</Text>
                                </CardItem>
                                <CardItem >
                                    <Text style={styles.textBodyFont}>{result = data.contenido.replace(regex, '').trim()}</Text>
                                </CardItem>
                                <View style={styles.textCategoria}>
                                    <Text style={styles.textCategoria}>categorias: {data.categorias} etiquetas: {data.etiquetas}</Text>
                                </View>

                            </Card>
                            <Button title="Volver" onPress={() => navigation.goBack()} />

                        </View>
                    </ScrollView>
                </View>
            )
        })
        return (

            <View >
                <Text>{item}</Text>
                {detalleNoticia}


            </View >


        );
    }
}

const mapStateToProps = ({ auth, noticias }) => {
    return {
        auth,
        noticias
    }
};
const mapDispatchToProps = {
    ...noticiasActions,
    ...usuarioActions
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);
/*
{JSON.stringify(this.props.noticias.detalleNoticia)}
{detalle.map(item => <Text>{item.id}</Text>)}
handleAPi = () => {
        axios.get(urlDetalleNoticias + item)
            .then(res => {
                this.setState({ detalleNew: res.data })
                this.desgloseFuntion();
            }).catch(err => {
                console.log("Error", err);
                Alert.alert("Error con el servidor volver a intentar")
            })
    }

    desgloseFuntion = () => {
        const jsObjects = this.state.detalleNew;
        jsObjects.filter(obj => {

            this.setState({
                id: obj.id,
                titulo: obj.titulo,
                contenido: obj.contenido,
                categorias: obj.categorias,
                etiquetas: obj.etiquetas,
                imagen: obj.imagen,
                archivos: obj.archivos,
                galeria: obj.galeria,

            })

                jsObjects.filter(obj => {obj.titulo })

        })
    }


    jsObjects.filter(obj => { obj.id})
    */