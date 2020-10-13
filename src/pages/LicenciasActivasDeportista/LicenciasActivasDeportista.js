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
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import Icon2 from 'react-native-vector-icons/MaterialIcons';

const {width: screenWidth} = Dimensions.get('window');

const URL = 'https://licencias.fapd.org/json-licencias-vigentes?_format=json';

class LicenciasActivasDeportista extends Component {

  constructor(props) {
    super(props);
    this.state = {
      admin: false,
      clubsAdmin: [],
      clubsDeportista:[],
      isloadin: true

    };
    this.GetItem = this.GetItem.bind(this);
    this.getData = this.getData.bind(this)
    this.goEdit = this.goEdit.bind(this)
  }

  componentDidMount() {

    const access_token = this.props.auth.usuario.access_token;
    const {current_user} = this.props.auth.usuario;
    const {uid} = current_user;
    let rol = this.props.auth.usuario.current_user.roles;
    const {item, nombre} = this.props.route.params ? this.props.route.params : '';

    //this.props.traerLicenciasVig(access_token);
    this.getData(access_token)

  }

 getData =(token) =>{
   

  axios.get(URL, { 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,}
  ).then((respuesta) => {

    console.log('###################### ACTION AQUI RESPUESTA API traerLicenciasVig #######################');
    console.log(respuesta.data)
    this.setState({clubsDeportista: respuesta.data, isloadin: false})
    //this.setState({isloadin: false})
  });
    
  }
 
  GetItem(item) {
    this.props.navigation.navigate('DetailsLicencias', {
      item: item,
    });
  }

  
  goEdit() {
    
    const {item} = this.props.route.params ? this.props.route.params : '';
    this.props.navigation.navigate('FormPerfilByClubScreen', {
      item: item,
    });
  }

   alertDelete = () => {
    const {item, nombre} = this.props.route.params ? this.props.route.params : '';

    Alert.alert(
      'Advertencia',
      'El Usuario ' +
        nombre +
        ' uid ' +
        item +
        ' sera eliminado permanentemente',
      [
        {text: 'Aceptar', onPress: () => this.eliminarUser(item)},
        {text: 'Cancelar', onPress: () => 'resetValues'},
      ],

      {cancelable: false},
    );
  };

 


  render_text = () => {
    return (
      <Text style={{paddingTop: 25, paddingLeft: 5}}>
        el usuario {this.props.auth.usuario.current_user.name} No tiene
        licencias caducadas
      </Text>
    );
  };


  
  render() {
    let rol = this.props.auth.usuario.current_user.roles;

    const {isloadin} = this.state

    console.log("------ LIC CARGANDO = -------", isloadin)

    if (isloadin === true) {

      return (
        <Loading
          isVisible={isloadin}
          text={'CARGANDO...'}
        />
      );
    }

     if (rol.includes('deportista'))
     { 
      return (
        <Container>
          <NavBar></NavBar>
          <ScrollView
            keyboardShouldPersistTaps="always"
            style={{alignContent: 'center', paddingTop: 1}}>
            <SafeAreaView style={styles.container}>
              <View>
                <Text style={styles.TextEtiqutea}>
                  LISTADO LICENCIAS EN VIGOR deportista:
                  
                </Text>
                {this.state.clubsDeportista.length <= 0 &&
                this.state.isloadin != false
                  ? this.render_text()
                  : null}
                {this.state.clubsDeportista.map((item) => (
                  <TouchableOpacity onPress={() => this.GetItem(item)}>
                    
                    <Card style={{marginLeft: 5, marginRight: 5}}>
                      <View style={styles.newsListContainer}>
                        <Thumbnail source={LICENCIAICON} />
                        <View style={styles.newsInfo}>
                          <Text style={styles.textBodyFont}>
                            CLUB: {item.club}
                          </Text>
                          <Text note numberOfLines={1}>
                            Categoria: {item.categoria}
                          </Text>
                          <Text note>Fecha Emision: {item.fechaEmision}</Text>
                          <Text note>Importe: {item.importe}</Text>
                          <Text note>Modalidad: {item.modalidad}</Text>
                          <Text note>Año: {item.year}</Text>
                          <Text note>
                            Numero Licencia: {item.numero_licencia}
                          </Text>
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
                ))}
              </View>
            </SafeAreaView>
          </ScrollView>
        </Container>
      );
    }
  
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
export default connect(mapStateToProps, mapDispatchToProps)(LicenciasActivasDeportista);

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
  TextEtiqutea: {
    fontWeight: 'bold',
    color: '#00183A',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  TextEtiqutea2: {
    fontWeight: 'bold',
    color: '#00183A',
    fontSize: 15,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
  },
});
