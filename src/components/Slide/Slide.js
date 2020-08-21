import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, FlatList, View, Alert, Button, TouchableWithoutFeedback, Dimensions, Image, ScrollView, Keyboard, TouchableHighlight, TouchableOpacity } from 'react-native';
import axios from 'axios'
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { navigationRef } from '../../../RootNavigation';

const { width } = Dimensions.get('window');
const height = width * 0.4;

function Slide({ route }) {

    const [active, setactive] = useState(0);
    const [responseApi, setResponseApi] = useState([]);
    const navigation = useNavigation();


    useEffect(() => {
        axios.get(`https://fapd.org/json-sliders`)
            .then(res => {
                //datasplit = res.data.splice(0, 10);
                setResponseApi(res.data)
            }).catch(err => {
                console.log("error in request", err);
                //Alert.alert("error in request", err)
            });
    }, []);

    const onChange = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
        if (slide !== active) {
            setactive(slide)
        }
    }

    const getItem = (item) => {
        //Function for click on an item
        console.log("idParam" + item)
        navigation.navigate('DetailNoticiaSlider', {
            item: item
        });
        //Alert.alert(item);
    }

    const goDetailsNews = (item) => {
        navigation.navigate('DetailNoticiaSlider', {
            item: item
        });
    }
    const regex = /['"](.*?)['"]/;
    const URL = "https://fapd.org/";


    const renderDetalle = responseApi.map((item, index) => {
        let result = regex.exec(item.imagen)
        let src = regex.exec(result)[1]
        return (
            <View key={index}>
                <Text style={{ textAlign: 'center', textTransform: "uppercase", fontWeight: '500' }}>{item.titulo}</Text>
                <TouchableOpacity onPress={() => getItem(item.noticia)}>
                    <Card>
                        <Image
                            key={item.id}
                            source={{ uri: URL + src }}
                            style={style.imagen}
                        />
                        <CardItem>
                            <Text style={{ marginTop: 30 }}></Text>
                        </CardItem>
                    </Card>

                </TouchableOpacity>


            </View>
        )
    })

    return (

        <View style={style.container}>
            <ScrollView
                pagingEnabled
                horizontal
                onScroll={onChange}
                showsHorizontalScrollIndicator={false}
                style={style.scroll}
            >

                {renderDetalle}


            </ScrollView>
            <View style={style.pagination}>
                {
                    responseApi.map((i, k) => (
                        <Text key={k} style={k == active ? style.activeText : style.paginationText}>
                            ⬤
                        </Text>

                    ))
                }
            </View>

        </View >

    );

}





const style = StyleSheet.create({
    container: { width, height, marginTop: 10 },
    scroll: { width, height },
    imagen: { width, height, resizeMode: 'cover' },
    pagination: { flexDirection: 'row', position: 'absolute', bottom: 0, alignSelf: 'center' },
    paginationText: { color: '#99A3A4' },
    activeText: { color: 'white' },

})
export default Slide;
