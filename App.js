import React from "react";
import { Font } from "expo";
import { StyleSheet, Text, View } from "react-native";
import "babel-polyfill";
import Home from "/components/views/home.js";

import App from "./src/app.js";
import StorybookUI from "./storybook";
console.disableYellowBox = true;
// module.exports = __DEV__ ? StorybookUI : App;
module.exports = App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
