import React, { Component } from 'react'
import { View } from 'react-native';
import Barcode from "react-native-barcode-builder";

export default function DisplayBarcode(props) {
    const { nid } = props
    return (
        <View style={{ flex: 1 }}>
        <Barcode 
            value={nid} 
            format="CODE128"
        />
        </View>
    )

}