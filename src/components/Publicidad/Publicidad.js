import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Alert, Button, TouchableWithoutFeedback, Dimensions, Image, ScrollView, Keyboard, TouchableHighlight, TouchableOpacity } from 'react-native';
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Thumbnail } from 'native-base';
import { useNavigation } from '@react-navigation/native';

function Publicidad() {
    // Declara una nueva variable de estado, la cual llamaremos “count”
    const [count, setCount] = useState(0);
    const [resJson, setresJson] = useState([]);
    const regex = /['"](.*?)['"]/;
    const URL = "https://fapd.org";
    const navigation = useNavigation();

    useEffect(() => {
        console.log('entro useEffect')
        axios.get(`https://fapd.org/json-publicidad`)
            .then(res => {
                setresJson(res.data)
            }).catch(err => {
                console.log("error in request", err);
            });
    }, []);

    const getItem = (item) => {
        //Function for click on an item
        navigation.navigate('DetailPublicidad', {
            item: item
        });
        //Alert.alert(item);
    }
    return (
        <View>
            {
                resJson.map((item, index) => (
                    result = regex.exec(item.imagen),
                    src = regex.exec(result)[1],

                    <TouchableOpacity onPress={() => getItem(item)}>
                        <Card>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={{ uri: URL + src }} />
                                    {console.log(item.id)}
                                    <CardItem header>
                                        <Text>{item.titulo} </Text>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <Text>
                                                {item.contenido}
                                            </Text>
                                        </Body>
                                    </CardItem>
                                </Left>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>

                ))

            }
        </View>
    );
}
export default Publicidad;