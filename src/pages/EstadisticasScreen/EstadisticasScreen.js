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

const {width: screenWidth} = Dimensions.get('window');

function EstadisticasScreen() {
  const auth = useSelector((state) => state.auth);
  const estadisticas = useSelector((state) => state.estadisticas);
  const tablaEstadisticas = useSelector(
    (state) => state.estadisticas.tablaEstadisticas,
  );

  const usuario = useSelector((state) => state.auth.usuario);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {access_token} = usuario;

  const dispaCallback = React.useCallback(() => {
    dispatch(traerEstadisticas(access_token));
  }, []);

   useEffect(() => {
    dispaCallback();
  }, [firstRowDatos]);

  const _renderEncabezado = Object.values(firstRowDatos).map((element) => {
    console.log(element);
    return <DataTable.Title>{element}</DataTable.Title>;
  });

  const tablaCuotas = useSelector(
    (state) => state.estadisticas.tablaEstadisticas.tablaCuotas,
  );
  const {Anual, Totales} = tablaCuotas;

  const _renderRows = Object.values(Anual).map((value) => {
    console.log(value), (<DataTable.Cell>{value}</DataTable.Cell>);
  });
  const firstRowDatos = useSelector(
    (state) => state.estadisticas.tablaEstadisticas.firstRowDatos,
  );

  const _renderTotalesRow = Object.values(Totales).map((value) => {
    console.log(value), (<DataTable.Cell>{value}</DataTable.Cell>);
  });

 

  return (
    <Container>
      <NavBar></NavBar>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{alignContent: 'center', paddingTop: 1}}>
        <SafeAreaView style={styles.container}>
          <Text>Tabla de Cuotas</Text>
          <DataTable>
            <DataTable.Header>
              {tablaEstadisticas != null && _renderEncabezado}
            </DataTable.Header>

            <DataTable.Row>
              {tablaEstadisticas != null ||  typeof(tablaEstadisticas) !== 'undefined' && _renderRows}
            </DataTable.Row>

            <DataTable.Row>
              {tablaEstadisticas != null && _renderTotalesRow}
            </DataTable.Row>
          </DataTable>

          <Text>Tabla de Licencias</Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Modalidad</DataTable.Title>
              <DataTable.Title>Absoluta</DataTable.Title>
              <DataTable.Title>Totales</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell>Agua dulce</DataTable.Cell>
              <DataTable.Cell>1 / 32.00</DataTable.Cell>
              <DataTable.Cell>198.00</DataTable.Cell>
              <DataTable.Cell>0</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Totales</DataTable.Cell>
              <DataTable.Cell>total 1</DataTable.Cell>
              <DataTable.Cell>total 2</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
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
    width: screenWidth - 60,
    height: screenWidth - 300,
  },
  containerLogo: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
