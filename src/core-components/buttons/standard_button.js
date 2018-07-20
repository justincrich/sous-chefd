import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "/styles/colors.js";
import typography from "/styles/typography.js";
import PropTypes from 'prop-types';

export default class ChefdButton extends Component {
  static defaultProps = {
    isPriceButton:false,
    outlined:false
  };
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    const {outlined} = this.props;
    this.styles = StyleSheet.create({
      body:{
        width:'100%',
         height: 40,
        paddingLeft:15,
        paddingRight:15,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: outlined? 'transparent':colors.orange,
        borderRadius:2,
        borderWidth: outlined? 2:0,
        borderColor: colors.orange
      },
      buttonText:{
        ...typography.btn,
        color:outlined?colors.orange:colors.white
      },
      buyButtonText: {
        lineHeight:28,
        textAlign: "center",
        height:'100%',
      },
      servingSize: {
        ...typography.btnMuted,
        fontSize: 16
      },
      btnPrice: {
        ...typography.btn,
        fontSize: 24
      }
    });
  }

  render() {
    const {buttonText, price, servings, isPriceButton, children, outlined,onPress} = this.props;
    return (
      <TouchableOpacity
        style={[
          this.styles.body
          ,
          this.props.style
        ]}
        onPress={onPress}
      >
        {children&&
            this.props.children
        }
        {
          isPriceButton &&
          this.getText({ price, servings})
        }
        {
          buttonText &&
          <Text style={this.styles.buttonText}>{buttonText}</Text>
        }
      </TouchableOpacity>
    );
  }

  getText({price, servings}){

    if(price){

      return (
        <Text style={this.styles.buyButtonText}>
          <Text style={[this.styles.servingSize]}>
            {`For ${Math.floor(servings)} `}
          </Text>
          <Text style={[ this.styles.btnPrice]}>{`$${Math.floor(price)}`}</Text>
        </Text>
      )
    }
  }
}



ChefdButton.propTypes = {
  isPriceButton:PropTypes.bool,
  style:PropTypes.object,
  price:PropTypes.number,
  servings:PropTypes.number,
  text:PropTypes.string
}
