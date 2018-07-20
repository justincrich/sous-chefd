import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import typography from "/styles/typography.js";
import colors from "/styles/colors.js";
export default function notification(props) {
  this.visible = true;
   this.styles = StyleSheet.create({
    body: {
      position: "absolute",
      display:"flex",
      bottom: 50,
      backgroundColor: "rgba(0,0,0,0.5)",
      padding:10,
      borderRadius:20,
      flexWrap:'wrap',
      maxWidth:400
    },
    text:{
        ...typography.constants,
        color:colors.white,
        textAlign:'center'
    }
  })
  return (
    <View style={this.styles.body}>
      <Text
        style={this.styles.text}
      >{props.message}</Text>
    </View>
  );
}


