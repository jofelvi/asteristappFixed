import React, { Component, useState,useEffect } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Image, View, Text, Platform } from 'react-native';
import { LOGONORMAL, ICONMENU2, ICONMENU3, ICONMENU4, MENUICON7, VOLVERICON, VOLVERICON2, VOLVERICON7 } from '../../assets/image';
import { useNavigation } from '@react-navigation/native';
import { Container, Header, Left, Body, Right, Button, Title, Content } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

const myIcon = <Icon name="rocket" size={30} color="#0053C9" />;
const myIcon2 = <Icon2 name="reorder-four-outline" size={40} color="#0053C9" />;
const myIcon3 = <Icon2 name="chevron-back-outline" size={40} color="#0053C9" />;

function NavBar( props ) {
    //const { navigation } = useNavigation();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [btnvolver, setbtnvolver] = useState();

   
    // if (props.flat === false || typeof props.flat == "undefined" && props.ruta === 'home') {
    //     console.log( "esta entrando en indefinido")
    //     setbtnvolver(false)
    // }else{
    //     setbtnvolver(true)
    // }
    const _renderIconback = () =>{
        return <TouchableOpacity
         onPress={() => navigation.goBack()}
        >
       {myIcon3}
    </TouchableOpacity>
    }

    console.log("vivible navbar",props.flat)
    return (
        <Header style={styles.backColorNavbar}>
            <Left style={{ flex: 1 }}>
                <Button
                    onPress={() =>navigation.openDrawer()}
                    transparent
                    style={Platform.OS === 'androird' ??{marginLeft:0 }}
                >
                    
                    {myIcon2}
                    {/* <Image
                        source={Platform.OS === 'ios' ? myIcon : myIcon}
                        style={{ width: 30, height: 40, color: "black" }}
                    >
                    </Image> */}

                </Button>
            </Left>
            <Body style={styles.LogoAndIos}>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}

                >
                    <Image
                        source={LOGONORMAL}
                        style={{ width: 35, height: 50, marginBottom: 10, }}
                    />
                </TouchableOpacity>
            </Body>
            <Right style={{ flex: 1 }}>
                <View style={{ marginTop: 2 }}>
                { _renderIconback()}
                </View>

            </Right>
           
        </Header >
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    menuIcon: {
        width: 35,
        height: 5,
        backgroundColor: 'blue',
        marginTop: 10,
        marginLeft: 0
    },
    imagenBoton: {
    },
    LogoAndIos: {
        flex: 1,
        ...Platform.select({
            ios: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            android: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20
            },
        }),
    },
    backColorNavbar: {
        ...Platform.select({
            android: {
                backgroundColor: "#FBF9F9"
            },
        }),
    }


})

export default NavBar;