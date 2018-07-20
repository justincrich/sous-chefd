import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "/styles/colors.js";
import FontAwesome, { Icons } from "react-native-fontawesome";
export default class IconButton extends Component {
  static defaultProps = {
    icon: "search"
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        style={[styles.body,{borderRadius: 25},this.props.style]}
        title={this.props.title}
      >
        {
          this.props.icon &&
        <FontAwesome style={[styles.icon,this.props.iconStyle]}>{Icons[this.props.icon]}</FontAwesome>
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    body:{
        width: 50,
        height: 50,
        backgroundColor: colors.white,
        position: "relative",
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderColor:colors.mediumGray,
        borderWidth:1
    },
    icon:{
        color:colors.charcoal,
        fontSize:20
      }
})
