import React from "react";
import { WebView, Dimensions, View } from "react-native";
import environment from "/env/getEnv.js";
import Header from "/core-components/header/header.js";
export default function(props) {
    const {goBack,data} = props;
  return (
    <View
        style={{flex:1}}
    >
      <Header 
        style={{
            position:'absolute',
            top:0,
            width:'100%'
        }}
        left="arrowLeft"
        onPressLeft={()=>goBack()}
      />
      <WebView
        style={{
          flex: 1
        }}
        injectedJavaScript={
          'document.getElementById("header_desktop_version").style.display="none";'
        }
        source={{ uri: "https://www.chefd.com/products/"+data.handle }}
      />
    </View>
  );
}

//
