import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Platform
} from "react-native";
import FontAwesome, { Icons } from "react-native-fontawesome";
import Logo from "/core-components/logo/logo";
import { Svg, Path } from "expo";
import typography from "/styles/typography.js";
import colors from "/styles/colors.js";

export default class Header extends Component {
  static defaultProps = {
    left: "",
    right: ""
  };
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    let paddingTop;
    if(Platform.OS === 'ios'){
      const majorVersion = parseInt(Platform.Version, 10);
      paddingTop = majorVersion < 11? 35 :15;
    }else{
      paddingTop:StatusBar.currentHeight;
    }
    this.setState({paddingTop})
  }
  render() {
    console.log("status bar height", StatusBar.currentHeight);
    return (
      <View style={[styles.body,{paddingTop:this.state.paddingTop}]}>
          <View style={styles.bodyContainer}>
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.leftButton}
                onPress={this.props.onPressLeft}
              >
                <FontAwesome style={styles.buttonIcon}>
                  {Icons[this.props.left]}
                </FontAwesome>
              </TouchableOpacity>

              <Logo
                bodyStyle={styles.logo}
                imgStyle={{ width: 45, height: 20 }}
                fontStyle={{ fontSize: 20, lineHeight: 20, height: 20 }}
              />
              <TouchableOpacity
                style={styles.rightButton}
                onPress={this.props.onPressRight}
              >
                <FontAwesome style={styles.buttonIcon}>
                  {Icons[this.props.right]}
                </FontAwesome>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    height: 80,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    backgroundColor: colors.white,
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    zIndex: 1000
  },
  bodyContainer: {
    position: "relative"
  },
  leftButton: {
    position: "absolute",
    left: 0,
    width: 20,
    height: 20
  },
  rightButton: {
    position: "absolute",
    right: 0,
    width: 20,
    height: 20
  },
  buttonIcon: {
    fontSize: 20,
    color: colors.charcoal
  },
  container: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
    width: "100%",
    height: "100%"
  },
  logo: {
    // height:'100%',
    // width:'100%',
    justifyContent: "center"
  }
});
