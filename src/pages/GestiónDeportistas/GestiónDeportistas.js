import React, {Fragment, useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Dimensions,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import {Container, Card, ListItem, List, Right} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {traerUsuario, traerDeportistas} from '../../store/auth/actions';
import Loading from '../../components/Loading/Loading';
import NavBar from '../../components/navbar/Navbar';
import {Button, Menu, Divider, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function GestiónDeportistas() {
  const auth = useSelector((state) => state.auth);
  const listaDeportistas = useSelector((state) => auth.listDeportistas);
  const access_token = useSelector((state) => auth.usuario.access_token);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const cargando = useSelector((state) => state.auth.cargando);

  useEffect(() => {

    dispatch(traerDeportistas(access_token));

  }, []);

  const getItem = (item) => {

    navigation.navigate('FormPerfilByClubScreen', {
        item: item.uid,
        nombre: item.nombre_completo
    });
  }

const getItem2 = (item) => {

  navigation.navigate('LicenciasActivas', {
      item: item.uid,
      nombre: item.nombre_completo
  });
  
}
  const alertDelete = (item) => {  

    Alert.alert(
      'Advertencia',
      'El Usuario ' +
        item.nombre_completo +
        ' uid ' +
        item.uid +
        ' sera eliminado permanentemente',
      [
        {text: 'Aceptar', onPress: () => getItem(item)},
        {text: 'Cancelar', onPress: () => 'resetValues'}
      ],
      {cancelable: false},
    );

  };

  const alertGetLicencias = (item) => {
    Alert.alert(
      'Informacion',
      'Desea obtener las licencias asociadas al Usuario ' +
        item.nombre_completo +
        ' uid ' +
        item.uid,
        
      [
        {text: 'Aceptar', onPress: () => getItem2(item)},
        {text: 'Cancelar', onPress: () => 'resetValues'},
      ],

      {cancelable: false},
    );
  };
  
  
  const _renderList = listaDeportistas.map((item, index) => {
    if (listaDeportistas.length >= 1) {
      return (
        <Card style={{marginTop: 5}}>
          <View>
            <TouchableOpacity onPress={() => getItem(item)}>
              <View style={{marginTop: 5, marginLeft: 10}}>
                <List>
                  <ListItem>
                    <Text style={styles.TextItem}>UID:</Text>
                    <Text> {item.uid}</Text>
                  </ListItem>
                </List>

                <List>
                  <ListItem>
                    <Text style={styles.TextItem} note>
                      Nif:
                    </Text>
                    <Text> {item.nif}</Text>
                  </ListItem>
                </List>

                <List>
                  <ListItem>
                    <Text style={styles.TextItem} note>
                      Nombre Completo:
                    </Text>
                    <Text>{item.nombre_completo}</Text>
                  </ListItem>
                </List>

                <List>
                  <ListItem>
                    <Text style={styles.TextItem} note>
                      Poblacion:
                    </Text>
                    <Text> {item.poblacion}</Text>
                  </ListItem>
                </List>

                <List>
                  <ListItem>
                    <Text style={styles.TextItem} note>
                      Provincia:
                    </Text>
                    <Text> {item.provincia}</Text>
                  </ListItem>
                </List>

                <List>
                  <ListItem>
                    <Text style={styles.TextItem} note>
                      Telefono Principal:
                    </Text>
                    <Text> {item.telefono1}</Text>
                  </ListItem>
                </List>
                <List>
                  <ListItem>
                    <Text style={styles.TextItem} note>
                      Telefono Alternativo:
                    </Text>
                    <Text> {item.telefono2}</Text>
                  </ListItem>
                </List>
              </View>
            </TouchableOpacity>

            <List style={{alignSelf: 'flex-end'}}>
              <ListItem>
                <TouchableOpacity onPress={() => alertDelete(item)}>
                  <Icon name="edit" style={{fontSize: 40, color: '#0053C9'}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alertGetLicencias(item)}>
                  <Icon2
                    name="delete"
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


  if (cargando === true) {
    return <Loading isVisible={cargando} text={'CARGANDO...'} />;
  }
  return (
    <Container>
      <SafeAreaView style={styles.container}>
        <NavBar></NavBar>
        <ScrollView keyboardShouldPersistTaps="always">
          <Text style={styles.TxtoTituloNew}> Gestion Deportistas: </Text>
          <View style={{marginLeft:5, marginRight:5}}>

          {_renderList}
          </View>

          
        </ScrollView>
        <Button
          style={styles.botonAbajo}
          title="Volver"
          onPress={() => navigation.goBack()}
        />
      </SafeAreaView>
    </Container>
  );
}

export default GestiónDeportistas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    margin: 5,
  },
  logo: {
    marginLeft: 10,
    marginTop: 30,
    marginBottom: 100,
    width: screenWidth - 60,
    height: screenWidth - 300,
  },
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  TxtoTituloNew: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
  TextItem: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
});
