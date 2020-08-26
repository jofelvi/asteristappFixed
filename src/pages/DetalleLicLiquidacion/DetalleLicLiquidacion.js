import React, {Fragment, useState, useEffect} from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';
import {LICENCIAICON} from '../../assets/image';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Dimensions,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DisplayBarcode from '../../components/barcode/barcode';
import ListLicencias from '../../components/ListLicencias/ListLicencias';
import NavBar from '../../components/navbar/Navbar';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { traerLicenciasVig, traerLicenciasLiquidaciones } from '../../store/licencias/actions';

export default function DetalleLicLiquidacion({route, props}) {
  const {item} = route.params;
  const [licencias, setLicencias] = useState(["1"]);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const {access_token, uid} = auth;
  const licenciasLiquidaciones = useSelector((state) => auth.licenciasLiquidaciones);


  useEffect(() => {
    const {item} = route.params;
    console.log(item + " parametro url")
    const URLLIC = `https://licencias.fapd.org/json-licencias-liquidacion/${item}?_format=json`;
    console.log(URLLIC + " url + parametro url")
    let headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token,
      },
    };
    
    const data = axios.get(URLLIC, {headers}).then((respuesta) => {
        console.log('exito entro funcion  respuesta API TRAER Licencias liquidaciones');
        console.log("respuesta api " + respuesta.data)
           dispatch(traerLicenciasLiquidaciones(respuesta.data))
      });
  }, [item]);



  const _renderLicenciasDetails = licencias.map((item) =>  {
    console.log(licencias.length)
    if (licencias.length >=0 && !licencias.includes('1', 0)) {
        console.log("entro a tiene datos")
        
        return(
                <ListLicencias
                  club={item.club}
                  categoria={item.categoria}
                  esPrimera={item.es_primera}
                  fechaEmision={item.fecha_emision}
                  importe={item.importe}
                  modalidad={item.modalidad}
                  nid={item.nid}
                  numeroLicencia={item.numero_licencia}
                  year={item.year}
                  caducada={true}
                />
            
               )
    }else{
        
        return(
            <Text style={{marginTop:20,textAlign: 'center', fontSize:15, color:'red'}}> No tiene licencias Asociadas a liquidaciones</Text>
        )
    }
   

  }
  )


  return (
    <Container>
      <NavBar></NavBar>
      <Content>
        <View style={styles.container}>
          <Text style={styles.TxtoTituloNew}>
              Licencias Asociadas a Liquidacion
          </Text>
         {_renderLicenciasDetails}
        </View>

      </Content>
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    margin: 5,
  },
  containerLogo: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsImage: {
    flexBasis: '25%',
    height: '100%',
  },
  TxtoTituloNew: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign:'center',

  },
  textTitle: {
    marginTop: 10,
    marginLeft: 0,
  },
  textTitleFont: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },

  textBodyFont: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    textAlign: 'justify',
  },
  textCategoria: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
  },
});
