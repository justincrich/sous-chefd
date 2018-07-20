import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import typography from "/styles/typography.js";
import colors from "/styles/colors.js";
const LogoImg = require("/assets/images/logo.png");

export default function Logo(props){
    return(
        <View
              style={[styles.headerContainer,props.bodyStyle]}
            >
              <Text style={[typography.product,styles.headerText,props.fontStyle]}>Sous</Text>
              <Image 
                source={LogoImg}
                style={[styles.logo,props.imgStyle]}
              />
            </View>
    )
}

const styles = StyleSheet.create({
    headerContainer:{
        position:'relative',
        display:'flex',
        flexDirection:'row',
        alignItems:'baseline'


      },
      headerText:{
        color:colors.orange,
        fontFamily: "sentinel-bold",
        fontSize: 30,
        height:30,
        lineHeight:30
      },
      logo:{
        width:80,
        height:30
      },
})