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
import DisplayBarcode from '../barcode/barcode';
import NavBar from '../navbar/Navbar';

export default class ListLicencias extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    //const {navigation} = this.props.route.params
    //const {item} = this.props.route.params
    return (
      <Content>
        <List style={{marginTop:25}}>
          <ListItem avatar>
            <Left>
              <Thumbnail source={LICENCIAICON} />
            </Left>
            <Body>
              <Text style={styles.textBodyFont}>CLUB: {this.props.club}</Text>
              <Text note>Categoria: {this.props.categoria}</Text>
              <Text note>Es Primer vez: {this.props.esPrimera}</Text>
              <Text note>Fecha Emision: {this.props.fechaEmision}</Text>
              <Text note>Importe: {this.props.importe}</Text>
              <Text note>Modalidad: {this.props.modalidad}</Text>
              <Text note>Numero de Licencia: {this.props.numeroLicencia}</Text>
              <Text note>Año: {this.props.year}</Text>
            </Body>
          </ListItem>
          {this.props.caducada !== true && <DisplayBarcode nid={this.props.nid} /> }
          
        </List>
      </Content>
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
