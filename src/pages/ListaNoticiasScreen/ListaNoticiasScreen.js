//This is an example code for FlatList//
import React, {useState, useEffect, useRef} from 'react';
//import react in our code.
import {
    StyleSheet,
    FlatList,
    Text,
    View,
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

//import all the components we are going to use.
import axios from 'axios';
import Publicidad from '../../components/Publicidad/Publicidad';
import Slide from '../../components/Slide/Slide';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Body,
    Button,
    Thumbnail,
    Picker,
    Item,
    Left,
} from 'native-base';
import {
    traerNoticias,
    traerCategorias,
    traerEtiquetas,
} from '../../store/noticias/actions';
import {useDispatch, useSelector} from 'react-redux';
import NavBar from '../../components/navbar/Navbar';
import {useNavigation} from '@react-navigation/native';
import * as RootNavigation from '@react-navigation/native';
import {SearchBar} from 'react-native-elements';
import {TRAER_NOTICIAS} from '../../store/noticias/Constants';
import {Modal, Portal, Provider} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {useScrollToTop} from '@react-navigation/native';
import Loading from "../../components/Loading/Loading";


function ListaNoticiasScreen(props) {
    //State
    const [visible, setVisible] = React.useState(false);
    const route = useRoute();
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [flatListItms, setFlatListItms] = useState([]);
    const [publicidadList, setPublicidadList] = useState([]);
    const [page, setPage] = useState(0);
    const noticias = useSelector((state) => state.noticias);
    const categorias = useSelector((state) => state.noticias.categoriasNoticias);
    const etiquetas = useSelector((state) => state.noticias.etiquetasNoticias);
    const [selectCategoria, setSelectCategoria] = useState();
    const [selectEtiqueta, setSelectEtiqueta] = useState();
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const regex2 = /['"](.*?)['"]/;
    const navigation = useNavigation();
    const URLBASE = 'https://fapd.org';
    const [resJson, setresJson] = useState([]);
    const scroll = React.createRef();
    let arrayholder = [];
    const ref = React.useRef(null);
    const [isloading, setisloading] = useState(false);
    const usuario = useSelector((state) => state.auth.usuario);
    const auth = useSelector((state) => state.auth);
    const rolesUser = useSelector((state) => state.auth.rolesUser);

    useEffect(() => {
        setisloading(true)
        //console.log(noticias)
        dispatch(traerNoticias(page));
        dispatch(traerCategorias());
        dispatch(traerEtiquetas());
        hanndleApiPublicidad();
        console.log("------------------------------------ AUTH --------", JSON.stringify( rolesUser));

    }, [page]);

    const hanndleApiPublicidad = () => {
        console.log('entro useEffect');
        axios
            .get(`https://fapd.org/json-publicidad`)
            .then((res) => {
                setresJson(res.data);
                setisloading(false)
            }).catch((err) => {
            console.log('error in request', err);
        });
    };

    const getItem2 = (item) => {
        //Function for click on an item
        navigation.navigate('DetailPublicidad', {
            item: item,
        });
        //Alert.alert(item);
    };

    const handleApiNoticias = () => {
        axios
            .get(`https://fapd.org/json-noticias?page=` + page)
            .then((res) => {
                //datasplit = res.data.splice(0, 10);
                //console.log(res.data);
                setFlatListItms(res.data);
                setisloading(false)
            })
            .catch((err) => {
                console.log('error in request', err);
                //Alert.alert("error in request", err)
            });
    };


    const handleApiNoticiasFiltrar = (categoria, etiqueta) => {

        let URLNOTICIASFILTER = `https://fapd.org/json-noticias?categorias=${categoria}&etiquetas=${etiqueta}`
        console.log(URLNOTICIASFILTER)
        axios
            .get(URLNOTICIASFILTER)
            .then((res) => {
                //datasplit = res.data.splice(0, 10);
                dispatch({
                    type: TRAER_NOTICIAS,
                    payload: res.data
                })
              setisloading(false)
            }).catch((err) => {
                console.log('error in request', err);
                //Alert.alert("error in request", err)
            });


    };

    const handleFilter = () => {

        if (selectCategoria !== undefined || selectCategoria !== "") {
            let respuestaEtiquetas = selectEtiqueta === "0" || selectEtiqueta === '' ? "" : _findEtiquetas(selectEtiqueta)
            let respuestaCategoria = _findCategorias(selectCategoria)
            console.log('dos valores' + selectCategoria + "   " + selectEtiqueta);
            console.log('Etiqueta categoria' + respuestaCategoria);
            console.log('Etiqueta ' + respuestaEtiquetas);
            setisloading(true)
            handleApiNoticiasFiltrar(respuestaCategoria, respuestaEtiquetas)
            hideModal()
        }

    };

    const handleFilterCleans = () => {
        setSelectCategoria(-1)
        setSelectEtiqueta(-1)
        handleApiNoticias()
    };

    const getItem = (item) => {
        //RootNavigation.navigate('DetailNoticiaSlider', {item: item });

        navigation.navigate('DetailNoticiaSlider', {
            item: item,
        });
    };

    const handlepaPageNext = () => {
        console.log(page + 'pagina');
        setisloading(true)
        if (page >= 0) {
            setPage(page + 1);
            console.log(page + 'pagina');
            handleApiNoticias();

            //scroll.current.scrollTo({x: 0, animated: false });
        }
    };

    const handlepaPagePrev = () => {
        if (page >= 1) {
            setPage(page - 1);
            //handleApiNoticias();
            //scroll.current.scrollTo({x: 0, y: 0, animated: true});
            //scroll.current.scrollTo({x: 0, animated: false });
        }
    };

    const _renderCategorias = categorias.map((data, index) => {
        return <Picker.Item label={data.categoria} value={index}/>;
    });

    const _renderEtiquetas = etiquetas.map((data, index) => {
        return <Picker.Item label={data.etiqueta} value={index}/>;
    });

    const _findEtiquetas = (key) => {
        let etiqueta = ""
        const index = etiquetas.findIndex(x => {
            if (x.id == key)
                etiqueta = x.etiqueta
        })
        return etiqueta
    };

    const _findCategorias = (key) => {
        let categoria = ""
        const index = categorias.findIndex(x => {
            if (x.id == key)
                categoria = x.categoria
        })
        return categoria
    };

    const regex = /(<([^>]+)>)/gi;
    const URL = 'https://fapd.org/';

    const searchFilterFunction = (text) => {
        const newData = this.arrayholder.filter((item) => {
            const itemData = `${item.name.title.toUpperCase()}   
        ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;

            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });

        this.setState({data: newData});
    };


  if (isloading === true) {
    return (
        <Loading
            isVisible={isloading}
            text={'CARGANDO...'}
        />
    );
  }

    return (
        <Container>
            <SafeAreaView style={{flex: 1}}>
                <NavBar
                    flat={false}
                    ruta="home"
                />
                <ScrollView
                    ref={ref}
                    //onContentSizeChange={()=> Toplist() }
                    //ref={(c) => {scroll = c}}
                    style={styles.scrollView}>
                    <Slide/>
                    <View style={styles.MainContainer}>
                        {/* <SearchBar
              placeholder="Buscar Noticia"
              //onChangeText={this.¡}
              //value={search}
              lightTheme
              round
              onChangeText={(text) => searchFilterFunction(text)}
              autoCorrect={false}
            /> */}
                        <Button
                            small
                            info
                            onPress={() => showModal()}
                        >
                            <Text style={styles.textButton}>Filtrar Noticias</Text>
                        </Button>
                        <FlatList
                            data={noticias.noticias}
                            //extraData={resJson}
                            renderItem={({item, index}) => {
                              let result;
                              let src
                              if (index === 2 || index === 5 || index === 8) {
                                return (
                                    <View>
                                      {resJson.map(
                                          (item, index) => (
                                              (result = regex2.exec(item.imagen)),
                                                  ( src = regex2.exec(result)[1]),
                                        (
                                        <TouchableOpacity onPress={() => getItem2(item)}>
                                        <Card key={index} Thumbnail>
                                        <CardItem Thumbnail>
                                        <Left>
                                        <Thumbnail source={{uri: URLBASE + src}}/>

                                        <CardItem>
                                        <Body>
                                        <Text>{item.titulo} </Text>
                                        <Text>{item.contenido}</Text>
                                        </Body>
                                        </CardItem>
                                        </Left>
                                        </CardItem>
                                        </Card>
                                        </TouchableOpacity>
                                        )
                                        ),
                                        )}
                                    </View>
                                );
                              }
                                return (
                                    <TouchableOpacity //
                                        onPress={() => getItem(item.id)}>
                                        <Card key={index}>
                                            <CardItem style={{
                                                paddingLeft: 4,
                                                paddingRight: 0,
                                                paddingBottom: 0,
                                                paddingTop: 0,
                                                alignItems: 'center',
                                                minHeight: 110,
                                                maxHeight: 'auto',
                                            }}>
                                                <View style={{
                                                    maxHeight: 100,
                                                    maxWidth: 150,
                                                    minWidth: 150,
                                                }}>
                                                    <Image
                                                        style={styles.newsImage}
                                                        source={{uri: URL + item.imagen}}
                                                    />
                                                </View>
                                                <Body>
                                                    <Text numberOfLines={2}
                                                          style={styles.newsTitle}>{item.titulo} </Text>

                                                    <Text
                                                        numberOfLines={3}
                                                        style={styles.newsDescription}>
                                                        {item.contenido.replace(regex, '')}
                                                    </Text>
                                                    <Text style={styles.newsCategoria}>{item.categorias}</Text>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />

                        <View style={styles.containerButton}>
                            <View style={styles.buttonContainer}>
                                <Button
                                    active={page === 0 ? false : true}
                                    small
                                    info
                                    onPress={() => handlepaPagePrev()}

                                >
                                    <Text style={styles.textButton}>Anterior pagina</Text>
                                </Button>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button small info onPress={() => handlepaPageNext()}>
                                    <Text style={styles.textButton}>Siguiente pagina</Text>
                                </Button>
                            </View>
                        </View>
                    </View>


                </ScrollView>
                <Provider>
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.overlay}>
                            <View style={styles.view}>
                                <Text style={styles.text22}>Filtrar Noticias Por</Text>
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        style={{width: undefined}}
                                        placeholder="Filtrar por Categoria"
                                        placeholderStyle={{color: '#bfc6ea'}}
                                        iosHeader={'Seleccione Uno'}
                                        placeholderIconColor="#007aff"
                                        selectedValue={selectCategoria}
                                        headerBackButtonText="Volver"
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelectCategoria(itemValue)
                                        }>
                                        <Picker.Item label="Seleccione Uno" value=""/>
                                        {_renderCategorias}
                                    </Picker>
                                </Item>

                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        style={{width: undefined}}
                                        iosHeader={'Seleccione Una'}
                                        placeholder="Filtrar por Etiquetas"
                                        placeholderStyle={{color: '#bfc6ea'}}
                                        placeholderIconColor="#007aff"
                                        headerBackButtonText="Volver"
                                        selectedValue={selectEtiqueta}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelectEtiqueta(itemValue)
                                        }>
                                        <Picker.Item label="Seleccione Uno" value="-1"/>

                                        {_renderEtiquetas}
                                    </Picker>
                                </Item>
                                <View style={styles.containerButton}>
                                    <View style={styles.buttonContainer}>
                                        <Button small info onPress={() => handleFilter()}>
                                            <Text style={styles.textButton}>Aplicar Filtros</Text>
                                        </Button>
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <Button small info onPress={() => handleFilterCleans()}>
                                            <Text style={styles.textButton}>Eliminar Filtros</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        </Modal>

                    </Portal>
                </Provider>

            </SafeAreaView>
        </Container>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 5,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
    },

    imageView: {
        width: '50%',
        height: 100,
        margin: 7,
        borderRadius: 7,
    },

    textView: {
        width: '50%',
        textAlignVertical: 'center',
        padding: 10,
        color: '#000',
    },
    mainBackgroundColor: {
        backgroundColor: '#007bff',
        padding: 8,
    },
    mainBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    textHeader: {
        backgroundColor: '#fff',
        marginTop: 16,
        fontSize: 32,
        padding: 8,
        borderRadius: 8,
        color: '#007bff',
    },
    firstText: {
        fontSize: 16,
        marginTop: 16,
        marginBottom: 0,
        color: '#fff',
    },
    phone: {
        marginTop: 16,
        color: '#fff',
    },
    secondText: {
        fontSize: 16,
        marginTop: 0,
        color: '#fff',
    },
    thirdText: {
        fontSize: 16,
        marginTop: 8,
        color: '#ffffff',
        textTransform: 'uppercase',
        textAlign: 'center',
        padding: 8,
        marginBottom: 12,
    },
    firstButton: {
        marginBottom: 16,
    },

    newsListContainer: {
        width: '100%',
        maxHeight: '100%',
        minHeight: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        //alignItems: 'center',
        justifyContent: 'space-between',
    },
    newsImage: {
        flexBasis: '55%',
        height: 100,
        maxHeight: 100,
        maxWidth: '100%',
        minHeight: '100%',
        minWidth: '100%',
        marginRight: 8
    },

    newsInfo: {
        flexBasis: '75%',
        padding: 5,
        alignSelf: 'flex-start',
    },

    newsLink: {
        flexBasis: '20%',
    },

    newsTitle: {
        fontSize: 14,
        //marginLeft: 4,
        textTransform: 'uppercase',
        fontWeight: '500',
        overflow: 'hidden',
        marginTop: 5,
        marginLeft: 4

    },
    newsCategoria: {
        fontSize: 14,
        //marginLeft: 4,
        fontWeight: '600',
        marginRight: 8,
        marginTop: 4,
        marginLeft: 4,
        marginBottom: 4

    },

    newsDescription: {
        fontSize: 14,
        overflow: 'hidden',
        textAlign: 'justify',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 8
    },

    newsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 4,
    },
    categoriaText: {
        marginLeft: 8,
        marginTop: 8,
    },

    newsClose: {
        fontSize: 20,
        color: 'red',
    },
    containerButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'space-between',
        marginRight: 15,
        marginLeft: 15,
    },
    textButton: {
        flex: 1,
        textAlign: 'center',
        color: 'white',
    },
    buttonContainer2: {
        flex: 1,
    },
    overlay: {
        height: "30%",
        width: '100%',
        backgroundColor: "#fff",
        borderColor: '#539bef',
        borderWidth: 2,
        borderRadius: 10,
    },
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    text22: {
        color: "#539bef",
        textTransform: "uppercase",
        marginTop: 10
    }
});

export default ListaNoticiasScreen;
