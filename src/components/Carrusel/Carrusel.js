import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';
import axios from 'axios'


const { width: screenWidth } = Dimensions.get('window');

const regex = /['"](.*?)['"]/;
const URL = "https://fapd.org/";
const Carrusel = props => {
    const [entries, setEntries] = useState([]);
    const carouselRef = useRef(null);

    const goForward = () => {
        carouselRef.current.snapToNext();
    };

    useEffect(() => {
        axios.get(`https://fapd.org/json-sliders`)
            .then(res => {
                console.log("###################### AQUI RESPUESTA API #######################");
                //datasplit = res.data.splice(0, 10);
                console.log(res.data);
                setEntries(res.data);

            }).catch(err => {
                console.log("error in request", err);
                //Alert.alert("error in request", err)
            });
    }, []);



    const renderItem = ({ item, index }, parallaxProps) => {
        result = regex.exec(item.imagen)
        src = regex.exec(result)[1]
        return (
            <View style={styles.item}>

                <ParallaxImage
                    source={{ uri: URL + src }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.1}
                    {...parallaxProps}
                    showSpinner={true}
                />

                <View style={styles.title}>
                    <Text numberOfLines={2}>
                        {item.titulo}
                    </Text>
                </View>

            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity onPress={goForward}>
                <Text>go to next slide</Text>
            </TouchableOpacity> */}
            <Carousel
                ref={carouselRef}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={entries}
                renderItem={renderItem}
                hasParallaxImages={true}
            />
        </View>
    );
};

export default Carrusel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 120,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
        height: 20
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        height: 20
    },
    title: {

        justifyContent: 'center',
        alignItems: 'center',
    }
});

