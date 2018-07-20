import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navs from "./views.js";
import loadFonts from "./assets/fonts/fonts.js";
import "babel-polyfill";
import environment from "./env/getEnv";
// import { ApolloClient } from "apollo-client";
// import { ApolloProvider } from "react-apollo";
// import getClient from "./dataSetup";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  async componentWillMount() {
    await loadFonts();
    this.setState({ loaded: true });
  }

  createClient() {}

  render() {
    const { loaded } = this.state;
    return (
      <View style={{ flex: 1 }}>

        {loaded && 
          <Navs style={{ flex: 1 }} />
        }
      </View>
    );
  }
}
console.disableYellowBox = true;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
