import React, {Component} from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import colors from "/styles/colors.js";
import typography from "/styles/typography.js";
import AccordionOption from './accordionOption'

export default class AccordionInterface extends Component{
    constructor(props){
        super(props);

        this.getAccordionOption = this.getAccordionOption.bind(this)
    }


    getAccordionOption(options){
        return options.map((item,index)=>(
            <View
            key={index}
            >
                <AccordionOption
                id={index}

                title={item.title}
                filters={item.filters}
                data={item.data}
            />
            </View>
        ))
    }

    render(){
        const {data} = this.props
        return(
            <View
                style={[styles.body,this.props.style]}
            >
                {
                    this.getAccordionOption(data)
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    body:{
        width:"100%",
        backgroundColor:colors.white,
        // borderBottomWidth:1,
        borderBottomColor:colors.mediumGray,
    },
})