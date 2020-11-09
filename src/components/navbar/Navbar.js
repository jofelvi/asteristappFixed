import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Platform } from 'react-native';
import { LOGONORMAL } from '../../assets/image';
import { useNavigation } from '@react-navigation/native';
import { Header, Left, Body, Right, Button } from 'native-base';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {useRoute} from '@react-navigation/native';

const myIcon2 = <Icon2 name="reorder-four-outline" size={40} color="#0053C9" />;
const myIcon3 = <Icon2 name="chevron-back-outline" size={40} color="#0053C9" />;

function NavBar( props ) {
    //const { navigation } = useNavigation();
    const navigation = useNavigation();

    const _renderIconback = () =>{
        return <TouchableOpacity
         onPress={() => navigation.goBack()}
        >
       {myIcon3}
    </TouchableOpacity>
    }
    const route = useRoute();
    return (
        <Header style={styles.backColorNavbar}>
            <Left style={{ flex: 1 }}>
                <Button
                    onPress={() =>navigation.openDrawer()}
                    transparent
                    style={Platform.OS === 'androird' ??{marginLeft:0 }}
                >
                    {myIcon2}
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
                {route.name.toString() === "Home"? null: _renderIconback()}
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
