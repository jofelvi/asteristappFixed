import React, { Fragment, useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, View, Image, Dimensions, Alert, ScrollView, Text } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function stackNavInvitados(){
    return(
        <Stack.Navigator initialRouteName="ListaNoticias">
        <Stack.Screen
          name="ListaNoticias"
          component={ListaNoticiasScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FormContacto"
          component={FormContacto}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailNew"
          component={DetailsScreen}
          options={{headerShown: false}}
        />
  
        <Stack.Screen
          name="Publicidad"
          component={Publicidad}
          options={{headerShown: false}}
        />
  
        <Stack.Screen
          name="Cookies"
          component={PoliticasCookiesScreen}
          options={{headerShown: false}}
        />
  
        <Stack.Screen
          name="Privacidad"
          component={PoliticasPrivacidadScreen}
          options={{headerShown: false}}
        />
  
        <Stack.Screen
          name="AvisoLegal"
          component={AvisoLegalScreen}
          options={{headerShown: false}}
        />
  
        <Stack.Screen
          name="DetailNoticiaSlider"
          component={DetailNoticiaSlider}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailPublicidad"
          component={DetailPublicidad}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    )
}