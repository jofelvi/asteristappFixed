import React, {Component} from 'react'
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, View,} from 'react-native';
import {connect} from 'react-redux';
import * as usuarioActions from '../../store/auth/actions'
import * as licenciasActions from '../../store/licencias/actions'
import {Container, Text,} from 'native-base';
import ListLicencias from '../../components/ListLicencias/ListLicencias';
import NavBar from '../../components/navbar/Navbar';
import Loading from '../../components/Loading/Loading';
import {getLicCaducadas} from "../../HttpRequest/Api";


const URL = 'https://licencias.fapd.org/json-licencias-vigentes?_format=json';

const {width: screenWidth} = Dimensions.get('window');

class LicenciasCaducadas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      licenciasCad: [],
      isloading: true
    };

  };

  componentDidMount() {
    const {roles} = this.props.auth.usuario.current_user
    if (this.props.auth.usuario.access_token !== null) {
      var token = this.props.auth.usuario.access_token;
      this.getData(token)
    }
  }


  getData = async (token) => {
    let api = await getLicCaducadas(token)
    this.setState({licenciasCad: api, isloading: false})
  }

  render_text = () => {
    return <Text style={{paddingTop: 25, paddingLeft: 5, textAlign: "center"}}>
      el usuario {this.props.auth.usuario.current_user.name} No tiene licencias caducadas
    </Text>

  }

  render() {

    const {isloading} = this.state

    if (isloading === true) {

      return (
        <Loading
          isVisible={isloading}
          text={'CARGANDO...'}
        />
      );
    }
    //const auth = useSelector((state) => state.auth);

    return (
      <Container>
        <NavBar/>
        <ScrollView keyboardShouldPersistTaps='always'>
          <SafeAreaView style={styles.container}>
            <View style={styles.container}>
              <Text style={styles.TextEtiqutea}>LICENCIAS CADUCADAS: </Text>
              {this.state.licenciasCad === [] && this.state.isloading === false ? this.render_text() : null}

              {
                this.state.licenciasCad.map((item) => (

                  <ListLicencias
                    club={item.club}
                    categoria={item.categoria}
                    esPrimera={item.es_primera}
                    fechaEmision={item.fecha_emision}
                    importe={item.importe}
                    modalidad={item.modalidad}
                    nid={item.nid}
                    //numeroLicencia={item.numero_licencia}
                    year={item.year}
                    caducada={true}
                  />
                ))
              }
            </View>
          </SafeAreaView>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = ({auth, licencias}) => {
  return {
    auth,
    licencias
  }
};
const mapDispatchToProps = {
  ...licenciasActions,
  ...usuarioActions
}
export default connect(mapStateToProps, mapDispatchToProps)(LicenciasCaducadas);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    margin: 5
  },
  containerLogo: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsImage: {
    flexBasis: "25%",
    height: "100%"
  },
  TxtoTituloNew: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 18

  },
  textTitle: {
    marginTop: 10,
    marginLeft: 0,


  },
  textTitleFont: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },

  textBodyFont: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    textAlign: 'justify'
  },
  textCategoria: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14
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
    marginBottom: 15,
    marginLeft: 10
  }

})



