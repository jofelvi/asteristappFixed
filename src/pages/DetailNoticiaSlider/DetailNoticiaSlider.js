import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, FlatList, Text, View, Alert, Button, TouchableWithoutFeedback, Dimensions, Image, ScrollView, Keyboard, SafeAreaView, RefreshControl, wait } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import {
    traerDetalleNoticia,
    traerNoticias,
    resetDetalleNoticia,
    traerCategorias,
    traerEtiquetas
} from '../../store/noticias/actions'
import { connect } from 'react-redux';
import NavBar from '../../components/navbar/Navbar';
import Loading from '../../components/Loading/Loading';
import {getNoticias} from "../../HttpRequest/Api";

const { width: screenWidth } = Dimensions.get('window');

const URL = "https://fapd.org/";

function DetailNoticiaSlider({ route, dispatch }) {
    const auth = useSelector((state) => state.auth);
    const noticiasDetalle = useSelector((state) => state.noticias.detalleNoticia);
    const noticias = useSelector((state) => state.noticias.cargando);
    const { item } = route.params;
    const { otherParam } = route.params;
    const regex = /(<([^>]+)>)/ig;
    const [refreshing, setRefreshing] = React.useState(null);
    const [detalleNoticia, setDetalleNoticia] = React.useState([]);

    //const dispatch = useDispatch();
    const { imagen, titulo, contenido } = noticiasDetalle;
    //const [paramItem, setParamItem] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {


        const unsubscribe = navigation.addListener('blur', () => {
            console.log("entro useEffect blur")
            dispatch(resetDetalleNoticia())
        });

        dispatch(traerDetalleNoticia(item));
        (async function cargandoApis() {
            let api = await getDetalleNoticia(item)
            setDetalleNoticia(api)
        })();
        unsubscribe;
        // onRefresh()
    }, [item]);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            //dispatch(traerDetalleNoticia(item));
            setRefreshing(false)
        }, 600);

    }, []);
    const scroll = React.createRef()




    const renderImagen = noticiasDetalle.map((data) => {
        return (

            <View style={styles.imagenContainer}>
                <Image
                    style={styles.newsImage}
                    source={{
                        uri:
                            URL + data.imagen
                    }} />
            </View>

        )
    })

    const renderDetalle = noticiasDetalle.map((data) => {

        return (
            <View style={styles.MainContainer}>
                {console.log(URL + data.imagen + " imagen")}
                <Content>
                    <Image
                        style={styles.newsImage}
                        source={{
                            uri:
                                'https://fapd.org//sites/default/files/2020-07/Elecciones-federativas-2020_4.jpg'
                        }} />


                    <Card>
                        <CardItem >
                            <Text style={styles.textTitleFont}>{data.titulo}</Text>
                        </CardItem>
                        <CardItem >
                            <Text style={styles.textBodyFont}>{data.contenido.replace(regex, '').trim()}</Text>
                        </CardItem>
                        <View style={styles.textCategoria}>
                            <Text style={{ fontWeight: '700' }}>Categorias:  </Text>
                            <Text style={styles.textCategoria}>{data.categorias} </Text>
                            <Text style={{ fontWeight: '700' }}>Etiquetas:  </Text>
                            <Text style={styles.textCategoria}> {data.etiquetas}</Text>

                        </View>

                    </Card>
                </Content>
            </View>

        )
    })

    if (noticias === true) {
        return <Loading isLoading={noticias} text={"cargando..."} />

    } else {



        return (

            <Container>

                <NavBar />
                <SafeAreaView style={{ flex: 1, paddingTop: 0, marginTop: 0 }}>


                    {renderImagen}
                    <ScrollView
                        ref={scroll}
                        style={styles.scrollView}
                        refreshControl={
                            <RefreshControl refreshing={noticias} onRefresh={onRefresh} />
                        }
                    >

                        {renderDetalle}

                    </ScrollView>
                    <Button style={styles.botonAbajo} title="Volver" onPress={() => navigation.goBack()} />

                </SafeAreaView>

            </Container>
        );
    }
};



const styles = StyleSheet.create({
    newsImage: {
        flexBasis: "25%",
        height: "100%"
    },
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 5,
        //marginTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    imagenContainer: {
        //flex: 1,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 25,
    },
    textTitle: {
        marginTop: 5,
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
        textAlign: 'justify',
        marginBottom: 15
    },
    textCategoria: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        marginBottom: 15
    },
    botonAbajo: {
        marginBottom: 55,
        paddingBottom: 55
    },
    newsImage2: {
        flex: 1,
        flexBasis: "30%",
        height: "85%",
        maxHeight: "85%",
        maxWidth: "30%",
        minHeight: "85%",
        minWidth: "30%"
    },

})

export default connect()(DetailNoticiaSlider);
