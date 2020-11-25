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
import {getCLubsUser, getLicByYear} from "../../HttpRequest/Api";


const {width: screenWidth} = Dimensions.get('window');

//TODO: paginacion igual que lista noticias

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
    this.handleFilter = this.handleFilter.bind(this);

  }

  componentDidMount() {
    const access_token = this.props.auth.usuario.access_token;
    const {current_user} = this.props.auth.usuario;
    const {uid} = current_user;
    const {roles} = this.props.auth.rolesUser;
    let rol = this.props.auth.usuario.current_user.roles;
    //this.props.traerPerfil(uid, access_token);
    this.handleApis(uid, access_token)

  /*  if (rol.includes('contabilidad') || rol.includes('gestión') || rol.includes('directiva') || rol.includes('club')) {
      //this.getlicencias(year3);
      console.log("entro if")
    }*/
  }

  handleApis = async (uid, token) => {
    const year = new Date().getFullYear();

    let clubs = await getCLubsUser(token, uid)

    await  this.setState({clubId:clubs})

    let licenciasByclub = await getLicByYear(clubs,year, token)

    await this.setState({isloadin:false, lic: licenciasByclub})

  }

  getlicenciasByDate = async (year) => {

    await this.setState({isloadin:true})
    const access_token = this.props.auth.usuario.access_token;
    const {clubs} = this.state
    let licenciasByclub = await getLicByYear(this.state.clubId,this.state.yeartInput, access_token)
    await this.setState({isloadin:false, lic: licenciasByclub})

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

    const _renderList = this.state.lic.map((item) => (
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
      ))

    return (


        <View style={styles.container}>
          <NavBar/>
          <Container>
            <ScrollView>
              <SafeAreaView>
                <Text style={styles.TextEtiqutea}> LICENCIAS POR EJERCICIO: </Text>

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


                <Button
                  style={{marginLeft: 10}}
                  small
                  info
                  onPress={() => this.handleFilter()}
                  disabled={this.state.isloadin}
                >
                  <Text style={styles.textButton}>Buscar</Text>
                </Button>

                {this.state.lic.length >1 && this.state.isloadin == false ? _renderList : this.render_text()}


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
