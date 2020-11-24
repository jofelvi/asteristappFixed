import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {
  Container,
  Text,
} from 'native-base';
import NavBar from '../../components/navbar/Navbar';

class AvisoLegalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      titulo: '',
      contenido: '',
      arrayRes: [],
    };
  }

  componentDidMount() {
    this.handleAPi();
  }

  handleAPi = () => {
    const URL = 'https://fapd.org/json-pagina?id=3634';
    console.log('HANDLEAPI');
    axios
      .get(URL)
      .then((res) => {
        console.log(
          '###################### AQUI RESPUESTA API #######################',
        );
        this.setState({arrayRes: res.data});
        this.desgloseFuntion();
      })
      .catch((err) => {
        console.log('Error', err);
        Alert.alert('Error con el servidor volver a intentar');
      });
  };

  desgloseFuntion = () => {
    const jsObjects = this.state.arrayRes;
    jsObjects.filter((obj) => {
      this.setState({
        titulo: obj.titulo,
        contenido: obj.contenido,
        id: obj.id,
      });
    });
  };

  render() {
    console.log(this.state.titulo);
    const contenido = this.state.contenido;
    const regex = /(<([^>]+)>)/gi;
    return (
      <Container>
        <NavBar />
        <ScrollView>
          <View style={styles.textTitleFont}>
            <Text style={styles.textTitleFont}>{this.state.titulo}</Text>
          </View>
          <View style={styles.textBodyFont}>
            <Text style={styles.textBodyFont}>
              {(result = contenido.replace(regex, '').trim())}
            </Text>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  marginTop: {
    marginTop: 55,
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
    marginTop: 0,
    paddingTop: 0,
    flex: 1,
  },

  textBodyFont: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    textAlign: 'justify',
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
  },
  textCategoria: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
  },
  ajusteTextView: {
    marginTop: 0,
    paddingTop: 0,
  },
});

export default AvisoLegalScreen;
