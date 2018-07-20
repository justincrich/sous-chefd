import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from "/styles/colors.js";
import typography from "/styles/typography.js";
export default class Template extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View>
                <Text>I'm a Template</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({})