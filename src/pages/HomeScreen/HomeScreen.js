import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import NavBar from '../../components/navbar/Navbar';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  backColor: {
    backgroundColor: '#fff',
    color: 'black',
  },
  margenTo: {
    flex: 1,
    marginTop: 0,
    justifyContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
function HomeScreen({route}) {
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const currentUser = useSelector((state) => state.auth.usuario.current_user);
  const rolesUser = useSelector((state) => state.auth.rolesUser);
  const auth = useSelector((state) => state.auth);
  const [logeado, setlogeado] = useState(false);
  const myIcon = <Icon name="rocket" size={30} color="#900" />;

  useEffect(() => {
    if (!rolesUser.includes('invitado')) {
      setlogeado(true);
    } else {
      setlogeado(false);
    }
  }, [auth]);

  if (logeado) {
    return (
      <View style={{flex: 1}}>
        {console.log(currentUser)}
        <View>
          <NavBar />
        </View>
        <View style={styles.margenTo}>
          <Button
            style={styles.backColor}
            title="ir a perfil Aun en contruccion"
            onPress={() => navigation.navigate('Signup')}
          />
          <Button
            title="ir a Lista de noticias"
            onPress={() => navigation.navigate('ListaNoticias')}
          />
          <Button
            title="ir a Lista de GestiónDeportistas"
            onPress={() => navigation.navigate('GestiónDeportistas')}
          />
                    <Button
            title="ir a tabla de Estadisticas"
            onPress={() => navigation.navigate('Estadisticas')}
          />
{myIcon}
          <Button
            title="ir a Login"
            onPress={() => navigation.navigate('LoginScreen')}
          />
          <Button
            title="ir a LicenciasCaducadas"
            onPress={() => navigation.navigate('LicenciasCaducadas')}
          />
          <Button
            title="ir a Solicitud Licencias"
            onPress={() => navigation.navigate('SolicitudLic')}
          />
          <Button
            title="ir a FormContacto"
            onPress={() => navigation.navigate('FormContacto')}
          />

          <Button
            title="Licencias Activas"
            onPress={() => navigation.navigate('LicenciasActivas')}
          />
          <Button
            title="IR A Aviso Legal"
            onPress={() => navigation.navigate('AvisoLegal')}
          />

          <Button
            title="IR A Privacidad"
            onPress={() => navigation.navigate('Privacidad')}
          />

          <Button
            title="IR A cookies"
            onPress={() => navigation.navigate('Cookies')}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        {console.log(auth.usuario)}

        <View>
          <NavBar />
        </View>

        <View style={styles.margenTo}>
          <Button
            title="ir  a Lista de noticias"
            onPress={() => navigation.navigate('ListaNoticias')}
          />

          <Button
            title="ir a Login"
            onPress={() => navigation.navigate('LoginScreen')}
          />

          <Button
            title="IR A Aviso Legal"
            onPress={() => navigation.navigate('AvisoLegal')}
          />

          <Button
            title="IR A Privacidad"
            onPress={() => navigation.navigate('Privacidad')}
          />
       <Button
            title="ir a FormContacto"
            onPress={() => navigation.navigate('FormContacto')}
          />
          <Button
            title="IR A cookies"
            onPress={() => navigation.navigate('Cookies')}
          />
                 <Button
            title="ir a Lista de GestiónDeportistas"
            onPress={() => navigation.navigate('GestiónDeportistas')}
          />
        </View>
      </View>
    );
  }
}

export default HomeScreen;
