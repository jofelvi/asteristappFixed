import React, {Fragment, useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Container, List, ListItem} from 'native-base';

import NavBar from '../../components/navbar/Navbar';
import {useSelector} from "react-redux";
import axios from "axios";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import FormInput from '../../components/ValidateForm/FormInput';

const {width} = Dimensions.get('screen');

const DetalleCampeonato = ({route}) => {
    const {data} = route.params;
    const usuario = useSelector((state) => state.auth.usuario);
    const {current_user, access_token} =usuario
    const [apiResp, setapiResp] = useState([]);
    const {
        categoria,
        club,
        finalizado,
        id,
        modalidad,
        nomcategoria,
        nomclub,
        nommodalidad,
        titulo,
        ambito
    } = data

    useEffect(() => {
        const {data} = route.params;
        console.log(data.id, "------------ id")
        handleApi(data.id)

    }, [data]);

    const handleApi = (id) => {

        const URLCategoria = `https://licencias.fapd.org/json-ctos-deportistas/${id}?_format=json`
        let headers = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + access_token,
            },
        };
        let respuesta = axios.get(URLCategoria, {headers}).then((respuesta) => {
            console.log('exito entro funcion  respuesta API setapiResp', respuesta.data);
            setapiResp(respuesta.data);
        });

    };

    const handleChange=()=>{
        console.log("handleChange")
    }

    const _renderList = apiResp.map((item, index) => {
        if (apiResp.length >= 1) {
            return (
                <Card style={{marginTop: 20}}>
                    <View>
                        <TouchableOpacity onPress={() => getItem(item)}>
                            <View style={{marginTop: 5, marginLeft: 10}}>
                                <List>
                                    <ListItem>
                                        <Text style={styles.TextItem}>Deportista:</Text>
                                        <Text> {item.deportista}</Text>
                                    </ListItem>
                                </List>

                                <List>
                                    <ListItem>
                                        <Text style={styles.TextItem} note>
                                            Id:
                                        </Text>
                                        <Text> {item.id}</Text>
                                    </ListItem>
                                </List>

                                <List>
                                    <ListItem>
                                        <Text style={styles.TextItem} note>
                                            Nif:
                                        </Text>
                                        <Text>{item.nif}</Text>
                                    </ListItem>
                                </List>

                                <List>
                                    <ListItem>
                                        <Text style={styles.TextItem} note>
                                            Nombre:
                                        </Text>
                                        <Text> {item.nombre}</Text>
                                    </ListItem>
                                </List>

                                <List>
                                    <ListItem>
                                        <Text style={styles.TextItem} note>
                                            Puntuacion:
                                        </Text>
                                    </ListItem>
                                    <FormInput
                                        //name="mensaje"
                                        //multiline={true}
                                        value={item.puntuacion}
                                        onChangeText={handleChange('mensaje')}
                                        placeholder="Introducir Puntacion"
                                        //onBlur={handleBlur('mensaje')}
                                    />

                                </List>


                            </View>
                        </TouchableOpacity>

                        <List style={{alignSelf: 'flex-end'}}>
                            <ListItem>
                                <TouchableOpacity onPress={() =>
                                    //alertGetLicencias(item)
                                    console.log("aqui")
                                }>
                                    <Icon
                                        name="edit"
                                        style={{fontSize: 40, color: '#0053C9'}}
                                    />
                                </TouchableOpacity>
                            </ListItem>
                        </List>
                    </View>
                </Card>
            );
        }
    });

    return (
        <Container>
            <NavBar />

            <View style={[styles.listView]}>
                <View>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                        Titulo:
                        <Text style={{fontSize: 14,fontWeight:"normal",paddingLeft:10}}>
                            {titulo}
                        </Text>
                    </Text>

                </View>
                <View>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                        Modalidad:
                        <Text style={{fontSize: 14,fontWeight:"normal",paddingLeft:10}}>
                            {nommodalidad}
                        </Text>
                    </Text>

                </View>
                <View>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                        Categoria:
                        <Text style={{fontSize: 14,fontWeight:"normal",paddingLeft:10}}>
                            {nomcategoria}
                        </Text>
                    </Text>

                </View>

                <View>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                        Club:
                        <Text style={{fontSize: 14,fontWeight:"normal",paddingLeft:10}}>
                            {nomclub}
                        </Text>
                    </Text>

                </View>
                <View>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                        Ambito:
                        <Text style={{fontSize: 14,fontWeight:"normal",paddingLeft:10}}>
                            {ambito}
                        </Text>
                    </Text>

                </View>

                <View>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                        Finalizado:
                        <Text style={{fontSize: 14,fontWeight:"normal",paddingLeft:10}}>
                            {finalizado}
                        </Text>
                    </Text>

                </View>
                {_renderList}
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    listView: {
        width,
        marginVertical: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
});
export default DetalleCampeonato;
