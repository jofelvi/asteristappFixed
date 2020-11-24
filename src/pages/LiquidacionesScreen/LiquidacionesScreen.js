import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {Card, Container, List, ListItem} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../components/Loading/Loading';
import NavBar from '../../components/navbar/Navbar';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getCLubsUser, getLiquidaciones} from "../../HttpRequest/Api";

const screenWidth = Dimensions.get('window').width;

function LiquidacionesScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const {access_token, uid} = auth;
  const listLiquidaciones = useSelector((state) => auth.listLiquidaciones);
  const field_user_apellido1 = useSelector((state) => state.auth.field_user_apellido1);
  const [liquidaciones, setLiquidaciones] = useState([]);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    getApis()
  }, []);


  const getApis = async () => {
    let year = "2020"
    let getclub = await getCLubsUser(access_token, uid)
    let apiLiquidaciones = await getLiquidaciones(access_token, getclub, year)
    await setLiquidaciones(apiLiquidaciones)
    await setIsloading(false)
  }

  if (isloading === true) {
    return <Loading isVisible={isloading} text={'CARGANDO...'}/>;
  }

  const _renderList = liquidaciones.map((item, index) => {
      let importeIngresado = item.importe_ingresado
      let totalLiquidacion = parseFloat(item.importe_cuotas) + parseFloat(item.importe_licencias) - parseFloat(item.bonificacion)
      let totalNegativo = totalLiquidacion < importeIngresado ? false : true
      let totalDiferencia = parseFloat(totalLiquidacion - item.importe_ingresado)

    console.log(totalNegativo + " totalNegativo")
     let difPositivo = (
       <Text> €
         {totalDiferencia}
       </Text>
     )
    let difNegativo =(
       <Text style={{color: 'red', marginLeft: 5}}>
        $ -{totalNegativo === false && totalLiquidacion}
       </Text>
    )

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
                    <Text> {item.confirmada ? "Si" : "No"}</Text>
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
                    {totalDiferencia< 0 ? difNegativo: difPositivo}
                  </ListItem>
                </List>
              </View>
            </TouchableOpacity>

            <List style={{alignSelf: 'flex-end'}}>
              <ListItem>
                <TouchableOpacity onPress={() => getItem(item)}>
                  <Icon name="edit" style={{fontSize: 40, color: '#0053C9'}}/>
                </TouchableOpacity>

              </ListItem>
            </List>
          </View>
        </Card>
      )
    }
  )

  const getItem = (item) => {
    navigation.navigate('DetalleLicLiquidacion', {
      item: item.nid,
    });
  };

  return (
    <Container>
      <SafeAreaView style={styles.container}>
        <NavBar/>
        <ScrollView keyboardShouldPersistTaps="always">
          <Text style={styles.TextEtiqutea}> LISTA DE LIQUIDACIONES : </Text>
          <View style={{marginLeft: 5, marginRight: 5}}>

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

/*


 const URLperfil = `https://licencias.fapd.org/user/${uid}?_format=json`;
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


 */
