import React, {Component} from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import colors from "/styles/colors.js";
import FontAwesome, { Icons } from 'react-native-fontawesome';
export default class TextField extends Component{
    constructor(props){
        super(props);
        this.getStyles = this.getStyles.bind(this)
    }

    componentWillMount(){
        this.styles = this.getStyles();
    }

    getStyles(){
        return StyleSheet.create({
            inputContainer:{
                width:'100%',
                position:'relative',
                justifyContent:'flex-end'
            },
            input:{
                borderWidth:1,
                borderColor:colors.mediumGray,
                height:60,
                paddingTop: 16,
                paddingBottom:16,
                paddingLeft:this.props.icon? 50:20,
                paddingRight:20,
                fontSize:20,
                lineHeight:20,
                fontFamily:'verlag',
                justifyContent: 'center'
            },
            icon:{
                position:'absolute',
                fontSize:14,
                paddingTop:20,
                paddingBottom:20,
                paddingLeft:20,
                fontSize:20,
                color:colors.charcoal,
                zIndex:1000
              },
          });
    }
    render(){
        return(
            <View
            style={[this.styles.inputContainer,this.props.containerStyle]}
            >
                {
                    this.props.icon &&
                    <FontAwesome
                style={this.styles.icon}
              >
                {Icons[this.props.icon]}
              </FontAwesome> 
                }
                <TextInput
                style={[this.styles.input,this.props.style]}
                value={this.props.value}
                onChangeText={this.props.onChangeText}
                placeholder={this.props.placeholder}
                keyboardType={this.props.keyboardType}
                onKeyPress={this.props.onKeyPress}
                returnKeyType={this.props.returnKeyType}
                underlineColorAndroid = {'transparent'}
                selectionColor = {colors.orange}
                onSubmitEditing = {this.props.onSubmitEditing}
            />
            </View>
        )
    }
}



  