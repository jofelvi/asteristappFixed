import React, {Component} from 'react';
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

export default class DetalleLicenciasYear extends Component {
  constructor(props) {
    super(props);
 }

  render_code = (item) => {
    console.log(item + "item barcode")
    if (item) {
      <DisplayBarcode nid={item} />;
    }
  };

  render() {
    const {navigation} = this.props.route.params;
    const {item} = this.props.route.params;
    return (
      <Container>
        <NavBar/>
        <List style={{marginTop:25}}>
          <ListItem avatar>
            <Left>
              <Thumbnail source={LICENCIAICON} />
            </Left>
            <Body>
              <Text style={styles.textBodyFont}>Deportista: {item.deportista}</Text>
              <Text note>Categoria: {item.categoria}</Text>
              <Text note>fecha Emision: {item.fecha_emision}</Text>
              <Text note>Importe: {item.importe}</Text>
              <Text note>Modalidad: {item.modalidad}</Text>
              <Text note>Nid: {item.nid}</Text>
              <Text note>Numero de Licencia: {item.numero_licencia}</Text>
              <Text note>Año: {item.year}</Text>
            </Body>
          </ListItem>
          {<DisplayBarcode nid={item.numero_licencia} /> }
          
        </List>

      </Container>
    );
  }
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
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 18,
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
