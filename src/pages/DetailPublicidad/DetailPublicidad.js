import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, FlatList, Text, View, Alert, Button, TouchableWithoutFeedback, Dimensions, Image, ScrollView, Keyboard, SafeAreaView, RefreshControl, wait } from 'react-native';
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import * as usuarioActions from '../../store/auth/actions'
import { traerDetalleNoticia, traerNoticias } from '../../store/noticias/actions'
import { connect } from 'react-redux';
import NavBar from '../../components/navbar/Navbar';

const { width: screenWidth } = Dimensions.get('window');
const screenHeight = Dimensions.get('window').height


const URL = "https://fapd.org/";

function DetailPublicidad({ route, navigation, dispatch }) {
    const auth = useSelector((state) => state.auth);
    const noticiasDetalle = useSelector((state) => state.noticias.detalleNoticia);
    const { item } = route.params;
    const { otherParam } = route.params;
    const regex = /['"](.*?)['"]/;
    const [refreshing, setRefreshing] = React.useState(false);
    //const dispatch = useDispatch();
    const { id, contenido, titulo, imagen } = item;
    const result = regex.exec(imagen)
    const src = regex.exec(result)[1]

    useEffect(() => {
        console.log("entro useEffect detalle noticia")
        onRefresh()
    }, [item]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false)
        }, 10);
    }, []);
    //{result = contenido.replace(regex, '').trim()}



    return (

        <SafeAreaView>
            <NavBar />

            <View >

                <View style={styles.imagenContainer}>
                    <Image
                        style={styles.newsImage}
                        source={{
                            uri:
                                URL + src
                        }} />
                </View>
                <View style={{ Height: "auto", maxHeight: screenHeight, marginTop: 0 }}>
                    <ScrollView >
                        <View
                            style={{ marginTop: 0 }}
                            contentContainerStyle={styles.scrollView}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }>{console.log(JSON.stringify(item))}

                            <Card>
                                <CardItem >
                                    <Text style={styles.textTitleFont}>{titulo}</Text>
                                </CardItem>
                                <CardItem >
                                    <Text style={styles.textBodyFont}>{contenido}</Text>
                                </CardItem>
                            </Card>
                            <Button title="Volver" onPress={() => navigation.goBack()} />

                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>


    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 50
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

export default connect()(DetailPublicidad);