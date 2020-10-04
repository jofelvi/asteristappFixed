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

const {width: screenWidth} = Dimensions.get('window');

class LicenciasActivas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: false,
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

    const {item} = this.props.route.params ? this.props.route.params : '';
    console.log('contenido tipo item vacio', item);
    if (item !== 'undefined' || item !== null) {
      this.props.traerLicenciasVigRoles(item, access_token);
    }
    console.log(item !== 'undefined');
    if (rol.includes('contabilidad') || rol.includes('gestión') || rol.includes('directiva') || rol.includes('club')
    ) {
      if (item !== 'undefined' || item !== null) {
        console.log('contenido tipo item vacio', item);
        this.props.traerLicenciasVigRoles(item, access_token);
        console.log('entro traerLicenciasVigRoles not undefined');
      } else {
        this.props.traerLicenciasVigRoles(uid, access_token);
        console.log('entro traerLicenciasVigRoles');
      }
    } else {
      // this.props.traerLicenciasVig(access_token);
      console.log('entro');
    }
    console.log('arreglo licencias ' + detalleLicenciasVig.length >= 0);
  }
  GetItem(item) {
    //Function for click on an item
    this.props.navigation.navigate('DetailsLicencias', {
      item: item,
    });
    //Alert.alert(item);
  }

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

    if (this.props.licencias.cargando === true) {
      return (
        <Loading
          isVisible={this.props.licencias.cargando}
          text={'CARGANDO...'}
        />
      );
    }

    if (rol.includes('contabilidad') || rol.includes('gestión') || rol.includes('directiva') || rol.includes('club')){

        return (
          <Container>
          <NavBar></NavBar>
          <ScrollView
            keyboardShouldPersistTaps="always"
            style={{alignContent: 'center', paddingTop: 1}}>
            <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.TxtoTituloNew}> LICENCIAS VIGENTES: </Text>
            {console.log(this.props.licencias.licenciasVigRoles.length <= 0)}
            {console.log(JSON.stringify(this.props.licencias.licenciasVigRoles))}
  
  
            {this.props.licencias.licenciasVigRoles.map((item) => (
            <TouchableOpacity onPress={() => this.GetItem(item)}>
            <Card style={{marginLeft: 5, marginRight: 5}}>
              {console.log(JSON.stringify(item))}
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
     if (rol.includes('deportista') )
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
                  LISTADO LICENCIAS EN VIGOR:
                </Text>
                {this.props.licencias.licenciasVig.length <= 0 &&
                this.props.licencias.cargando != true
                  ? this.render_text()
                  : null}
                {this.props.licencias.licenciasVig.map((item) => (
                  <TouchableOpacity onPress={() => this.GetItem(item)}>
                    <Card style={{marginLeft: 5, marginRight: 5}}>
                      {console.log(JSON.stringify(item))}
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
export default connect(mapStateToProps, mapDispatchToProps)(LicenciasActivas);

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

/*




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
                            />
*/
