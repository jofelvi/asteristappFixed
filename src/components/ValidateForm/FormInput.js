import React from 'react'
import { Input } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'
import Icon2 from 'react-native-vector-icons/Ionicons';

const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  label,
  labelStyle,
  inputStyle,
  errorMessage,
  defaultValue,
  ...rest
}) => (
    <View style={styles.inputContainer}>
      <Input
        {...rest}
        leftIconContainerStyle={styles.iconStyle}
        leftIcon={<Icon2 name={iconName} size={28} color={iconColor} />}
        placeholderTextColor='grey'
        name={name}
        keyboardType={keyboardType}
        defaultValue={defaultValue}
        label={label}
        labelStyle={styles.TextLabel}
        inputStyle={inputStyle}
        placeholder={placeholder}
        style={styles.inputContainer}
        errorMessage={errorMessage}
        autoCapitalize = 'none'
      />
    </View>
  )

const styles = StyleSheet.create({
  inputContainer: {
    margin: 0,
  },
  iconStyle: {
    marginRight: 10
  },
  TextLabel: {
    //fontWeight: 'bold',
    color: '#00183A',
    fontSize: 14
  },
  inputStyle:{
    color: '#00183A',
    fontSize: 14
  }
})


export default FormInput
