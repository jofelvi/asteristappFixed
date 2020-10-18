import React, {Component} from 'react';
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import FormInput from '../../components/ValidateForm/FormInput';
import {connect} from 'react-redux';
import * as usuarioActions from '../../store/auth/actions';
import * as licenciasActions from '../../store/licencias/actions';
import NavBar from '../../components/navbar/Navbar';
import {LICENCIAICON} from '../../assets/image';
import {Button, Card, Container, List, ListItem, Text, Thumbnail,} from 'native-base';
import Loading from '../../components/Loading/Loading';
import axios from 'axios';


const {width: screenWidth} = Dimensions.get('window');

class LicenciasVigenYear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: false,
      yeartInput: "2020",
      clubId: "",
      isloadin: true,
      lic: []
    };
    this.GetItem = this.GetItem.bind(this);
  }

  componentDidMount() {
    const access_token = this.props.auth.usuario.access_token;
    const {current_user} = this.props.auth.usuario;
    const {uid} = current_user;
    const {roles} = this.props.auth.rolesUser;
    let rol = this.props.auth.usuario.current_user.roles;
    //this.props.traerPerfil(uid, access_token);

    this.handlePerfil(uid, access_token)
    const year3 = new Date().getFullYear();

    if (rol.includes('contabilidad') || rol.includes('gestión') || rol.includes('directiva') || rol.includes('club')) {
      //this.getlicencias(year3);
      console.log("entro if")
    }
  }

  handlePerfil = (uid, token) => {

    const URLperfil = `https://licencias.fapd.org/user/${uid}?_format=json`;

    try {
      axios.get(URLperfil, {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }).then((respuesta) => {
        console.log('exito entro funcion  respuesta API TRAER PERFIL');

        const {field_user_clubs, roles, field_user_gestionclub,} = respuesta.data;

        if (roles.filter((e) => e.target_id === 'club').length > 0) {
          console.log(field_user_gestionclub[0].target_id);
          let clubId = field_user_gestionclub[0].target_id
          this.setState({clubId: clubId, isloadin: false})
          const year3 = new Date().getFullYear();
          this.getlicencias(year3, clubId)
        }
      });
    } catch (error) {
      this.setState({isloadin: false})
    }

  }

  handleapiLicByYear = (nidClub, year, token) => {

    const URLicenciasVgYear = `https://licencias.fapd.org/json-licencias-vigentes-club/${nidClub}/${year}?_format=json`;

    try {
      axios.get(URLicenciasVgYear, {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }).then((respuesta) => {
        console.log('exito entro funcion  respuesta API TRAER PERFIL');

        this.setState({isloadin: false})
        this.setState({lic: respuesta.data})
      });
    } catch (error) {
      this.setState({isloadin: false})
    }

  }

  getlicencias = (year, clubId) => {

    console.log("entro get licencis")
    const access_token = this.props.auth.usuario.access_token;
    const nidClub = this.props.auth.clubIdEncargado;
    console.log(year + 'year ------------------');
    year === undefined || year === '' ? 2020 : year;
    console.log(year + 'year ------------------');
    this.handleapiLicByYear(clubId, year, access_token);

  };

  getlicenciasByDate = (year) => {
    console.log("entro get licencis")
    const access_token = this.props.auth.usuario.access_token;
    const nidClub = this.state.clubId;
    console.log(year + 'year ------------------');
    year === undefined || year === '' ? 2020 : year;
    console.log(year + 'year ------------------');
    this.setState({isloadin: true})
    this.handleapiLicByYear(nidClub, year, access_token);

  };


  GetItem(item) {
    this.props.navigation.navigate('DetalailLicencias2', {
      item: item,
    });
  }

  render_text = () => {
    return (
        <Text style={{paddingTop: 25, paddingLeft: 5, textAlign:"center", color: "red"}}>
          Lo siento su usuariono
          tiene licencias para el año indicado

        </Text>
    );
  };

  onTextChanged(text) {
    // code to remove non-numeric characters from text
    this.setState({yeartInput: text})

  }

  handleFilter = () => {
    this.getlicenciasByDate(this.state.yeartInput)
    console.log(this.state.yeartInput)
  };

  getItem = (item) => {
    //Function for click on an item
    navigation.navigate('DetailPublicidad', {
      item: item
    });
    //Alert.alert(item);
  }

  render() {

    const year3 = new Date().getFullYear();

    if (this.state.isloadin === true) {
      return <Loading isVisible={this.state.isloadin} text={'CARGANDO...'}/>;
    }

    return (


        <View style={styles.container}>
          <NavBar></NavBar>
          {console.log(this.state.lic === [], "araay aqui")}
          {console.log(this.state.lic.length <1, "AQUIII")}
          {console.log(this.state.isloadin, "loadind")}
          <Container>
            <ScrollView>
              <SafeAreaView>
                <Text style={styles.TextEtiqutea}> LICENCIAS POR EJERCICIO: </Text>
                {this.state.lic.length <1 && this.state.isloadin == false
                    ? this.render_text()
                    : null}
                <List>
                  <ListItem>
                    <Text style={styles.TextEtiqutea2}>Buscar Licencias por año </Text>

                  </ListItem>
                  <FormInput
                      style={{height: 30, borderColor: 'gray', borderWidth: 1, width: "50%"}}
                      keyboardType='numeric'
                      onChangeText={(text) => this.onTextChanged(text)}
                      value={this.state.yeartInput}
                      defaultValue="2020"
                      maxLength={4}
                      placeholder="Ingresar año"

                  />

                </List>


                <Button style={{marginLeft: 10}} small info onPress={() => this.handleFilter()}>
                  <Text style={styles.textButton}>Buscar</Text>
                </Button>


                {this.state.lic.map((item) => (
                    <TouchableOpacity onPress={() => this.GetItem(item)}>
                      <Card style={{marginTop: 15, backgroundColor: '#f2f1ec', marginLeft: 5, marginRight: 5}}>
                        <View style={styles.newsListContainer}>
                          <Thumbnail source={LICENCIAICON}/>
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
                            {item.year < year3 ? <Text note style={{color: 'red'}}>LICENCIA CADUCADA </Text> : null}
                          </View>
                        </View>
                      </Card>
                    </TouchableOpacity>
                ))}
              </SafeAreaView>
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
  TxtoTituloNew: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15
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
    marginBottom: 15
  },
  TextEtiqutea2: {
    fontWeight: 'bold',
    color: '#00183A',
    fontSize: 15,
    marginTop: 15,
    marginLeft: 10
  }
});
