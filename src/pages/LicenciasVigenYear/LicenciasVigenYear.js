import React, {Fragment, useState, useEffect, Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Dimensions,
  Alert,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';

import {connect} from 'react-redux';
import * as usuarioActions from '../../store/auth/actions';
import * as licenciasActions from '../../store/licencias/actions';
import ListLicencias from '../../components/ListLicencias/ListLicencias';
import NavBar from '../../components/navbar/Navbar';
import {useNavigation} from '@react-navigation/native';
import {LICENCIAICON} from '../../assets/image';
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
  Card,
} from 'native-base';
import {parseZone} from 'moment';
import Loading from '../../components/Loading/Loading';

const {width: screenWidth} = Dimensions.get('window');

class LicenciasVigenYear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: false,
      yeartInput: ""
    };
    this.GetItem = this.GetItem.bind(this);
  }

  componentDidMount() {
    const access_token = this.props.auth.usuario.access_token;
    const {current_user} = this.props.auth.usuario;
    const {uid} = current_user;
    const {roles} = this.props.auth.rolesUser;
    const detalleLicenciasVig = this.props.licencias.detalleLicenciasVig;
    let rol = this.props.auth.usuario.current_user.roles;
    this.props.traerPerfil(uid, access_token);

    if (
      rol.includes('contabilidad') ||
      rol.includes('gestión') ||
      rol.includes('directiva') ||
      rol.includes('club')
    ) {
      console.log('entro traerLicenciasVigYears');
      this.getlicencias();
    }
  }

  getlicencias = (year) => {
    const access_token = this.props.auth.usuario.access_token;
    const nidClub = this.props.auth.clubIdEncargado;
    console.log(year + 'year ------------------');
    year === undefined || year === '' ? 2020 : year;
    console.log(year + 'year ------------------');
    this.props.traerLicenciasYears(nidClub, year, access_token);
  };

  GetItem(item) {
    this.props.navigation.navigate('DetalailLicencias2', {
      item: item,
    });
  }

  render_text = () => {
    return (
      <Text style={{paddingTop: 25, paddingLeft: 5}}>
        Lo siento su usuario {this.props.auth.usuario.current_user.name} no
        tiene licencias activas
      </Text>
    );
  };

  onTextChanged(text) {
    // code to remove non-numeric characters from text
    this.setState({yeartInput: text})

  }
  
  handleFilter = () => {
    this.getlicencias(this.state.yeartInput)
    console.log(this.state.yeartInput)
  };

  render() {
    if (this.props.licencias.cargando === true) {
      return (
        <Loading
          isVisible={this.props.licencias.cargando}
          text={'CARGANDO...'}
        />
      );
    }

    return (
      <View style={styles.container}>
        <NavBar></NavBar>
        <Container>
          <ScrollView>
            <Text style={styles.TxtoTituloNew}> LICENCIAS POR EJERCICIO: </Text>
            {this.props.licencias.licenciasYears.length <= 0
              ? this.render_text()
              : null}

        <Text style={styles.textButton}>Buscar Licencias por año</Text>
            <TextInput 
            style={{height: 30, borderColor: 'gray', borderWidth: 1, width: "30%", marginBottom:10, marginTop: 10, marginLeft:5}}
            keyboardType='numeric'
            onChangeText={(text)=> this.onTextChanged(text)}
            value={this.state.yeartInput}
            defaultValue="2020"
            maxLength={4}  
            placeholder="Ingresar año"
            />
            <Button small info onPress={() =>this.handleFilter()}>
              <Text style={styles.textButton}>Buscar</Text>
            </Button>

            {this.props.licencias.licenciasYears.map((item) => (
              <TouchableOpacity onPress={() => this.GetItem(item)}>
                <Card style={{marginTop: 20, backgroundColor: '#f2f1ec'}}>
                  <View style={styles.newsListContainer}>
                    <Thumbnail source={LICENCIAICON} />
                    <View style={styles.newsInfo}>
                      <Text style={styles.textBodyFont}>
                        Deportista: {item.deportista}
                      </Text>
                      <Text note numberOfLines={1}>
                        Categoria: {item.categoria}
                      </Text>
                      <Text note>Fecha Emision: {item.fecha_emision}</Text>
                      <Text note>Importe: {item.importe}</Text>
                      <Text note>Modalidad: {item.modalidad}</Text>
                      <Text note>Nid: {item.nid}</Text>
                      <Text note>Numero Licencia: {item.numero_licencia}</Text>
                      <Text note>Año: {item.year}</Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Container>
      </View>
    );
  }
}

const mapStateToProps = ({auth, licencias}) => {
  return {
    auth,
    licencias,
  };
};
const mapDispatchToProps = {
  ...licenciasActions,
  ...usuarioActions,
};
export default connect(mapStateToProps, mapDispatchToProps)(LicenciasVigenYear);

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
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom:15
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
  newsListContainer: {
    width: '100%',
    marginBottom: 4,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  newsImage: {
    flexBasis: '25%',
    height: '100%',
  },

  newsInfo: {
    flexBasis: '75%',
    padding: 2,
    alignSelf: 'flex-start',
  },
});
