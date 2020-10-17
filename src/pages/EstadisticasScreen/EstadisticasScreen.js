import React, {Fragment, useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Dimensions,
  Alert,
  ScrollView,
  Text,
} from 'react-native';
import FormButton from '../../components/ValidateForm/FormButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Picker} from 'native-base';
import {DataTable} from 'react-native-paper';
import NavBar from '../../components/navbar/Navbar';
import {traerEstadisticas} from '../../store/estadisticas/actions';
import {
  Table,
  TableWrapper,
  Col,
  Cols,
  Cell,
  Rows,
  Row,
} from 'react-native-table-component';
import {TRAER_ESTADISTICAS} from '../../store/estadisticas/Constants';
import axios from 'axios';

function EstadisticasScreen() {

  const auth = useSelector((state) => state.auth);
  //const estadisticas = useSelector((state) => state.estadisticas);
  const tablaEstadisticas = useSelector(
      (state) => state.estadisticas.tablaEstadisticas,
  );
  const usuario = useSelector((state) => state.auth.usuario);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {access_token} = usuario;
  const URLperfil = 'https://licencias.fapd.org/json-estadisticas-club';
  const [firstRowDatos, setfirstRowDatos] = useState([]);
  const [tablaCuotas, settablaCuotas] = useState([]);

  const [tablaPorLicencias, settablaPorLicencias] = useState({
    'Agua Dulce Masculino': {Absoluta: {cuenta: '22', importe: '704.00'}},
    'Agua Dulce U15': {Juvenil: {cuenta: '1', importe: '1.00'}},
    morald: {Infantil: {cuenta: '1', importe: '2.00'}},
    U15: {
      Bonificado: {cuenta: '1', importe: '3.00'},
      Infantil: {cuenta: '1', importe: '2.00'},
    },
    Dulce: {Infantil: {cuenta: '1', importe: '4.00'}},
    Water: {Dep: {cuenta: '1', importe: '5.00'}},
  });
  const [newTableLicencias, setnewTableLicencias] = useState([]);
  const [categoryHeaderLicencias, setcategoryHeaderLicencias] = useState([]);
  const [totalCategorias, setTotalCategorias] = useState([]);
  useEffect(() => {
    handleApi();
    _renderLicenciasHeader();
    _newStructToJson();
  }, []);

  const handleApi = () => {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
    };
    axios.get(URLperfil, {headers}).then((respuesta) => {
      // console.log('exito entro funcion  respuesta API traerEstadisticas');
      // console.log(JSON.stringify(respuesta.data));
      const {
        firstRowDatos,
        tablaCuotas,
        tablaPorLicencias,
        totalCategorias,
      } = respuesta.data;
      dispatch({
        type: TRAER_ESTADISTICAS,
        payload: respuesta.data,
      });
      setfirstRowDatos(firstRowDatos);
      settablaCuotas(tablaCuotas);
      // settablaPorLicencias(tablaPorLicencias);
      setTotalCategorias(totalCategorias);
    });
  };

  function handleAlertClick() {}

  const _renderEncabezado = () => {
    let encabezado = Object.values(firstRowDatos).map((element) => {
      return <DataTable.Title>{element}</DataTable.Title>;
    });
    return encabezado;
  };

  const _renderRows = () => {
    if (tablaCuotas !== []) {
      const {Anual} = tablaCuotas;
      const anual = typeof Anual !== 'undefined' ? Anual : [];
      // console.log(anual);
      let rows = Object.values(anual).map((value) => {
        return <DataTable.Cell>{value}</DataTable.Cell>;
      });
      return rows;
    } else {
      null;
    }
  };

  const _renderTotalesRow = () => {
    if (tablaCuotas !== []) {
      const {Totales} = tablaCuotas;
      const totales = typeof Totales !== 'undefined' ? Totales : [];

      let totalesRow = Object.values(totales).map((value) => {
        //console.log(totales.Periodo)
        return <DataTable.Cell>{value}</DataTable.Cell>;
      });
      return totalesRow;
    } else {
      null;
    }
  };

  const _renderLicenciasHeader = () => {
    let listItemsColumns = ['modalidad'];
    Object.keys(tablaPorLicencias).map((firstKey) =>
        Object.keys(tablaPorLicencias[firstKey]).map((secondKey) => {
          if (listItemsColumns.indexOf(secondKey) < 1)
            listItemsColumns.push(secondKey);
        }),
    );
    setcategoryHeaderLicencias(listItemsColumns);
  };

  const _newStructToJson = () => {
    let listItemsToJson = [];

    Object.keys(tablaPorLicencias).map((firstKey) =>
        Object.keys(tablaPorLicencias[firstKey]).map((secondKey) => {
          const {cuenta, importe} = tablaPorLicencias[firstKey][secondKey];

          listItemsToJson = [
            ...listItemsToJson,
            {
              modalidad: firstKey,
              category: secondKey,
              costoCategory: `${cuenta}/${importe}`,
            },
          ];
        }),
    );
    setnewTableLicencias(listItemsToJson);
  };

  return (
      <Container>
        <NavBar></NavBar>
        <ScrollView
            keyboardShouldPersistTaps="always"
            style={{alignContent: 'center', paddingTop: 1}}>
          <SafeAreaView style={styles.container}>
            <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: 18,
                  marginTop: 20,
                }}>
              Tabla de Cuotas
            </Text>
            <DataTable>
              <DataTable.Header>
                {firstRowDatos != [] && _renderEncabezado()}
              </DataTable.Header>

              <DataTable.Row>
                {firstRowDatos != [] ? _renderRows() : null}
              </DataTable.Row>

              <DataTable.Row>
                {firstRowDatos != [] && _renderTotalesRow()}
              </DataTable.Row>
            </DataTable>

            <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: 18,
                  marginTop: 20,
                }}>
              Tabla de Licencias
            </Text>
            <ScrollView horizontal>
              <DataTable>
                <DataTable.Header>
                  {categoryHeaderLicencias.map((category) => (
                      <DataTable.Title style={styles.widthCell}>
                        {category}
                      </DataTable.Title>
                  ))}
                </DataTable.Header>

                {newTableLicencias.map((item) => {
                  return (
                      <DataTable.Row>
                        {categoryHeaderLicencias.map((headerItem, index) => {
                          if (index === 0) {
                            return (
                                <DataTable.Cell style={styles.widthCell}>
                                  {item.modalidad}
                                </DataTable.Cell>
                            );
                          }

                          if (headerItem === item.category) {
                            return (
                                <DataTable.Cell style={styles.widthCell}>
                                  {item.costoCategory}
                                </DataTable.Cell>
                            );
                          }
                          return <DataTable.Cell style={styles.widthCell} />;
                        })}
                      </DataTable.Row>
                  );
                })}

                <DataTable.Row>
                  {categoryHeaderLicencias.map((firstKey, index) => {
                    if (index === 0) {
                      return (
                          <DataTable.Cell style={styles.widthCell}>
                            Totales
                          </DataTable.Cell>
                      );
                    }
                    return Object.keys(totalCategorias).map((secondKey) => {
                      const {cuenta, importe} = totalCategorias[secondKey];

                      if (firstKey === secondKey) {
                        return (
                            <DataTable.Cell
                                style={
                                  styles.widthCell
                                }>{`${cuenta}/${importe}`}</DataTable.Cell>
                        );
                      }
                      return <DataTable.Cell style={styles.widthCell} />;
                    });
                  })}
                </DataTable.Row>
              </DataTable>
            </ScrollView>
          </SafeAreaView>
        </ScrollView>
      </Container>
  );
}

export default EstadisticasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    margin: 5,
  },
  logo: {
    marginLeft: 10,
    marginTop: 30,
    marginBottom: 100,
  },
  containerLogo: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  widthCell: {
    width: 50,
    justifyContent: 'center',
  },
});
