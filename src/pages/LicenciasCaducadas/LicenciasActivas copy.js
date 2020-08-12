import React, { Fragment, useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, View, Image, Dimensions, Alert, Text, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';


const URL = 'https://licencias.fapd.org/json-licencias-vigentes?_format=json';

const { width: screenWidth } = Dimensions.get('window');

function LicenciasActivas({ route }, props) {
    const [responseApi, setResponseApi] = useState([]);
    const navigation = useNavigation();
    const auth = useSelector((state) => state.auth);
    const [token, settoken] = useState("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1OTQ4NDI3ODksImV4cCI6MTU5NDg0NjM4OSwiZHJ1cGFsIjp7InVpZCI6IjU4ODAyIn19.1-KvhQLElNEEmi2pa_f9XUIqGpe1yIdKJSO2XoYB31P0gLKa6M1Py6UrRu46FvrQ_dF67T5rWSCvrYRrWZmLGg");
    const dispatch = useDispatch();
    const [categoria, setCategoria] = useState();
    const [club, setClub] = useState();
    const [isPrimera, setIsPrimera] = useState();
    const [fechaEmit, setfechaEmit] = useState();
    const [importe, setImporte] = useState();
    const [modalidad, setModalidad] = useState();
    const [nid, setNid] = useState();
    const [year, setYear] = useState();
    const [licenciaN, setLicenciaN] = useState();


    useEffect(() => {
        headers = {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + auth.info.token
            }
        }
        axios.get(URL, { headers })
            .then(res => {
                console.log("funcion licencias")
                setResponseApi(res.data)
                desgloseFuntion()
            }).catch((err) => {
                Alert.alert('Error en el servidor volver a intentar');
                console.log(err);
            })

    }, [auth]);

    const desgloseFuntion = () => {
        const jsObjects = responseApi;
        jsObjects.filter(obj => {
            setCategoria(obj.categoria)
            setClub(obj.club)
            setIsPrimera(obj.es_primera)
            setfechaEmit(obj.fecha_emision)
            setImporte(obj.importe)
            setModalidad(obj.modalidad)
            setNid(obj.nid)
            setLicenciaN(obj.numero_licencia)
            setYear(obj.year)
        })
    }
    return (
        <View style={styles.textTitle}>

            <Card>
                <CardItem style={{ marginTop: 60 }} >
                    <Text style={styles.textTitleFont}>Categoria: {categoria}</Text>
                </CardItem>
                <CardItem >
                    <Text style={styles.textBodyFont}>Club: {club}</Text>
                </CardItem>
                <Text></Text>

            </Card>
            <Button title="Ir atras" onPress={() => navigation.goBack()} />

        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    buttonContainer: {
        margin: 5
    },
    logo: {
        width: screenWidth - 60,
        height: screenWidth - 300,
    },
    containerLogo: {
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },
    newsImage: {
        flexBasis: "25%",
        height: "100%"
    },
    imagenContainer: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 25,
        paddingBottom: 20

    },
    textTitle: {
        marginTop: 10,
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
        textAlign: 'justify'
    },
    textCategoria: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14
    },

})

export default LicenciasActivas;


