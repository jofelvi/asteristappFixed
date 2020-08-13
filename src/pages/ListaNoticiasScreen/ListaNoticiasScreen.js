//This is an example code for FlatList//
import React, {useState, useEffect} from 'react';
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
import { useScrollToTop } from '@react-navigation/native';

function ListaNoticiasScreen(props) {
  //State
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
  const URLBASE = "https://fapd.org";
  const [resJson, setresJson] = useState([]);
  const scroll = React.createRef();
  const ref = React.useRef(null);
  useScrollToTop(ref);

  let contador = 0
  //useEffect
  useEffect(() => {
    //console.log(noticias)
    dispatch(traerNoticias(page));
    dispatch(traerCategorias());
    dispatch(traerEtiquetas());
    hanndleApiPublicidad()
  }, [page]);

  const hanndleApiPublicidad = () => {
    console.log('entro useEffect');
    axios
      .get(`https://fapd.org/json-publicidad`)
      .then((res) => {
        setresJson(res.data);
      })
      .catch((err) => {
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
      })
      .catch((err) => {
        console.log('error in request', err);
        //Alert.alert("error in request", err)
      });
  };


  const FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}} />
    );
  };
  const handleFilter = () => {
    if (
      selectCategoria != null &&
      selectCategoria != '' &&
      selectEtiqueta != null &&
      selectEtiqueta != '' &&
      selectEtiqueta != 'Seleccione Uno'
    ) {
      console.log('dos valores');
    }
  };
  const getItem = (item) => {
    //RootNavigation.navigate('DetailNoticiaSlider', {item: item });

    navigation.navigate('DetailNoticiaSlider', {
      item: item,
    });
  };

  const handlepaPageNext = () => {
    console.log(page + "pagina")
    
    if (page >= 0) {
      setPage(page + 1);
      console.log(page + "pagina")
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
    return <Picker.Item label={data.categoria} value={index} />;
  });

  const _renderEtiquetas = etiquetas.map((data, index) => {
    return <Picker.Item label={data.etiqueta} value={index} />;
  });

  
  const getNoticiasFilter = () => {};
  const regex = /(<([^>]+)>)/gi;
  const URL = 'https://fapd.org/';



  return (
    <Container   >
      <SafeAreaView style={{flex: 1}}   >
        <ScrollView 
       ref={ref}
        //ref={(c) => {scroll = c}}
        style={styles.scrollView}>
          <NavBar />
          <Slide />
          <View style={styles.MainContainer}>
            {/* <Carrusel /> */}
            <FlatList
              data={noticias.noticias}
              //extraData={resJson}
              renderItem={({item, index}) => {               
                if ( index === 2 || index === 5  || index === 8  ){
                return (

                    <View>
                    {resJson.map(
                      (item, index) => (
                        (result = regex2.exec(item.imagen)),
                        (src = regex2.exec(result)[1]),
                        (
                          <TouchableOpacity onPress={() => getItem2(item)}>
                            <Card>
                              <CardItem>
                                <Left>
                                  <Thumbnail source={{uri: URLBASE + src}} />
                                  <CardItem header>
                                    <Text>{item.titulo} </Text>
                                  </CardItem>
                                  <CardItem>
                                    <Body>
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
                <Card>
                    <TouchableOpacity //
                        onPress={() => getItem(item.id)}>
                        <View style={styles.newsListContainer}>
                            <Image
                                style={styles.newsImage}
                                source={{ uri: URL + item.imagen }}
                            />
                            <View style={styles.newsInfo}>
                                <Text
                                    numberOfLines={3}
                                    style={styles.newsTitle}
                                    ellipsizeMode="tail">
                                    {item.titulo}
                                </Text>
                                <Text
                                    numberOfLines={4}
                                    style={styles.newsDescription}
                                    ellipsizeMode="tail">
                                    {item.contenido.replace(regex, '')}
                                </Text>
                                <Text style={styles.categoriaText}>
                                    {item.categorias}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Card>
             )
               
            
              }}
              keyExtractor={(item, index) => index.toString()}
            />

            <View style={styles.containerButton}>
              <View style={styles.buttonContainer}>
                <Button
                  disabled={page > 0 ? false : true}
                  small
                  info
                  onPress={() => handlepaPagePrev()}>
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
              <Picker.Item label="Seleccione Uno" value="" />
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
              <Picker.Item label="Seleccione Uno" value="0" />

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
              <Button small info onPress={() => handleFilter()}>
                <Text style={styles.textButton}>Eliminar Filtros</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
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
    maxHeight: '70%',
    minHeight: '70%',
    height: '85%',
    marginBottom: 4,
    padding: 4,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  newsImage: {
    flex: 1,
    marginTop: 15,
    flexBasis: '35%',
    height: '100%',
    maxHeight: '60%',
    maxWidth: '100%',
    minHeight: '100%',
    minWidth: '30%',
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
    fontSize: 16,
    color: '#000000',
    marginLeft: 8,
    textTransform: 'uppercase',
    fontWeight: '500',
    overflow: 'hidden',
    marginRight: 5,
  },

  newsDescription: {
    fontSize: 14,
    marginRight: 5,
    marginLeft: 8,
    marginTop: 5,
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
});

export default ListaNoticiasScreen;