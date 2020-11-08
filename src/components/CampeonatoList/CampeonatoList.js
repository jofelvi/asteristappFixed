import React from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import {Container} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import NavBar from '../../components/navbar/Navbar';

const {width} = Dimensions.get('screen');

const ListViewItem = ({data}) => {
    const navigation = useNavigation();
    //const {titulo, nomcategoria, nomclub, descripcion, finalizado, fecha} = data;
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

    const sendDataInfo = () => {
        navigation.navigate('DetalleCampeonato', {data});
    };

    return (
        <TouchableOpacity onPress={sendDataInfo} style={[styles.listView]}>
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
            <View>
                <Text style={{fontSize: 14, fontWeight: 'bold'}}>

                    <Text style={{fontSize: 14,fontWeight:"normal",paddingLeft:10, color: "red"}}>
                        {finalizado.toString() === "No" ? "Campeonato en curso": "Campeonato finalizado"}

                    </Text>
                </Text>

            </View>



        </TouchableOpacity>
    );
};

const CampeonatoList = (props) => {

    const {campeonatos} = props
    console.log(campeonatos)
    return (
            <FlatList
                data={campeonatos}
                renderItem={({item}) => <ListViewItem data={item} />}
                horizontal={false}
                keyExtractor={(item, i) => i}
            />
    );
};

const styles = StyleSheet.create({
    listView: {
        width,
        marginVertical: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderTopColor: "black",
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
});
export default CampeonatoList;
