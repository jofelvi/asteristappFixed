import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Alert, Button, TouchableWithoutFeedback, Dimensions, Image, ScrollView, Keyboard } from 'react-native';
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';

const { width } = Dimensions.get('window');
const height = width * 0.4;
class Slide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            imagen: []
        }
    }
    componentDidMount() {

        axios.get(`https://fapd.org/json-sliders`)
            .then(res => {
                console.log("###################### AQUI RESPUESTA API #######################");
                //datasplit = res.data.splice(0, 10);
                console.log(res.data);
                this.setState({ imagen: res.data })
            }).catch(err => {
                console.log("error in request", err);
                //Alert.alert("error in request", err)
            });
    }

    onChange = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
        if (slide !== this.state.active) {
            this.setState({ active: slide })
        }
    }

    render() {
        const regex = /['"](.*?)['"]/;
        const URL = "https://fapd.org/";

        return (
            <View style={style.container}>
                <ScrollView
                    pagingEnabled
                    horizontal
                    onScroll={this.onChange.bind(this)}
                    showsHorizontalScrollIndicator={false}
                    style={style.scroll}
                >
                    {
                        this.state.imagen.map((item, index) => (
                            result = regex.exec(item.imagen),
                            src = regex.exec(result)[1],
                            <Image
                                key={index}
                                source={{ uri: URL + src }}
                                style={style.imagen}
                            />

                        ))
                    }
                </ScrollView>
                <View style={style.pagination}>
                    {
                        this.state.imagen.map((i, k) => (
                            <Text key={k} style={k == this.state.active ? style.activeText : style.paginationText}>
                                ⬤
                            </Text>
                        ))
                    }
                </View>

            </View>

        );
    }
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


const imagen = [
    'https://i.pinimg.com/564x/11/43/85/114385c23f3912bd3b1e79db3884a635.jpg',
    'https://i.pinimg.com/564x/30/ea/38/30ea38d35fae556460086f2e67adc4e8.jpg',
    'https://i.pinimg.com/564x/11/43/85/114385c23f3912bd3b1e79db3884a635.jpg',
    'https://i.pinimg.com/564x/30/ea/38/30ea38d35fae556460086f2e67adc4e8.jpg',
    'https://i.pinimg.com/564x/11/43/85/114385c23f3912bd3b1e79db3884a635.jpg',
    'https://i.pinimg.com/564x/30/ea/38/30ea38d35fae556460086f2e67adc4e8.jpg',
    'https://i.pinimg.com/564x/11/43/85/114385c23f3912bd3b1e79db3884a635.jpg',
    'https://i.pinimg.com/564x/30/ea/38/30ea38d35fae556460086f2e67adc4e8.jpg',
    'https://i.pinimg.com/564x/11/43/85/114385c23f3912bd3b1e79db3884a635.jpg',
    'https://i.pinimg.com/564x/30/ea/38/30ea38d35fae556460086f2e67adc4e8.jpg',
    'https://i.pinimg.com/564x/11/43/85/114385c23f3912bd3b1e79db3884a635.jpg',
    'https://i.pinimg.com/564x/30/ea/38/30ea38d35fae556460086f2e67adc4e8.jpg',
]