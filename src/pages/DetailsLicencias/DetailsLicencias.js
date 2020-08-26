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

export default class DetailsLicencias extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render_code = () => {
    if (this.props.nid) {
      <DisplayBarcode nid={this.props.nid} />;
    }
  };
  render() {
    const {navigation} = this.props.route.params;
    const {item} = this.props.route.params;
    return (
      <Container>
        <NavBar></NavBar>
        <Content>
          <ListLicencias
            club={item.club}
            categoria={item.categoria}
            esPrimera={item.es_primera}
            fechaEmision={item.fecha_emision}
            importe={item.importe}
            modalidad={item.modalidad}
            nid={item.nid}
            numeroLicencia={item.numero_licencia}
            year={item.year}></ListLicencias>

          {this.render_code()}
        </Content>
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
