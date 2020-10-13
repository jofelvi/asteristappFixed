import React, {Component} from 'react';
import {Alert, Dimensions, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View,} from 'react-native';

import {connect} from 'react-redux';
import * as usuarioActions from '../../store/auth/actions';
import * as licenciasActions from '../../store/licencias/actions';
import NavBar from '../../components/navbar/Navbar';
import {LICENCIAICON} from '../../assets/image';
import {Card, Container, List, ListItem, Text, Thumbnail,} from 'native-base';
import Loading from '../../components/Loading/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import DatePicker from 'react-native-datepicker';

const {width: screenWidth} = Dimensions.get('window');

class LicenciasActivas extends Component {

  constructor(props) {
    super(props);
    this.state = {
      admin: false,
      clubsAdmin: [],
      clubsDeportista:[],
      fechaVar:  '',
      isloading: true
    };
    this.GetItem = this.GetItem.bind(this);
  }



  componentDidMount() {

    const access_token = this.props.auth.usuario.access_token;
    const {current_user} = this.props.auth.usuario;
    const {uid} = current_user;
    let rol = this.props.auth.usuario.current_user.roles;
    const {item, nombre} = this.props.route.params ? this.props.route.params : '';

    this.props.traerLicenciasVigRoles(item, access_token);

    this.handleApi(uid)
    this.handleApi2(item)
  }

  handleApi = (uid)=>{
    const access_token = this.props.auth.usuario.access_token;

    const URLperfil = `https://licencias.fapd.org/user/${uid}?_format=json`;

    axios.get(URLperfil, {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token,
    }).then((respuesta) => {

      this.setState({clubsAdmin: respuesta.data.field_user_gestionclub.map((item) => item.target_id)})
      console.log(
          'clubs' +
          JSON.stringify(respuesta.data.field_user_gestionclub.map((item) => item.target_id)),
      );

    });
  }

  handleApi2= (uid)=>{
    const access_token = this.props.auth.usuario.access_token;

    const URLperfil = `https://licencias.fapd.org/user/${uid}?_format=json`;

    let headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token,
      },
    };

    axios.get(URLperfil, {headers}).then((respuesta) => {
      this.setState({clubsDeportista: respuesta.data.field_user_clubs.map((item) => item.target_id)})
      console.log(
          'clubs deportista' +
          JSON.stringify(respuesta.data.field_user_clubs.map((item) => item.target_id)),
      );
    });
  }

  handleAPieditarPerfil = (uid, data)  => {
    const access_token = this.props.auth.usuario.access_token;

    const URLperfil = `https://licencias.fapd.org/user/${uid}?_format=json`;

    fetch(URLperfil, {
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
      body: data,
    }).then((respuesta) => {
      console.log('exito entro funcion  respuesta API editarPerfil');
      console.log(respuesta.status);
      //respuesta.status !== 403 ??
    }).catch((err) =>{
      console.log(err)
    } );

  };

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

  eliminarUser = (itemUid) => {
    let clubsDeportista = this.state.clubsDeportista[0]
    let clubsadmin = this.state.clubsAdmin[0]
    console.log("--------------------------")

    if (clubsadmin === clubsDeportista){
      let arr = this.state.clubsDeportista.filter(function(item) {
        return item !== clubsadmin
      })

      const data = {
        uid:[
          {
            value: itemUid
          }
        ],
        field_user_clubs:[
          {
            value: arr
          }
        ],
      }
      this.handleAPieditarPerfil(itemUid, data)
    }
  }

  render_buton_byclub = () => {

    return (
        <Text style={{paddingTop: 25, paddingLeft: 5}}>
          es de este club
        </Text>
    );
  };

  hideModal = () => {
    this.setState({dialogVisible: false})
  }

  showModal = () => {
    this.setState({dialogVisible: true})
  }


  render_text = () => {
    return (
        <Text style={{paddingTop: 25, paddingLeft: 5}}>
          el usuario {this.props.auth.usuario.current_user.name} No tiene
          licencias caducadas
        </Text>
    );
  };

  callback = (newDate) => {
    console.log('entro callback2 ' + newDate);
    var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
    let fechaParse = newDate.replace(pattern, '$3-$2-$1');
    this.setState({fechaVar: fechaParse});
  };

  render_button = (licencia) => {


    let clubsAdmin = this.state.clubsAdmin
    let parsLic = parseInt(licencia)

    if (clubsAdmin[0] === parsLic){
      console.log("++++++++++++++++")
      return(
          <List style={{alignSelf: 'flex-end'}}>
            <ListItem>
              <TouchableOpacity onPress={() => this.goEdit()}>
                <Icon name="edit" style={{fontSize: 40, color: '#0053C9'}} />
              </TouchableOpacity>
            </ListItem>
          </List>
      )
    }

    if (clubsAdmin[0] != parsLic){
      return(
          <Text style={{paddingTop: 25, paddingLeft: 5}}>
            Lo siento no puede editar licencias y usuarios que no esten asociadas a su club
          </Text>
      )
    }

  }

  render_button_delete = () => {

    //console.log(clubsAdmin.map((e) => typeof e))

    console.log("this.props.licencias.cargando  " , this.props.licencias.cargando)
    if (this.props.licencias.licenciasVigRoles <=0 && this.props.licencias.cargando !== true){
      return(
          <List style={{alignSelf: 'flex-end'}}>
            <ListItem>
              <TouchableOpacity onPress={() => //
                  this.showModal()
                //this.alertDelete()

              }>
                <Icon2 name="delete" style={{fontSize: 40, color: '#0053C9'}} />
              </TouchableOpacity>
            </ListItem>
          </List>
      )
    }
  }

  render() {
    const {item, nombre} = this.props.route.params ? this.props.route.params : '';

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
                  <ConfirmDialog
                      title={ `Desea Eliminar usuario ${nombre} `}
                      visible={this.state.dialogVisible}
                      onTouchOutside={() => this.setState({dialogVisible: false})}
                      positiveButton={{
                        title: "Eliminar",
                        onPress: () => this.eliminarUser(item)
                      }} >
                    <View>


                      <DatePicker
                          style={{width: 200}}
                          date={this.state.fechaVar}
                          mode="date"
                          locale="es"
                          placeholder={this.state.fechaVar}
                          format="DD-MM-YYYY"
                          minDate="01-01-1900"
                          maxDate="01-01-2022"
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                            dateIcon: {
                              position: 'absolute',
                              left: 0,
                              top: 4,
                              marginLeft: 0,
                            },
                            dateInput: {
                              marginLeft: 36,
                            },
                            // ... You can check the source to find the other keys.
                          }}
                          onDateChange={(event) => this.callback(event)}
                      />

                    </View>
                  </ConfirmDialog>
                  <Text style={styles.TxtoTituloNew}> LICENCIAS VIGENTES ADMINISTRADORES: </Text>
                  {
                    this.render_button_delete()
                  }

                  {  this.props.licencias.licenciasVigRoles.map((item) => (

                      <TouchableOpacity onPress={() => this.GetItem(item)}>

                        {

                          this.render_button(item.club_id)
                        }

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
  overlay: {
    height: "30%",
    width: '100%',
    backgroundColor: "#fff",
    borderColor: '#539bef',
    borderWidth: 2,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  text22: {
    color: "#539bef",
    textTransform: "uppercase",
    marginTop: 10
  }
});
