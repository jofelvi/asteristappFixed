import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ErrorMessage = ({ errorValue }) => (
  
    <Text style={styles.errorText}>{errorValue}</Text>
)

const styles = StyleSheet.create({
  container: {
   
    marginTop: 0,
    paddingTop: 0
  },
  errorText: {
    textAlign:'center',
    marginLeft: 10,
    margin: 15,
    color: 'red',
    marginTop: -10,
    paddingTop: 0
  }
})

export default ErrorMessage
