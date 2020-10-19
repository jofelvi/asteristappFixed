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
import {traerLiquidaciones, traerPerfil} from '../../store/auth/actions';
import Loading from '../../components/Loading/Loading';
import CookieManager from '@react-native-community/cookies';
import NavBar from '../../components/navbar/Navbar';
import {Button, Menu, Divider, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function LiquidacionesScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const auth = useSelector((state) => state.auth);
  const {access_token, uid} = auth;
  const perfil = useSelector((state) => state.auth.perfil);
  const clubIdEncargado = useSelector((state) => state.auth.clubIdEncargado);
  const listLiquidaciones = useSelector((state) => auth.listLiquidaciones);
  const field_user_apellido1 = useSelector(
    (state) => state.auth.field_user_apellido1,
  );

  useEffect(() => {
    const URLperfil = `https://licencias.fapd.org/user/${uid}?_format=json`;
    console.log(JSON.stringify(data));
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token,
      },
    };
    const data = axios.get(URLperfil, {headers}).then((respuesta) => {
        console.log('exito entro funcion  respuesta API TRAER PERFIL');
        const {
          roles,
          field_user_gestionclub,
        } = respuesta.data;
        if (roles.filter((e) => e.target_id === 'club').length > 0) {
            console.log('id club');
            console.log(field_user_gestionclub[0].target_id);
            dispatch(traerLiquidaciones(access_token, field_user_gestionclub[0].target_id ,"2020"));

          }
      });
    dispatch(traerPerfil(uid, access_token));
  }, [field_user_apellido1]);


  const _renderList = listLiquidaciones.map((item, index) => {

      console.log(listLiquidaciones)
      let importeIngresado = item.importe_ingresado
      let  totalLiquidacion = parseFloat(item.importe_cuotas) + parseFloat(item.importe_licencias) - parseFloat(item.bonificacion)
      let totalNegativo = totalLiquidacion < importeIngresado ? false: true
      console.log(totalNegativo +" totalNegativo")

      return (
        <Card style={{marginTop: 5}}>
          <View>
            <TouchableOpacity onPress={() => getItem(item)}>
              <View style={{marginTop: 5, marginLeft: 10}}>
                <List>
                  <ListItem>
                    <Text style={styles.TextItem}>Numero ID: </Text>
                    <Text> {item.nid}</Text>
                  </ListItem>
                </List>

                <List>
                  <ListItem>
                    <Text style={styles.TextItem} note>
                    Fecha de Liquidacion: 
                    </Text>
                    <Text> {item.fecha_liquidacion}</Text>
                  </ListItem>
                </List>

                <List>
                  <ListItem>
                    <Text style={styles.TextItem} note>
                    Fecha Pago: 
                    </Text>
                    <Text> {item.fecha_pago}</Text>
                  </ListItem>
                </List>

                <List>
                  <ListItem>
                    <Text style={styles.TextItem} note>
                    Importe Cuotas: 
                    </Text>
                    <Text>€ {item.importe_cuotas}</Text>
                  </ListItem>
                </List>

                <List>
                  <ListItem>
                    <Text style={styles.TextItem} note>
                    Importe Licencias: 
                    </Text>
                    <Text>€ {item.importe_licencias}</Text>
                  </ListItem>
                </List>
                
                <List>
                  <ListItem>
                    <Text style={styles.TextItem} note>
                    Bonificacion: 
                    </Text>
                    <Text>€ {item.bonificacion}</Text>
                  </ListItem>
                </List>
                <List>
                  <ListItem>
                    <Text style={styles.TextItem} note>
                    Importe Ingresado: 
                    </Text>
                    <Text>€ {item.importe_ingresado}</Text>
                  </ListItem>
                </List>

                <List>

                  <ListItem>
                    <Text style={styles.TextItem} note>
                    Confirmada: 
                    </Text>
                    <Text> {item.confirmada ? "Si": "No"} {item.confirmada}</Text>
                  </ListItem>

                </List>


                <List>
                  <ListItem>
                    <Text style={styles.TextItem} note>
                    Fecha Confirmacion: 
                    </Text>
                    <Text> {item.fecha_confirmacion}</Text>
                  </ListItem>
                </List>


                <List>
                  <ListItem>
                    <Text style={styles.TextItem} note>
                    Diferencia: 
                    </Text>
                    <Text> €  
                     {   totalNegativo=== true && totalLiquidacion }
                    <Text style={{color:'red', marginLeft: 5}}>
                     {  totalNegativo === false && totalLiquidacion }
                    </Text>
                    </Text>
                  </ListItem>
                </List>
              </View>
            </TouchableOpacity>

            <List style={{alignSelf: 'flex-end'}}>
              <ListItem>
                <TouchableOpacity onPress={() => getItem(item)}>
                  <Icon name="edit" style={{fontSize: 40, color: '#0053C9'}} />
                </TouchableOpacity>

              </ListItem>
            </List>
          </View>
        </Card>
       
        
      )
   
  
}
  )



  const getItem = (item) => {
    console.log(JSON.stringify(item) + "****+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    navigation.navigate('DetalleLicLiquidacion', {
      item: item.nid,
    });
  };

  return (
    <Container>
      <SafeAreaView style={styles.container}>
        <NavBar></NavBar>
        <ScrollView keyboardShouldPersistTaps="always">
          <Text style={styles.TextEtiqutea}> LISTA DE LIQUIDACIONES : </Text>
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

export default LiquidacionesScreen;

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
  TextEtiqutea: {
    fontWeight: 'bold',
    color: '#00183A',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  TextItem: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
});
