//This is an example code for FlatList// 
import React from 'react';
//import react in our code. 
import { StyleSheet, FlatList, Text, View, Alert, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { NEWSIMG } from '../../assets/image';
import Carrusel from '../../components/Carrusel/Carrusel';
//import all the components we are going to use. 
import axios from 'axios'
import Publicidad from '../../components/Publicidad/Publicidad';
import Slide from '../../components/Slide/Slide';
import { Container, Header, Content, Card, CardItem, Body, Button } from 'native-base';

export default class ListaNoticiasScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FlatListItems: [],
            publicidadList: [],
            page: 0
        };
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.handlepaPageNext = this.handlepaPageNext.bind(this);


    }

    componentDidMount() {

        this.handleApiNoticias();
        this.handleApiPublicidad();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
        }
    }

    handleApiNoticias() {

        const { page } = this.state;
        axios.get(`https://fapd.org/json-noticias?page=` + page)
            .then(res => {
                console.log("###################### AQUI RESPUESTA API #######################");
                //datasplit = res.data.splice(0, 10);
                console.log(res.data);

                this.setState({ FlatListItems: res.data })
            }).catch(err => {
                console.log("error in request", err);
                //Alert.alert("error in request", err)
            });
    }

    handleApiPublicidad() {
        axios.get(`https://fapd.org/json-publicidad`)
            .then(res => {
                console.log("###################### AQUI RESPUESTA API #######################");
                //datasplit = res.data.splice(0, 10);
                console.log(res.data);
                this.setState({ publicidadList: res.data })
            }).catch(err => {
                console.log("error in request", err);
                //Alert.alert("error in request", err)
            });
    }

    FlatListItemSeparator = () => {
        return (
            //Item Separator
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} />
        );
    };

    GetItem(item) {
        //Function for click on an item
        this.props.navigation.navigate('DetailNew', {
            item: item
        });
        //Alert.alert(item);
    }

    handlepaPageNext() {

        this.setState({ page: this.state.page += 1 })
    }

    handlepaPagePrev() {

        this.setState({ page: this.state.page - 1 })




    }

    forceUpdateHandler() {
        this.forceUpdate();
    };

    render() {

        const regex = /(<([^>]+)>)/ig;
        const URL = "https://fapd.org/";

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    {/* <Slide


                    /> */}
                    <View style={styles.MainContainer}>
                        {/* <Carrusel /> */}
                        <FlatList
                            data={this.state.FlatListItems}
                            //data defined in constructor
                            //ItemSeparatorComponent={this.FlatListItemSeparator}
                            //Item Separator View
                            renderItem={({ item }) => (

                                // Single Comes here which will be repeatative for the FlatListItems
                                <Card>
                                    <TouchableOpacity onPress={this.GetItem.bind(this, item.id)}>
                                        <View style={styles.newsListContainer}>
                                            <Image
                                                style={styles.newsImage}
                                                source={{
                                                    uri:
                                                        item.imagen != null
                                                            ? URL + item.imagen
                                                            : NEWSIMG
                                                }}
                                            />
                                            <View style={styles.newsInfo}>
                                                <Text
                                                    numberOfLines={2}
                                                    style={styles.newsTitle}
                                                    onPress={this.GetItem.bind(this, item.id)}
                                                >
                                                    {item.titulo}
                                                </Text>
                                                <Text numberOfLines={3} style={styles.newsDescription}>
                                                    {result = item.contenido.replace(regex, '')}
                                                </Text>
                                                <Text style={styles.categoriaText}>{item.categorias}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Card>


                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <Button onPress={() => this.handleApiNoticias()}>
                            <Text>Siguiente pagina</Text>
                            <Text>{this.state.page}</Text>
                        </Button>
                        <Button onPress={() => this.handlepaPagePrev()}>
                            <Text>Anterior pagina</Text>
                        </Button >
                        <Publicidad />

                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
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
        marginTop: (Platform.OS === 'ios') ? 20 : 0,

    },

    imageView: {

        width: '50%',
        height: 100,
        margin: 7,
        borderRadius: 7

    },

    textView: {

        width: '50%',
        textAlignVertical: 'center',
        padding: 10,
        color: '#000',

    },
    mainBackgroundColor: {
        backgroundColor: "#007bff",
        padding: 8
    },
    mainBackground: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    textHeader: {
        backgroundColor: "#fff",
        marginTop: 16,
        fontSize: 32,
        padding: 8,
        borderRadius: 8,
        color: "#007bff"
    },
    firstText: {
        fontSize: 16,
        marginTop: 16,
        marginBottom: 0,
        color: "#fff"
    },
    phone: {
        marginTop: 16,
        color: "#fff"
    },
    secondText: {
        fontSize: 16,
        marginTop: 0,
        color: "#fff"
    },
    thirdText: {
        fontSize: 16,
        marginTop: 8,
        color: "#ffffff",
        textTransform: "uppercase",
        textAlign: "center",
        padding: 8,
        marginBottom: 12
    },
    firstButton: {
        marginBottom: 16
    },

    newsListContainer: {
        width: "100%",
        marginBottom: 4,
        padding: 4,
        flex: 1,
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

    newsLink: {
        flexBasis: "20%"
    },

    newsTitle: {
        fontSize: 16,
        color: "#000000",
        marginLeft: 8,

    },

    newsDescription: {
        fontSize: 14,

        marginLeft: 8,
        marginTop: 5
    },

    newsHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 4
    },
    categoriaText: {
        marginLeft: 8,
        marginTop: 8,
    },

    newsClose: {
        fontSize: 20,
        color: "red"
    }
});


