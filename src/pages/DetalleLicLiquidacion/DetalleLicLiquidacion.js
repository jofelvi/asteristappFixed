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
import Loading from '../../components/Loading/Loading';

export default function DetalleLicLiquidacion({route, props}) {
  const {item} = route.params;
  const [licencias, setLicencias] = useState(["1"]);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const {access_token, uid} = auth;
  const licenciasLiquidaciones = useSelector((state) => state.licencias.licenciasLiquidaciones);
  const [licLiquid, setLicLiquid] = useState([]);
  const [isloadin, setIsloadin] = useState(true);

  useEffect(() => {

    const {item} = route.params;
    const URLLIC = `https://licencias.fapd.org/json-licencias-liquidacion/${item}?_format=json`;
    
    handleApi(URLLIC)
      
  }, [item]);


  const handleApi = (URLLIC)=>{

    try {
      axios.get(URLLIC, {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token,}
      ).then((respuesta) => {
        console.log('exito entro funcion  respuesta API TRAER Licencias liquidaciones');
        console.log("respuesta api " + JSON.stringify(respuesta.data))
           //dispatch(traerLicenciasLiquidaciones(respuesta.data))
           setLicLiquid(respuesta.data)
           setIsloadin(false)
      });
    } catch (error) {
      setIsloadin(false)
    }

  }

  const _renderLicenciasDetails = licLiquid.map((item) =>  {
    
    
        console.log("entro a tiene datos")
        console.log(JSON.stringify(licLiquid))
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
  }
  )

  if (isloadin === true) {

    return (
      <Loading
        isVisible={isloadin}
        text={'CARGANDO...'}
      />
    );
  }

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
